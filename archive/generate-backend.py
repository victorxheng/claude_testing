from typing import List, Optional
import anthropic
import dotenv
import json
import httpx
import base64

dotenv.load_dotenv()



# TODO: 
# 1. Indexing
# 2. Testing
# 3. Multipass
# 4. Row Level Security



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
v.array(values): an array of values of another type, ie v.array(v.boolean()). Limited to 8192 values; use only for small limited sizes
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

faker_system = """
You are a helpful programming expert

Your job is to write a single function that uses faker by filling in argument fields in an internal database function that inserts data into the database based on a schema. We are using convex, which follows a very specific syntax format as outlined below. You must export the const, define an internalMutation, and follow the syntax exactly.

For example:

import { faker } from '@faker-js/faker';

import { internalMutation } from "./_generated/server";

export const createFake = internalMutation(async (ctx) => {

  // Initialize Faker with a random value

  faker.seed();

  for (let i = 0; i < 200; i++) {

    await ctx.db.insert("users", {

      name: faker.person.fullName(),

      company: faker.company.name(),

      avatar: faker.image.avatar(),

    });

    await ctx.db.insert("tweets", {

      content: faker.lorem.sentence(),

    });

  }

});

Up there, you only need to change the faker types for the arguments.

For example, this table with name "users" has fields name, company, and avatar, all of which are string types. It also inserts into the "tweets" table.

To write your own, copy the exact same syntax, but populate different arguments and faker data for all tables and fields in the schema.
"""


# For indexing:

"""
indexes:[{index_fields: [{name: string name of field to be indexed, reference indexing below}]}]

<IndexingByFields>

The size limit of an array is 8192. So in order to efficiently store and group data, you'll need to index by certain fields or certain combination of fields for easy retrieval later on.

Indexes allow for instant retrieval of documents based on the indexed field.

For example, to instantly retrieve all books written by an author in a table of books, we can index by auth, and then instantly get the list of books the author is written.

Thus, we wouldn't need an array to store the books written by the author; we can instead use the author index to obtain them.

</IndexingByFields>
"""

# Possibly rename get functions to omit the s at the end of each table name

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

As each function above is async, it requires an await beforehand.
</AvailableCRUDFunctions>

<DbParameter>
Generally, every function requires you to pass down the databaseReader as a first argument. This is simply making the letter d as the first argument. 

For example, you could do the following, requiring the letter "d" as the first parameter for each function:
const data = await getManyData(d) //gets the entire
const oneData = await getOneData(d, data_id)
const dataId = await createOneData(d, parameters)
await deleteData(d, data_id)
await updateData(d, data_id, partial)

</DbParameter>

<Arguments>
Arguments are passed down with a name and a type in the arguments list. Their name is the variable, and to use it, you must write args.name, such as args.userId if the argument is userId.

Arguments also have types for proper validation. Here is a list:

v.id("tableName"): For referencing other tables, with a string argument for the table name.
v.null(): JavaScript's undefined is not a valid Convex value. Use null instead.
v.int64(): For BigInt type of numbers
v.number(): For all numbers, including floating point precision
v.boolean(): for true false
v.string(): for strings
v.bytes(): for bytestrings
v.array(values): an array of values of another type, ie v.array(v.boolean()). Limited to 8192 values; use only for small limited sizes
v.object({"{"}property: value{"}"}): an object with properties, ie v.object({"{"} weather: "clear"{"}"})


You then can use them later on for the code, always referencing arguments using args.name.
</Arguments>

<UsingReadMany>
When using a getMany function such as getManyData, you can pass in a filter function (optional), and you must append dot functions after to format the data in the way that's required.


<Filtering>
Get many can be used in the following way:

data = getManyData(d, (data) => data.body == args.body).collect()

In this case, the parameter of the lambda function is the single document itself. The lambda then checks this document for a condition, such as if its data.tags field includes an argument field

The lambda can be any complex operation that returns a boolean based on whether the document should be included or not based on certain conditions.

The .collect() after is required to collect all the data. You can use other functions after as well listed in the Collecting section.

<Examples>
const longTweets = await getManyTweets(d, (tweet) => tweet.body.length >= 50).collect()
const complexFilter = await getManyData(d, (data) => data.rank >=  5 && data.content.includes(args.keyword) || data.force == true).collect()
const tagged_posts = await getManyPosts(d, (post) => post.tags.includes(args.tag)).collect()
</Examples>

</Filtering>

<Collecting>
Every getMany must have a .collect() in order to carry out the actual database read to return an array of the read documents.

There are different ways to specify the output of a filtering operation. By default Convex always returns documents ordered by _creationTime.

1. Sorting and Ordering

You can use .order("asc" | "desc") to pick whether the order is ascending or descending. If the order isn't specified, it defaults to ascending.

const data = await getManyData(d).order("asc").collect();
const reverse_data = await getManyData(d).order("desc").collect();

If you need to sort on a field other than _creationTime and your document query returns a small number of documents (on the order of hundreds rather than thousands of documents), consider sorting in Javascript:

const sorted_data = await getManyData(d).collect().sort((a, b) => b.points - a.points).slice(0, 10) // gets top ten documents with most points

2. Replacing .collect()

Instead of using .collect(), which returns the entire filtered table, you can use the following:

.take(n) selects only the first n results that match your query.

const data = await getManyData(d).order("asc").take(5); // takes 5 data points

.first() selects the first document that matches your query and returns null if no documents were found.

const data = await getManyData(d).first(); // gets only the first

.unique() selects the single document from your query or returns null if no documents were found. If there are multiple results it will throw an exception.

const findData = await getManyData(d, (data) => data.name == args.name).unique();

Remember, using getMany returns a Query class, which you cannot perform operations on. Each call from getMany must end with a .collect(), .take(n), .first(), or .unique() before a Promise<any[]> array object is returned for operations to be performed. Thus, collection is required before any sort of mapping or other operations.
</Collecting>

If documents scale too much, indicate areas where an index should be used instead for filtering and sorting. Using indexes will help with slow full table scans and eliminate the need for filtering and sorting at scale. Indicate through comments where in the code they should be included.

</UsingReadMany>

<Returning>
Remember to return the correct data based on what the instructions are. You should be saving data in variables and then returning the correct variable.
</Returning>

<QueryExample>
const data = await getOneData(d, args.id)
return data
</QueryExample>

<QueryExample>
const data = await getManyData(d, (data) => data.tag == args.tag).order("desc").collect()
return data
</QueryExample>


<QueryExample>
const data = await getManyData(d, (data) => data.username == await getManyUsers(d, (user) => user.username == data.username).unique()).order("desc").collect()
return data
</QueryExample>


<MutationExamples>
const tweetId = await createOneTweet(d, args.tweet)
return tweetId
</MutationExamples>


<MutationExamples>
await deleteOneData(d, args.id)
</MutationExamples>


<MutationExamples>
const data = await getOneData(d, args.id)
const widgetId = await createOneWidget(d, {"{"} field1: data.test1, field2: data.test2 {"}"})
return widgetId
</MutationExamples>

<DoNotInclude>
Make sure not to include anything to do with security. Do not call await verify; it is handled for you. You should only focus on the database operations and not auth verification.
</DoNotInclude>

"""

# IMPORTANT: ADD IN SORTING AND FILTERING BY INDEXES
# ADD IN PAGINATION
# ADD ROW LEVEL SECURITY


def page_schema_system():
    return """
You are an expert web developer who can build clean, simple, and well-structured straightforward web applications in next-js app router.

Your task is to construct a page structure of an application given the objective application, database object schema, and available backend functions.

You will be formatting the output as a json layout that you must strictly follow and fill in based on your expert experience. 

Every page has a name, which is also the name of its route in a url domain. Routes can be fixed, such as home (for url/home), or they can be dynamic, such as user/[id] (for url/user/some_user_id).

Dynamic routes are surrounded in brackets. They are often the name of the dynamic route that is used in the page to render an object.

It can come in the form of something like [id] (for url/some_id), blog/[slug] (for url/page/some_slug), or you can nest it: page/blog/comment/[id] (for url/page/blog/comment/some_comment_id).

You can nest routes by having seperate pages that use a slash (/) symbol to define nested routes, such as page/blog/[id]/view or page/blog/[id]/edit, which creates nested routes under page/blog/[id].

You can leave sections empty. For example, if the page has no data calls, simply leave it empty. Or if there are no workflows either.

The page title and description are for metadata purposes and will show up on search engines as well as on the browser.

<DataCalls>

Data calls are calls that are made to the back end to query for data, and are saved into a variable to be renderable in the code. They must be one of the available query_actions defined in the backend schema.

You must also specify what to fill the arguments with, which could be from the dynamic route (which is something like router.id or router.slug based on the name of the dynamic route) or information from the current user or other variable.

</DataCalls>

<Workflows>

Workflows are a series of steps to be run as actions, such as when a button is clicked, the page is loaded, or some state changes. They are called in order to execute a script, such as writing to the database, triggering a UI event, or modifying some thing.

</Workflows>

<Components>
These are UI components. It helps break down the UI of the page into pieces. They typically take in properties to render, and do not inherently require data calls, but can call workflows through buttons or other states.

Components that take in properties typically takes in a object (refer to the database schemas). They can also take in other values as well. They can even take in states.

Components will be written purely using default react components and tailwind css.

When you describe the layout, describe the component, the styling and configuration, and other information as to how it will be structured, the placement, where on the page it is located, mobile responsive design, and other parts.

Also describe what each component does, such as what workflows are called.

</Components>

<Layout>

This is where you put the components together. Describe the lay out, how the components are used, additional UI components implemented, and any further workflows or places where data calls are used to render data.

</Layout>

<OtherNotes>

<Authentication>

You do not need a sign in or sign up page, an account page (for changing password, etc), or need to worry about user authentication.

Instead, this is achieved through a library called Clerk. It handles all the UI for signing in.

The only thing needed is a <SignInButton/> button to be rendered somewhere for the user to sign in or sign up, which can be put in a ui component such as a hero or nav bar.

You also only need the <UserButton/> to render a button for the user to click on to take them to their account. All of that is handled.

</Authentication>

<RealtimeData>

You do not need to refetch query data for data calls. Every query is a subscription to a real time database, so you never need to refresh, re-fetch, or get the data. Any variable defined in the data call section will always have the latest most up to data information.

Thus, in workflows, if there is a refresh to get the latest data, you do not need to do that. If it is a different reason, such as going to a different page with new data, or changing what the data is pointing to, such as the arguments, then that is still required.

</RealtimeData>

<Navigation>

Every page should have some form of navigation on it, which includes the footer and the nav bar. You do not need to ever describe this component, but you should include it in your descriptions of the lay out because it is required in the format.

These components will be handled seperately.

</Navigation>

<States>

The state of the app is using the react state, such as:
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');

However, you only need to provide the name, such as "answer", "error", or "status", as well as the the initial state. the setAnswer or setState will be handled for you.

Describe the states afterward everything is made, outlining what is required by the states and what they should control or how they are used.

</States>


</OtherNotes>


<jsonSchema>
{
	"description": "string description of the app page structure and layout",
  "features_description": "string description of where the features are in the layout",
	"pages": [{
		"route_name": "string name of page route.", "docs": "string description of the page",
    "page_title": "title of the page for metadata",
    "description": "description of the page for metadata",
    "data_calls": [{
      "query_name": "string name of the query to call from the back end",
      "purpose": "purpose and use of the query call"
      "arguments": [{
        "argument_name": "argument to use", "type": "argument type", "value_description": "description of what is being entered"
      }]
    }],
    "workflows": [{
      "workflow_name": "name of workflow",
      "docs": "purpose and documentation of the workflow",
      "where_called": "where the workflow is called from, such as a button press, on page load, or from a condition",
      "actions_used": [{
        "action_name": "name of the action available from the backend being called",
        "arguments": [{
            "argument_name": "argument to use", "type": "argument type", "value_description": "description of what is being entered"
        }]
      }]
      "workflow": [{"step": "string description of what to do at this step, such as calling an action and passing arguments, redirecting to a different page, or modifying the front end, showing/hiding, etc"}]
    }],
		"components":[{
        "name": "component name", "docs": "component description and what it does", 
        "props": [{"property_name": "name of the property being passed through, deconstructed", "property_type": "type of the property", "docs": "description of the property and its use in the component"}],
        "layout": "description of the layout, structure, ui components, what workflows are called from where, and where the properties are used"
    }],
    "layout":"description of the layout using the components",
    "states": "description of the different states that will be used to control data, states, and UI elements."
	}]
}
</jsonSchema>

The output must be surrounded by the <jsonSchema> </jsonSchema> tags.

"""

# THINGS TO ADD:
# Handling user authentication with clerk
# The real time database and not needing to fetch anything
# include nav bar and footer requirements, or some sort of navigation process. integrate shared
# integration of page state

# need to eventually make it multi pass to scale it properly across larger projects

def ui_generation_system():
    return """
You are an expert web developer who can write very clean looking UIs. Your goal is to produce code in react typescript (tsx) that can build out the application you are writing.


Here are some points to follow:

<DataCalls>

Data calls are calls that are made to the back end to query for data, and are saved into a variable to be renderable in the code. They must be one of the available query_actions defined in the backend schema.

You must also specify what to fill the arguments with, which could be from the dynamic route (which is something like router.id or router.slug based on the name of the dynamic route) or information from the current user or other variable.

To get information from dynamic routes, you simply type "router.id" to get the [id] from the route, or "router.slug" to get [slug] from something like pages/blog/[slug].

</DataCalls>

<Workflows>

Workflows are a series of steps to be run as actions, such as when a button is clicked, the page is loaded, or some state changes. They are called in order to execute a script, such as writing to the database, triggering a UI event, or modifying some thing.

Your job is to write these out into code and use it to change state, execute backend functions, etc. To execute a backend workflow, simply write in your workflow: nameOfMutation({arg1: value, arg2: value});

You only need to write the name of the mutation and fill in the desconstructed arguments.

</Workflows>

<Components>
These are UI components. It helps break down the UI of the page into pieces. They typically take in properties to render, and do not inherently require data calls, but can call workflows through buttons or other states.

Components that take in properties typically takes in a object (refer to the database schemas). They can also take in other values as well. They can even take in states.

Components will be written purely using default react components and tailwind css.

Use the description of the component to correctly generate the code, including the desconstructed props being passed and include how they are rendered in the code.

</Components>


<OtherNotes>

<Authentication>

You do not need a sign in or sign up page, an account page (for changing password, etc), or need to worry about user authentication.

Instead, this is achieved through a library called Clerk. It handles all the UI for signing in.

The only thing needed is a <SignInButton/> button to be rendered somewhere for the user to sign in or sign up, which can be put in a ui component such as a hero or nav bar.

You also only need the <UserButton/> to render a button for the user to click on to take them to their account. All of that is handled.

</Authentication>

<RealtimeData>

You do not need to refetch query data for data calls. Every query is a subscription to a real time database, so you never need to refresh, re-fetch, or get the data. Any variable defined in the data call section will always have the latest most up to data information.

Thus, in workflows, if there is a refresh to get the latest data, you do not need to do that. If it is a different reason, such as going to a different page with new data, or changing what the data is pointing to, such as the arguments, then that is still required.

To query something, simply write something like:  const data = nameOfQuery({ arg1: value1, arg2: value2 });

This will subscribe the variable data to the backend query. You can then perform modications then use the object later on in the code, such as passing it as a prop, rendering it, or passing it as arguments into a workflow.

Remember to correctly fill out arguments, and that you can get dynamic route values through router.id, and to get the user id, simply write in user.id. You can also obtain other user information through the user object, such as user.email, or whatever fields are available in the user database schema.

</RealtimeData>

<States>

The state of the app is using the react state, such as:
const [answer, setAnswer] = useState('');
const [error, setError] = useState(null);
const [status, setStatus] = useState('typing');

However, you only need to provide the name, such as "answer", "error", or "status", as well as the the initial state. the setAnswer or setState will be handled for you.

</States>


</OtherNotes>


You must strictly follow the schema below:

<jsonSchema>
{
  pages: [{
      "route_name": "corresponding page route",
      "states": [{
        "state_name": "name of the state. this is a react state using useState('initial_state')",
        "docs": "what the state does and what uses the state",
        "initial_state": "what the initial state it. can be empty or not."
      }]
      "data_calls": [{
        "query_name": "string name of the query to call from the back end",
        "code": "the code implementing the query, such as saving to a state or performing modifications."
      }],
      "workflows": [{
        "workflow_name": "name of workflow",
        "code": "the code implementing the workflow steps and using the arguments"
      }],
      "components":[{
          "name": "component name",
          "code": "the code implementation of the component in react and tailwind"
      }],
      "layout": "the code implementation of the layout using the components and passing the correct parameters, or writing directly using react and tailwind"
    }
  }]
}
</jsonSchema>

The output must be surrounded by the <jsonSchema> </jsonSchema> tags.

"""



class Project:
    def __init__(self):
        self.client = anthropic.Anthropic()
        # self.model = "claude-3-sonnet-20240229"
        self.model = "claude-3-opus-20240229"
        # self.model = "claude-3-haiku-20240307"
        # self.structure_maker_tool_user = ToolUser([WritePageFromStructureTool()], model=self.model)

    def send_message(self, system: str, messages):
        reply = ''
        with self.client.messages.stream(
            model=self.model,
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
    
    def create_page_structure(self, prompt: str):
        system = page_schema_system()
        message = self.send_message(system, messages=[
            self.create_user_message(prompt)
        ])
        return message.split("<jsonSchema>")[1].split("</jsonSchema>")[0]
    
    def create_frontend(self, prompt: str):
        system = ui_generation_system()
        message = self.send_message(system, messages=[
            self.create_user_message(prompt)
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
import { Auth, DocumentByInfo, GenericDatabaseReader, GenericDatabaseWriter, GenericQueryCtx, GenericTableInfo, PaginationOptions, PaginationResult, QueryInitializer } from "convex/server";
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
                page += f"\n\t{field['name']}: {field['type']}, //{field['docs']}"
            if table['name'] == "users":
                page +=  "\n\ttokenIdentifier: v.string(),"
  
            page += "\n});\n"

        # Makes exported schema names Capitalizeds

        page_back += "\n  },\n  { schemaValidation: true }\n);"""
        with open(path, 'w') as f:
            f.write(page + "\n\n" + page_back)
        
        return page + "\n\n" + page_back

    def create_crud(self, schema, path):
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
            reads.append(f'\n//returns a full table scan query based on an optional filter\nfunction getMany{str(table["name"]).capitalize()}(db: DatabaseReader, fltr?: (f: typeof {str(table["name"]).capitalize()}.doc.type) => Promise<boolean> | boolean): QueryInitializer<any>{"{"}return filter(db.query("{table["name"]}"), fltr ? fltr : () => true){"}"}\n')
            reads.append(f'\n//returns one document based on an id\nasync function getOne{str(table["name"]).capitalize()}(db: DatabaseReader, id: string | Id<"{table["name"]}">):  Promise<DocumentByInfo<GenericTableInfo>[]>{"{"}return await db.get(id as Id<"{table["name"]}">){"}"}\n')
            creates.append(f'\n//creates one document based on data object, returns the resulting document id\nasync function createOne{str(table["name"]).capitalize()}(db: DatabaseWriter, data: {"{"}[x: string]: any;{"}"}){"{"}return await db.insert("{table["name"]}", data);{"}"}\n')
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
    
    def create_faker_data_code(self, schema, path): # UNTESTED
        p = Project()
        result = p.send_message(faker_system, p.create_user_message("Here are the schemas you should be making fake data for: \n" + schema))
        
        with open(path, 'w') as f:
            f.write(result)
        return result
    
    def create_actions_code(self, actions, schema_page, crud_page, path):
        # no actions, only queries and mutations
        p = Project()
        result = p.send_message(actions_system(crud_page, schema_page), messages=[p.create_user_message("Here are the actions to create mutation and query functions for: \n<Actions>\n" + str(actions) + "\n</Actions>\n\nYou must output the code in a json schema format that is a dictionary, with the action name as the key/field and the code as the string value. This must be in the same order as it is being processed. Your output must be surrounded by <jsonSchema></jsonSchema> xml tags. The json must be correctly formatted and parsable with strings all on one line.")])
        result = result.split("<jsonSchema>")[1].split("</jsonSchema>")[0]
        with open(path, 'w') as f:
            f.write(result)
        return result
    
    # MAKE MORE DETAILED DOCS LATER


    def create_actions_page(self, actions, code, crud_page, path):
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
    


    


newline = '\n'
# prompt = 'A landing page for vly.ai with a navbar, hero section, info section, faq, try it out section, and footer. The website should talk abotu how vly.ai is a revolutionary no-code platform for generating SaaS apps with natural language. We use LLMs and a highly optimized knowledge base with vector retrievals and recursive iteration system to allow full control over creating and modifying web apps - all with no code. The try it out section should include a textbox for users to enter a prompt, like this one, and with the click of a button, have it generate their landing page. While generating, there should be a space to view system output and what files are being generated.'

p = Project()

schema_path = f'generated/schema.json'
initial_prompt = "Create a schema for a very simple twitter application"
#structure = p.create_schema_structure(initial_prompt) # json
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

actions = json.loads(r"""
{
  "actions_description": "The actions for this Twitter-like application will involve creating, retrieving and searching for users, posting and retrieving tweets, and managing user follow relationships.",

  "query_actions_required": "Query actions are needed to get user profiles, retrieve tweets for a user's timeline, and search for users and tweets.",

  "query_actions": [
    {
      "name": "getUserProfile",
      "where_used": "Used in user profile pages to retrieve user details.",
      "docs": "Retrieves the profile details for a given user ID.",
      "requires_auth": false,
      "arguments": [
        {
          "name": "userId",
          "docs": "The ID of the user to retrieve the profile for.",
          "type": "v.id(\"users\")"
        }
      ],
      "returns": "The user profile object containing username, email, name and bio fields.",
      "return_type": "User object",
      "workflow_steps": [
        {
          "step": "Retrieve the user document with the given userId from the users table."
        }
      ]
    },
    {
      "name": "getTimelineTweets",
      "where_used": "Used to populate the timeline view for a logged in user.",
      "docs": "Retrieves tweet objects for the given user's timeline based on who they follow.",
      "requires_auth": true,
      "arguments": [
        {
          "name": "userId",
          "docs": "The ID of the user to retrieve the timeline tweets for.",
          "type": "v.id(\"users\")"
        }
      ],
      "returns": "An array of tweet objects for the user's timeline containing each tweet's details.",
      "return_type": "Array of tweet objects",
      "workflow_steps": [
        {
          "step": "Retrieve IDs of users that the given user is following from the follows table."
        },
        {
          "step": "Retrieve tweet IDs posted by the followed users from the tweets table."
        },
        {
          "step": "Sort the tweets by timestamp in descending order."
        }
      ]
    },
    {
      "name": "searchUsers",
      "where_used": "Used for the user search feature.",
      "docs": "Searches for users based on a search query string.",
      "requires_auth": false,
      "arguments": [
        {
          "name": "query",
          "docs": "The search query string to match against usernames and names.",
          "type": "v.string()"
        }
      ],
      "returns": "An array of user objects that match the search query.",
      "return_type": "Array of user objects",
      "workflow_steps": [
        {
          "step": "Perform a text search on the username and name fields in the users table using the query string."
        },
        {
          "step": "Return the matching user documents."
        }
      ]
    },
    {
      "name": "searchTweets",
      "where_used": "Used for the tweet search feature.",
      "docs": "Searches for tweets based on a search query string.",
      "requires_auth": false,
      "arguments": [
        {
          "name": "query",
          "docs": "The search query string to match against tweet text.",
          "type": "v.string()"
        }
      ],
      "returns": "An array of tweet objects that match the search query.",
      "return_type": "Array of tweet objects",
      "workflow_steps": [
        {
          "step": "Perform a text search on the text field in the tweets table using the query string."
        },
        {
          "step": "Return the matching tweet documents."
        }
      ]
    }
  ],

  "mutation_actions_required": "Mutation actions are needed for user signup, posting tweets, and following/unfollowing users.",

  "mutation_actions": [
    {
      "name": "postTweet",
      "where_used": "Used when a user posts a new tweet.",
      "docs": "Creates a new tweet posted by the given user.",
      "requires_auth": true,
      "arguments": [
        {
          "name": "userId",
          "docs": "The ID of the user posting the tweet.",
          "type": "v.id(\"users\")"
        },
        {
          "name": "text",
          "docs": "The text content of the new tweet.",
          "type": "v.string()"
        }
      ],
      "returns": "The newly created tweet object.",
      "return_type": "Tweet object",
      "workflow_steps": [
        {
          "step": "Create a new tweet document in the tweets table with the given userId and text."
        }
      ]
    },
    {
      "name": "followUser",
      "where_used": "Used when a user follows another user.",
      "docs": "Creates a new follow relationship between two users.",
      "requires_auth": true,
      "arguments": [
        {
          "name": "followerId",
          "docs": "The ID of the user doing the following.",
          "type": "v.id(\"users\")"
        },
        {
          "name": "followedId",
          "docs": "The ID of the user being followed.",
          "type": "v.id(\"users\")"
        }
      ],
      "returns": "The newly created follow relationship object.",
      "return_type": "Follow object",
      "workflow_steps": [
        {
          "step": "Create a new follow document in the follows table with the given followerId and followedId."
        }
      ]
    },
    {
      "name": "unfollowUser",
      "where_used": "Used when a user unfollows another user.",
      "docs": "Removes an existing follow relationship between two users.",
      "requires_auth": true, 
      "arguments": [
        {
          "name": "followerId",
          "docs": "The ID of the user doing the unfollowing.",
          "type": "v.id(\"users\")"
        },
        {
          "name": "followedId",
          "docs": "The ID of the user being unfollowed.",
          "type": "v.id(\"users\")"  
        }
      ],
      "returns": "Null on successful unfollow.",
      "return_type": "Null",
      "workflow_steps": [
        {
          "step": "Delete the follow document from the follows table matching the given followerId and followedId."
        }
      ]
    }
  ],

  "actions_required": "No additional standalone actions are required for this application.",
  "actions": []
}
""", strict = False)

"""
# WRITES THE BACKEND CODE
c = Compiler()
schema_page = c.create_schema(schema, f'generated/schema.ts')
crud_page = c.create_crud(schema, f'generated/call.ts')
# faker_data = c.create_faker_data_code(schema, 'generated/faker.ts')
actions_code = c.create_actions_code(actions, schema_page, crud_page, f'generated/backend.json')
final = c.create_actions_page(actions, json.loads(actions_code, strict = False), crud_page, 'generated/backend.ts')
"""

#pages = p.create_page_structure("Task: " + initial_prompt + "\n\nHere is the database schema for the avaiable database objects you are to use: \n<Schemas>\n" + str(schema) + "\n</Schemas>\n\n Here are the backend queries and mutations that you can call: \n<backend>" + str(actions) + "\n</backend>\n\nNow, generate the page layout strictly in the json format described above." )
#p.write_to_file(pages, 'generated/page_schema.json')

page_schema = ''

with open('generated/page_schema.json', 'r') as file:
    page_schema = file.read()

frontend = p.create_frontend("Task: " + initial_prompt + "\n\nHere is the database schema code for the avaiable database objects you are to use in your code: \n<Schemas>\n" + str(schema) + "\n</Schemas>\n\n Here are the backend queries and mutations that you can call: \n<backend>" + str(actions) + "\n</backend>\n\nNow, generate the page layout strictly in the json format described above.\n\nHere are the pages to generate code for:\n<pages>" + page_schema + "\n</pages>\n\nGo page by page and generate the corresponding code in react and tailwind." )
p.write_to_file(frontend, 'generated/frontend.json')

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