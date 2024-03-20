from typing import List, Optional
import anthropic
import dotenv
import json
import httpx
import base64

dotenv.load_dotenv()



schema_system = """
You are an expert full-stack web application designer who can create scalable, clean, and efficient web infrastructure and architectures, and design software that scales, both in the back end and the front end.

Your job is to take a specific project that the user wants to build, create a detailed plan for it, and in the future, write it out in code.

Your expertise allows you to write clean and effective logically sound code that you will check for for logical errors.

Current applications you build will only work with CRUD-based apps, which relies on building a UI interface for back end data involving the creation, retrieval, and updating of this database.

The backend framework being used is the Convex backend framework, which handles all the schemas and backend CRUD calls. This Convex framework follows a very strict format that you must adhere to when writing the code. You must use information from your knowledge base that you know about to achieve this, and must not make up any code that you do not know.

You will be:
1. Planning out the architecture of the software and writing documentation
2. Creating a layout of the schemas
3. Creating a layout of the actions
4. Designing a simple tailwind theme
5. Designing each page and its components and actions

Start by generating the description as well as the list of required features to be implemented. Then, design the database schema according to the json schema below.


Your output must strictly follow this format for populating the descriptions and schema. Options for fieldTypes are after:
<jsonSchema>
{
	description: string description of the app, 
    features_description: string description of features for planning out the app architecture stored on one line but showing new lines with \n,
	schema_tables: [{
		name: string name of the table, docs: string description used in comments,
		fields:[{name: string field name, docs: string docs, type: string from fieldTypes options}]
	}]
}
</jsonSchema>



If you are not sure or cannot generate something for any possible reason, return:
{"error" : <the reason of the error>}

<additionalInformation>

All Convex documents are defined as Javascript objects. These objects can have field values of any of the types below. They all follow the format of v.type() or v.type(items).

So, for types, instead of using a generic type, it must follow strictly one of the fieldType formats below before the colon, which is written in typescript:

<fieldTypes>
v.id("tableName"): For referencing other tables, with a string argument for the table name.
v.null(): JavaScript's undefined is not a valid Convex value. Use null instead.
v.int64(): For BigInt type of numbers
v.number(): For all numbers, including floating point precision
v.boolean(): for true false
v.string(): for strings
v.bytes(): for bytestrings
v.array(values): an array of values of another type, ie v.array(v.boolean())
v.object({property: value}): an object with properties, ie v.object({ weather: "clear"})
</fieldTypes>

<TableExamples>
documents: defineTable({
    id: v.id("documents"),
    string: v.string(),
    number: v.number(),
    boolean: v.boolean(),
    nestedObject: v.object({
      property: v.string(),
    }),
  })
</TableExamples>

Other types:
Other helper types
Unions
You can describe fields that could be one of multiple types using v.union:

v.union(v.string(), v.number()),

Literals
Fields that are a constant can be expressed with v.literal. This is especially useful when combined with unions:

    oneTwoOrThree: v.union(
      v.literal("one"),
      v.literal("two"),
      v.literal("three"),
    ),

Any
Fields that could take on any value can be represented with v.any():


    anyValue: v.any(),

This corresponds to the any type in TypeScript.

Optional fields
You can describe optional fields by wrapping their type with v.optional(...):

v.optional(v.string()),
v.optional(v.number()),

This corresponds to marking fields as optional with ? in TypeScript.


<DoNotInclude>
You do not need to populate the following ID and creationTime fields, as they are already built into every table:
_id: The document ID of the document. Do not add the current document id as a field.
_creationTime: The time this document was created, in milliseconds since the Unix epoch. Do not add fields for anything to do with time stamping or creation time.

You also do not need to include user passwords. Auth is handled automatically, and we store the information in the database. Do not store passwords or anything to do with authentication aside from email.
</DoNotInclude>

User schemas must have the name "users"

Keep your json output tightly condensed and compact all while adhering to all terms.

You must format it in a json format that is parsable.
</additionalInformation>

Remember to plan things out beforehand.

You must format the structure with the provided json format in json, including the necessary quotes surrounding properties.
You must surround your output with <jsonSchema> tags, for example:
<jsonSchema>
    OUTPUT SCHEMA GOES HERE
</jsonSchema>
"""





class Project:
    def __init__(self):
        self.client = anthropic.Anthropic()
        self.model = "claude-3-sonnet-20240229"
        # self.model = "claude-3-opus-20240229"
        # self.structure_maker_tool_user = ToolUser([WritePageFromStructureTool()], model=self.model)

    def send_message(self, system: str, messages):
        reply = ''
        with self.client.messages.stream(
            model=self.model,
            max_tokens=4096,
            temperature=1.0,
            # temperature=0.0,
            system=system,
            messages=messages) as stream:
                for text in stream.text_stream:
                    reply += text
                    print(text, end="", flush=True)
        print()
        return reply

    def create_user_message(self, message_content: str):
        return {"role": "user", "content": message_content}
    
    def create_assistant_message(self, message_content: str):
        return {"role": "assistant", "content": message_content}
    
    def write_code_to_file(self, reply, path):
        code = reply.split('```jsx')[1].split('```')[0]
        with open(path, 'w') as f:
            f.write(code)

    def write_to_file(self, content, path):
        with open(path, 'w') as f:
            f.write(content)


    def create_schema_structure(self, prompt: str):
        system = schema_system
        message = self.send_message(system, messages=[
            self.create_user_message(prompt)
        ])
        return message.split("<jsonSchema>")[1].split("</jsonSchema>")[0]

schema_boilerplate_imports = """
import { Table } from "convex-helpers/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

"""

         
class Compiler:
    def __init__(self) -> None:
        pass
    
    def create_schema(self, schema, path):
        page = "/*\n" + schema['description'] + "\n\n" + schema['features_description'] + "\n*/\n\n" + schema_boilerplate_imports
        page_back = 'export default defineSchema({\n\tusers: Users.table.index("by_token", ["tokenIdentifier"]),'
        tables = schema['schema_tables']
        for table in tables:
            if table['name'] != "users":
                page_back += f"\n\t{table['name']}: {str(table['name']).capitalize()}.table,"
            page += f"\nexport const {str(table['name']).capitalize()} = Table(\"{table['name']}\", "
            page += "{"
            for field in table['fields']:
                page += f"\n\t{field['name']}: v.optional({field['type']}), //{field['docs']}"
            if table['name'] == "users":
                page +=  "\n\ttokenIdentifier: v.string(),"
  
            page += "\n});\n"

        # Makes exported schema names Capitalizeds

        page_back += "\n  },\n  { schemaValidation: true }\n);"""
        with open(path, 'w') as f:
            f.write(page + "\n\n" + page_back)

    def create_crud(self, schema, path):
        creates = []
        reads = []
        updates = []
        deletes = []

        # start with reads

        



newline = '\n'
# prompt = 'A landing page for vly.ai with a navbar, hero section, info section, faq, try it out section, and footer. The website should talk abotu how vly.ai is a revolutionary no-code platform for generating SaaS apps with natural language. We use LLMs and a highly optimized knowledge base with vector retrievals and recursive iteration system to allow full control over creating and modifying web apps - all with no code. The try it out section should include a textbox for users to enter a prompt, like this one, and with the click of a button, have it generate their landing page. While generating, there should be a space to view system output and what files are being generated.'

p = Project()

schema_path = f'generated/schema.json'
#structure = p.create_schema_structure("Create a schema for a very simple twitter application") # json
#p.write_to_file(structure, schema_path)
# schema = json.load(structure)
schema = json.loads(r"""
{ 
	"description": "A simple Twitter-like application that allows users to post tweets, follow other users, and view a timeline of tweets from followed users.",
	"features_description": "- User registration and login\n- Posting tweets\n- Following other users\n- Timeline view of tweets from followed users\n- User profile pages\n- Searching for users and tweets",
	"schema_tables": [
		{
			"name": "users",
			"docs": "Stores user account information",
			"fields": [
				{"name": "username", "docs": "The username of the user", "type": "v.string()"},
				{"name": "email", "docs": "The email of the user", "type": "v.string()"},
				{"name": "name", "docs": "The display name of the user", "type": "v.string()"},
				{"name": "bio", "docs": "A short user bio", "type": "v.string()"}
			]
		},
		{
			"name": "tweets",
			"docs": "Stores individual tweets posted by users",
			"fields": [
				{"name": "userId", "docs": "ID of the user who posted the tweet", "type": "v.id('users')"},
				{"name": "text", "docs": "The text content of the tweet", "type": "v.string()"}
			]
		},
		{
			"name": "follows",
			"docs": "Stores follow relationships between users",
			"fields": [
				{"name": "followerId", "docs": "ID of the user doing the following", "type": "v.id('users')"},
				{"name": "followedId", "docs": "ID of the user being followed", "type": "v.id('users')"}
			]
		}
	]
}
""", strict=False)


c = Compiler()
c.create_schema(schema, f'generated/schema.ts')




# # components = project.create_page_structure(prompt)
# components = json.loads('''[
#     {
#         "name": "Navbar",
#         "description": "A navigation bar with links to different sections of the landing page and possibly a logo."
#     },
#     {
#         "name": "HeroSection",
#         "description": "A prominent section showcasing the main value proposition of vly.ai, with a catchy headline, a brief description, and a call-to-action button."
#     },
#     {
#         "name": "FaqSection",
#         "description": "A section addressing common questions and concerns about vly.ai, presented in a frequently asked questions (FAQ) format."
#     },
#     {
#         "name": "TryItOutSection",
#         "description": "A section allowing users to interact with vly.ai by entering a prompt, generating a landing page, and viewing the system output and generated files."
#     },
#     {
#         "name": "Footer",
#         "description": "A footer section with additional links, contact information, and possibly social media icons or a newsletter signup form."
#     }
# ]''')
# # for i in range(3, len(components)):
# #     project.write_code_to_file(project.write_component_code_from_description(prompt, reference_media_type, reference_data, components, i), f'vly/src/{components[i]["name"]}.jsx')
# project.write_code_to_file(project.write_page_code_from_description(prompt, components), f'vly/src/App.jsx')