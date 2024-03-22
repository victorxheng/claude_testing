from typing import Optional
import anthropic
import dotenv
import json
import httpx
import base64

dotenv.load_dotenv()

client = anthropic.Anthropic()
model = "claude-3-haiku-20240307"

def send_message(system, messages):
    reply = ''
    with client.messages.stream(
        model=model,
        max_tokens=4096,
        temperature=0.0,
        system=system,
        messages=messages) as stream:
            for text in stream.text_stream:
                reply += text
                print(text, end="", flush=True)
    print()
    return reply

def create_user_message(message_content: str, img_media_type: Optional[str] = None, img_data: Optional[str] = None):
    if img_data:
        return {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": message_content
            },
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": img_media_type,
                    "data": img_data,
                },
            }
        ],
    }
    return {"role": "user", "content": message_content}

def create_assistant_message(message_content: str):
    return {"role": "assistant", "content": message_content}

def create_json_prompt_guard(json):
    return '''Output a json object fitting the schema in the following <jsonSchema> tag.
Code only, no commentary, no introduction sentence, no codefence block.
Do not output triple backticks with or without json language name. Start with the content of the json object or array directly.

If you are not sure or cannot generate something for any possible reason, return:
{"error" : <the reason of the error>}
<jsonSchema>
''' + json + '''
</jsonSchema>
'''

def dump_backend(schema, queries, mutations):
    return f'''The database schema for this app is as follows:
{json.dumps(schema, indent=2)}
The queries available to the frontend are as follows:
{json.dumps(queries, indent=2)}
The mutations available to the frontend are as follows:
{json.dumps(mutations, indent=2)}'''

def extract_context_from_backend(path):
    with open(path, 'r') as f:
        backend = json.loads(f.read())
    prompt = backend["description"] + '\n' + backend["features_description"]
    schema = list(map(lambda table: {"name": table["name"], "docs": table["docs"]}, backend["schema_tables"]))
    queries = backend["query_actions"]
    for query in queries:
        del query["workflow_steps"]
    mutations = backend["mutation_actions"]
    for mutation in mutations:
        del mutation["workflow_steps"]
    return prompt, schema, queries, mutations

def generate_page_list(prompt, backend_info):
    system = f'''You are writing a web app with React, Convex, and Tailwind. Take the user's description of the app and list out what pages the app will need. The titles of pages should not have spaces. {backend_info}
''' + create_json_prompt_guard('''{
    pages: [
        {
            url: string,
            title: string,
            description: string
        }
    ]
}''')
    message = send_message(system, messages=[
        create_user_message(prompt)
    ])
    return json.loads(message)

def generate_component_list(prompt, backend_info, pages):
    system = f'''You are writing a web app with React, Convex, and Tailwind. Take the user's description of the app and list of pages they want, and for each page, add an array of components that are necessary to make up that page. If any components are shared, do not omit them. For example, if there should be a navbar, then include the Navbar component in every page. {backend_info}
''' + create_json_prompt_guard('''{
    pages: [
        {
            url: string,
            title: string,
            description: string,
            components: [
                {
                    name: string,
                    description: string
                }
            ]
        }
    ]
}''')
    message = send_message(system, messages=[
        create_user_message(prompt + '\n' + json.dumps(pages, indent=2))
    ])
    return json.loads(message)

def generate_component_code(pages, page_title, component_name, prompt, backend_info):
    system = f'''You are writing a web app with React, Convex, and Tailwind. Take the following description of the app and a list of pages and components, and generate the entire file for the requested component. The app description is as follows: {prompt}
The pages are as follows, and you are to write part of the {page_title} page:
{json.dumps(pages, indent=2)}
{backend_info}'''
    message = send_message(system, messages=[
        create_user_message(f'Generate the {component_name} component.')
    ])
    return message

# def generate_updated_router(pages):
#     imports = ''
#     for page in pages:
#         imports += f"import {page['title']} from './routes/{page['title']}'\n"
#     routes = '[\n'
#     for page in pages:
#         routes += '  {\n'
#         routes += f'''    path: "{page['url']}",\n'''
#         routes += f'''    element: <{page['title']} />\n'''
#         routes += '  },\n'
#     routes += ']'
#     return '''import React from 'react';
# import ReactDOM from 'react-dom/client';
# import { ConvexProvider, ConvexReactClient } from "convex/react";
# import {
#   createBrowserRouter,
#   RouterProvider,
# } from "react-router-dom";
# ''' + imports + '''
# const router = createBrowserRouter(''' + routes + ''');

# const convex = new ConvexReactClient(process.env.REACT_APP_CONVEX_URL ?? '');

# const root = ReactDOM.createRoot(
#   document.getElementById('root') as HTMLElement
# );

# root.render(
#   <React.StrictMode>
#     <ConvexProvider client={convex}>
#     <RouterProvider router={router} />
#     </ConvexProvider>
#   </React.StrictMode>
# );'''

prompt, schema, queries, mutations = extract_context_from_backend("results.json")
backend_info = dump_backend(schema, queries, mutations)
# pages = generate_page_list(prompt, backend_info)
# pages = [
#     {
#         "url": "/",
#         "title": "Home",
#         "description": "The main timeline view showing tweets from followed users"
#     },
#     {
#         "url": "/register",
#         "title": "Register",
#         "description": "Page for users to create a new account"
#     },
#     {
#         "url": "/login",
#         "title": "Login",
#         "description": "Page for users to log in to their account"
#     },
#     {
#         "url": "/tweet",
#         "title": "NewTweet",
#         "description": "Page for users to compose and post a new tweet"
#     },
#     {
#         "url": "/profile/:username",
#         "title": "UserProfile",
#         "description": "Page showing a user's profile and their tweets"
#     },
#     {
#         "url": "/search",
#         "title": "Search",
#         "description": "Page for searching for users and tweets"
#     },
#     {
#         "url": "/follow/:username",
#         "title": "FollowUser",
#         "description": "Page for a user to follow another user"
#     }
# ]

# pages = generate_component_list(prompt, backend_info, pages)
pages = [
    {
        "url": "/",
        "title": "Home",
        "description": "The main timeline view showing tweets from followed users",
        "components": [
            {
                "name": "Navbar",
                "description": "The navigation bar with links to different pages"
            },
            {
                "name": "TweetFeed",
                "description": "The feed of tweets from the user's followed users"
            },
            {
                "name": "TweetComposer",
                "description": "The component for composing and posting a new tweet"
            }
        ]
    },
    {
        "url": "/register",
        "title": "Register",
        "description": "Page for users to create a new account",
        "components": [
            {
                "name": "Navbar",
                "description": "The navigation bar with links to different pages"
            },
            {
                "name": "RegistrationForm",
                "description": "The form for users to enter their registration details"
            }
        ]
    },
    {
        "url": "/login",
        "title": "Login",
        "description": "Page for users to log in to their account",
        "components": [
            {
                "name": "Navbar",
                "description": "The navigation bar with links to different pages"
            },
            {
                "name": "LoginForm",
                "description": "The form for users to enter their login credentials"
            }
        ]
    },
    {
        "url": "/tweet",
        "title": "NewTweet",
        "description": "Page for users to compose and post a new tweet",
        "components": [
            {
                "name": "Navbar",
                "description": "The navigation bar with links to different pages"
            },
            {
                "name": "TweetComposer",
                "description": "The component for composing and posting a new tweet"
            }
        ]
    },
    {
        "url": "/profile/:username",
        "title": "UserProfile",
        "description": "Page showing a user's profile and their tweets",
        "components": [
            {
                "name": "Navbar",
                "description": "The navigation bar with links to different pages"
            },
            {
                "name": "UserProfile",
                "description": "The component displaying the user's profile information"
            },
            {
                "name": "TweetFeed",
                "description": "The feed of tweets posted by the user"
            },
            {
                "name": "FollowButton",
                "description": "The button for following or unfollowing the user"
            }
        ]
    },
    {
        "url": "/search",
        "title": "Search",
        "description": "Page for searching for users and tweets",
        "components": [
            {
                "name": "Navbar",
                "description": "The navigation bar with links to different pages"
            },
            {
                "name": "SearchBar",
                "description": "The search input field and button"
            },
            {
                "name": "UserSearchResults",
                "description": "The list of users matching the search query"
            },
            {
                "name": "TweetSearchResults",
                "description": "The list of tweets matching the search query"
            }
        ]
    },
    {
        "url": "/follow/:username",
        "title": "FollowUser",
        "description": "Page for a user to follow another user",
        "components": [
            {
                "name": "Navbar",
                "description": "The navigation bar with links to different pages"
            },
            {
                "name": "UserProfile",
                "description": "The profile information of the user to be followed"
            },
            {
                "name": "FollowButton",
                "description": "The button for following or unfollowing the user"
            }
        ]
    }
]
# print(generate_updated_router(pages))
print(backend_info)
# for page in pages[:1]:
#     for component in page["components"][1:2]:
#         generate_component_code(pages, page["title"], component["name"], prompt, backend_info)

# prompt, schema, crud = extract(results.json)
# pages: [{url: str, title: str, description: string}] = generate_page_list(prompt, schema)
# update_router(pages)
# components: {page_title: [{name: str, description: str}]} = generate_component_list(prompt, schema, pages)
# for page in components:
#   for component in page:
#       generate_component(component, prompt, schema, crud)
# for page in pages:
#   generate_page_component(page, components[page], prompt)