from typing import List, Optional
import anthropic
import dotenv
import json
import httpx
import base64

dotenv.load_dotenv()

def p(name):
    f = open("prompts/" + name + ".txt", "r")
    return f.read()




# TODO: 
# 1. Indexing
# 2. Testing
# 3. Multipass
# 4. Row Level Security
# 5. Pagination


def actions_system(crud_page, schema_page):
    return f"""
You are an expert back end designer who can build back end actions for querying and mutating database data from a couple of instructions.

You are to write only the code that uses a unique backend library called Convex for formatting your calls. You must conform to the format.

You must code in typescript. You are writing the contents of a function and are not to write any of the function syntax, just the content and the return statement.


<DatabaseSchema>
{schema_page}
</DatabaseSchema>

<AvailableCRUDFunctions>
Here are the functions currently available for you to perform create, read, update, and deletion operations. This is also the file your function contents will go:

{crud_page}

{p("actions")}
"""


client = anthropic.Anthropic()
# model = "claude-3-sonnet-20240229"
model = "claude-3-opus-20240229"
# model = "claude-3-haiku-20240307"
# structure_maker_tool_user = ToolUser([WritePageFromStructureTool()], model=self.model)

def send_message(system: str, messages):
    reply = ''
    with client.messages.stream(
        model=model,
        max_tokens=4096,
        # temperature=1.0,
        temperature=0.0,
        system=system,
        messages=messages) as stream:
            for text in stream.text_stream:
                reply += text
                print(text, end="", flush=True)
    print()
    return reply

def user_msg(message_content: str):
    return {"role": "user", "content": message_content}

def asst_msg(message_content: str):
    return {"role": "assistant", "content": message_content}

def write_code_to_file(reply, path):
    code = reply.split('```jsx')[1].split('```')[0]
    with open(path, 'w') as f:
        f.write(code)

def write_to_file(content, path):
    with open(path, 'w') as f:
        f.write(content)

def read(path):
    f = open(path, "r")
    return f.read()

def create_schema_structure(prompt: str):
    system = p("schema")
    message = send_message(system, messages=[
        user_msg(prompt)
    ])
    return message.split("<jsonSchema>")[1].split("</jsonSchema>")[0]

def create_actions(prompt: str):
    system = p("action_plan")
    message = send_message(system, messages=[
        user_msg(prompt)
    ])
    return message.split("<jsonSchema>")[1].split("</jsonSchema>")[0]

def create_page_structure(prompt: str):
    system = p("page_schema")
    message = send_message(system, messages=[
        user_msg(prompt)
    ])
    return message.split("<jsonSchema>")[1].split("</jsonSchema>")[0]

def create_frontend(prompt: str):
    system = p("ui_generation")
    message = send_message(system, messages=[
        user_msg(prompt)
    ])
    return message.split("<jsonSchema>")[1].split("</jsonSchema>")[0]
    

schema_boilerplate_imports = """
import { Table } from "convex-helpers/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

"""

crud_boilerplate_imports = """
import { v } from "convex/values";
import { mutation, action, query, internalQuery, DatabaseReader, DatabaseWriter } from "./_generated/server";
import { api } from "./_generated/api";
import { filter } from "convex-helpers/server/filter";
import { Id } from "./_generated/dataModel";
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericDatabaseWriter, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer, WithoutSystemFields } from "convex/server";
import { useMutation, useQuery } from "convex/react";
"""

verify_function = """
async function verify(ctx: GenericQueryCtx<any>){
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated call to mutation");
    }
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (!user) {
      throw new Error("Unauthenticated call");
    }
}
"""

def create_action(action_type, action_name, args_code, security, docs, code):
        return f"""
//{docs}
export const {action_name} = {action_type}({"{"}
  args: {"{"}
    {args_code}  {"}"},
  handler: async (ctx, args) => {"{"}{security}
    const d = ctx.db
    {code}
  {"}"},
{"}"});
"""

def create_schema(schema, path):
    page = "/*\n" + schema['description'] + "\n\n" + schema['features_description'] + "\n*/\n\n" + schema_boilerplate_imports
    page_back = 'export default defineSchema({\n\tusers: Users.table.index("by_token", ["tokenIdentifier"]),'
    tables = schema['schema_tables']
    for table in tables:
        if table['name'] != "users":
            page_back += f"\n\t{table['name']}: {str(table['name']).capitalize()}.table,"
        page += f"\nexport const {str(table['name']).capitalize()} = Table(\"{table['name']}\", "
        page += "{"
        for field in table['fields']:
            page += f"\n\t{field['name']}: {field['type']}, //{field['docs']}"
        if table['name'] == "users":
            page +=  "\n\ttokenIdentifier: v.string(),"

        page += "\n});\n"

    # Makes exported schema names Capitalizeds

    page_back += "\n  },\n  { schemaValidation: true }\n);"""
    with open(path, 'w') as f:
        f.write(page + "\n\n" + page_back)
    
    return page + "\n\n" + page_back

def create_crud(schema, path):
    schema_imports = [] # import schema, { Tweets, User } from "./schema";
    creates = []
    reads = []
    updates = []
    deletes = []

    # start with reads
    tables = schema['schema_tables']
    for table in tables:
        # NEED TO ADD BETTER COMMENTS
        # would be more ideal to generate a json of these functions and pass it into the AI. for now, just pass in all the code.
        schema_imports.append(str(table['name']).capitalize())
        reads.append(f'\n//returns a full table scan query based on an optional filter\nfunction getMany{str(table["name"]).capitalize()}(db: DatabaseReader, fltr?: (f: typeof {str(table["name"]).capitalize()}.doc.type) => Promise<boolean> | boolean){"{"}return filter(db.query("{table["name"]}"), fltr ? fltr : () => true){"}"}\n')
        reads.append(f'\n//returns one document based on an id\nasync function getOne{str(table["name"]).capitalize()}(db: DatabaseReader, id: string | Id<"{table["name"]}">){"{"}return await db.get(id as Id<"{table["name"]}">){"}"}\n')
        creates.append(f'\n//creates one document based on data object, returns the resulting document id\nasync function createOne{str(table["name"]).capitalize()}(db: DatabaseWriter, data: WithoutSystemFields<typeof {str(table["name"]).capitalize()}.doc.type>){"{"}return await db.insert("{table["name"]}", data);{"}"}\n')
        updates.append(f'\n//updates one document based on an id and a partial data object, returns nothing\nasync function updateOne{str(table["name"]).capitalize()}(db: DatabaseWriter, id: Id<"{table["name"]}">, data: Partial<any>){"{"}await db.patch(id, data);{"}"}\n')
        deletes.append(f'\n//deletes one document based on an id, returns nothing\nasync function deleteOne{str(table["name"]).capitalize()}(db: DatabaseWriter, id: Id<"{table["name"]}">){"{"}await db.delete(id);{"}"}\n')

    page_imports = crud_boilerplate_imports
    page_imports += '\nimport schema, { '+ str(schema_imports).replace('[','').replace(']','').replace("'", "") +' } from "./schema";\n\n'
    page = verify_function
    
    for read in reads:
        page += read
    for create in creates:
        page += create
    for update in updates:
        page += update
    for delete in deletes:
        page += delete
    
    with open(path, 'w') as f:
        f.write(page_imports + page)

    return page_imports + page

    # for now, all in one file LOL

def create_faker_data_code(schema, path): # UNTESTED
    result = send_message(p("faker"), user_msg("Here are the schemas you should be making fake data for: \n" + schema))
    
    with open(path, 'w') as f:
        f.write(result)
    return result

def create_actions_code(actions, schema_page, crud_page, path):
    # no actions, only queries and mutations
    result = send_message(actions_system(crud_page, schema_page), messages=[user_msg("Here are the actions to create mutation and query functions for: \n<Actions>\n" + str(actions) + "\n</Actions>\n\nYou must output the code in a json schema format that is a dictionary, with the action name as the key/field and the code as the string value. This must be in the same order as it is being processed. Your output must be surrounded by <jsonSchema></jsonSchema> xml tags. The json must be correctly formatted and parsable with strings all on one line.")])
    result = result.split("<jsonSchema>")[1].split("</jsonSchema>")[0]
    with open(path, 'w') as f:
        f.write(result)
    return result

# MAKE MORE DETAILED DOCS LATER


def create_actions_page(actions, code, crud_page, path):
    page = crud_page + "\n"
    queries = actions["query_actions"]
    mutations = actions["mutation_actions"]

    for query in queries:
        args=""
        for arg in query["arguments"]:
            args += f'{arg["name"]}: {arg["type"]}, //{arg["docs"]}\n'

        page += create_action("query", query["name"], args, "\n\t\tawait verify(ctx) //security\n" if query["requires_auth"] else "", query["docs"], str(code[query["name"]]).replace('\n', '\n\t\t'))
    

    for mutation in mutations:
        args=""
        for arg in mutation["arguments"]:
            args += f'{arg["name"]}: {arg["type"]}, //{arg["docs"]}\n'

        page += create_action("mutation", mutation["name"], args, "\n\t\tawait verify(ctx) //security\n" if mutation["requires_auth"] else "", mutation["docs"], str(code[mutation["name"]]).replace('\n', '\n\t\t'))
    

    with open(path, 'w') as f:
        f.write(page) # need it to write to same file
    return page 



    