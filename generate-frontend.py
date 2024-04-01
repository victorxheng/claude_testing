from typing import Optional
import anthropic
import dotenv
import json
import httpx
import base64

dotenv.load_dotenv()

client = anthropic.Anthropic()
model = "claude-3-sonnet-20240229"

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
{json.dumps(mutations, indent=2)}
All return values are as stated, there is no object with a data field, error field, loading field, etc that is returned.
''' + '''
In order to use a query or mutation, import the api object from convex and use the useQuery or useMutation functions:
```jsx
"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import useStoreUserEffect from "@/useStoreUserEffect";

export default function Home() {
  const userId = useStoreUserEffect();
  // note that this is not `const { data: tasks, isLoading, error } = ...`
  const tasks = useQuery(api.backend.get, userId ? { userId }: 'skip');
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
    </main>
  );
}
```
```jsx
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function MyApp() {
  const mutateSomething = useMutation(api.backend.mutateSomething);
  const handleClick = () => {
    mutateSomething({ a: 1, b: 2 });
  };
  // pass `handleClick` to a button
  // ...
}
```
All available queries and mutations are in the api.backend object.

In order to get the current user, use the useUser function from Clerk. To get the current userId, which can be used in mutations and queries, use the useStoreUserEffect function. the returned userId can be null, so use the non-null assertion operator, or pass 'skip' into useQuery instead of args where needed. Always use the userId to check if 'skip' should be passed in, i.e. do not use isSignedIn in queries and mutations.
```jsx
"use client";
import useStoreUserEffect from "@/useStoreUserEffect";
import { useUser } from "@clerk/clerk-react";

export default function UserInfo() {
    const userId = useStoreUserEffect();
    const { isSignedIn, user } = useUser();
    if (!isSignedIn) {
        return <></>
    }
    return <div>{user.fullName}, {userId!}, {user.imageUrl}</div>;
}
```
'''

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
    system = f'''You are writing a web app with Next.js, Convex, and Tailwind. Take the user's description of the app and list out what pages the app will need. The titles of pages should not have spaces. {backend_info}
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
    system = f'''You are writing a web app with Next.js, Convex, and Tailwind. Take the user's description of the app and list of pages they want, and for each page, add an array of components that are necessary to make up that page. If any components are shared, do not omit them. For example, if there should be a navbar, then include the Navbar component in every page. {backend_info}
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
    system = f'''You are writing a web app with Next.js, Convex, and Tailwind. Take the following description of the app and a list of pages and components, and generate the entire file for the requested component. The app description is as follows: {prompt}
Use the following breakdown as a reference for styling:
Background:
The overall background color is white (bg-white)
There are two decorative background gradient elements positioned absolutely:
Top gradient: Positioned above the main content, rotated 30deg, using a gradient from #ff80b5 to #9089fc, with 30% opacity. It has a complex polygon clip-path.

Bottom gradient: Positioned below the main content, using the same gradient and opacity as the top one, but with a different polygon clip-path.
Header:
The header is positioned absolutely at the top (absolute inset-x-0 top-0) with a high z-index (z-50)
It contains a navigation bar with a logo on the left, navigation links in the center (hidden on mobile), and a "Log in" link on the right (hidden on mobile)
The mobile menu is hidden by default and shown when the menu button is clicked
The mobile menu is a full-screen overlay with navigation links and a close button

Hero Section:
The hero section has a maximum width (max-w-2xl) and is centered horizontally (mx-auto)
It has top and bottom padding that adjusts based on the screen size (py-32 sm:py-48 lg:py-56)
The content is centered within the hero section (text-center)
It contains a hidden announcement bar (hidden sm:flex) with rounded corners and a ring border
The main heading is large (text-4xl sm:text-6xl) with bold font weight and tight letter spacing
The paragraph has a light gray color (text-gray-600) and a larger font size (text-lg)
The call-to-action buttons are centered (flex items-center justify-center) with a gap between them (gap-x-6)
The primary button has a indigo background (bg-indigo-600), white text (text-white), and a hover effect (hover:bg-indigo-500)
The secondary button has a dark gray text color (text-gray-900) and an arrow icon

Tailwind Classes:
Font sizes: text-sm, text-base, text-lg, text-xl, text-4xl, text-6xl
Font weights: font-semibold, font-bold
Text colors: text-gray-600, text-gray-900, text-white, text-indigo-600
Background colors: bg-white, bg-gray-50, bg-indigo-600
Padding: p-1.5, p-2.5, p-3, p-6, px-3, px-6, px-8, py-1, py-2, py-6, py-32, py-48, py-56
Margin: m-1.5, mx-auto, mt-6, mt-10
Border radius: rounded-md, rounded-lg, rounded-full
Ring width: ring-1
Ring color: ring-gray-900/10, ring-gray-900/20
Hover effects: hover:bg-gray-50, hover:bg-indigo-500, hover:ring-gray-900/20
Focus effects: focus-visible:outline, focus-visible:outline-2, focus-visible:outline-offset-2, focus-visible:outline-indigo-600
Z-index: z-10, z-50
Opacity: opacity-30
Transformations: transform-gpu, -translate-x-1/2, rotate-[30deg]
Gradients: from-[#ff80b5], to-[#9089fc]
Clip-path: polygon(...)
Flexbox: flex, flex-1, items-center, justify-center, justify-between, gap-x-6, gap-x-12
Grid: grid, grid-cols-1, gap-y-10
The pages are as follows, and you are to write part of the {page_title} page. You only have the following components to work with, so do not import any components in your code:
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
for page in pages[:1]:
    for component in page["components"][1:2]:
        generate_component_code(pages, page["title"], component["name"], prompt, backend_info)

# prompt, schema, crud = extract(results.json)
# pages: [{url: str, title: str, description: string}] = generate_page_list(prompt, schema)
# update_router(pages)
# components: {page_title: [{name: str, description: str}]} = generate_component_list(prompt, schema, pages)
# for page in components:
#   for component in page:
#       generate_component(component, prompt, schema, crud)
# for page in pages:
#   generate_page_component(page, components[page], prompt)