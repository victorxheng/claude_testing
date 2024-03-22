from typing import List, Optional
import anthropic
import dotenv
import json
import httpx
import base64

dotenv.load_dotenv()

# class WritePageFromStructureTool(BaseTool):
#     name = "write_page_from_structure"
#     description = "Receives a structure of a page broken down into components and writes each component in React and Tailwind, then combines them into the page component."
#     parameters = [
#         {
#             "name": "components",
#             "type": "list",
#             "description": "List of components, in order, that the page should be composed of.",
#             "items": {
#                 "type": "str",
#                 "name": "The name of the component, in PascalCase"
#                 }
#         }
#     ]
#     def use_tool(self, components: List[str]):
#         pass

#     def __init__(self):
#         super().__init__(self.name, self.description, self.parameters)

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

    def create_user_message(self, message_content: str, img_media_type: Optional[str] = None, img_data: Optional[str] = None):
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
    
    def create_assistant_message(self, message_content: str):
        return {"role": "assistant", "content": message_content}

    def create_page_structure(self, prompt: str):
        # system = '''You are writing landing pages with React and Tailwind. Take the request and think about what components the landing will need. Then, list them out in the order they should be in in the code. Call the write_page_from_structure function with your list of components. Here is the landing page description:\n'''
        # # message = self.send_message(system, messages=[
        # #     self.create_user_message(prompt)
        # # ])
        # message = self.structure_maker_tool_user.use_tools([self.create_user_message(system + prompt)], execution_mode='manual')
        system = '''You are writing landing pages with React and Tailwind. Take the request and think about what components the landing will need. Then, list them out in the order they should be in in the code. Output a json object or array fitting the schema in the following <jsonSchema> tag.
Code only, no commentary, no introduction sentence, no codefence block.
Do not output triple backticks with or without json language name. Start with the content of the json object or array directly.

If you are not sure or cannot generate something for any possible reason, return:
{"error" : <the reason of the error>}
<jsonSchema>
{
    components: [
        {
            name: string
            description: string
        }
    ]
}
</jsonSchema>'''
        message = self.send_message(system, messages=[
            self.create_user_message(prompt)
        ])
        return json.loads(message)
    '''using the provided reference image to help style the component. Do not copy any text in the reference image, just use it for inspiration while styling. Use the following breakdown of the reference image as well:'''
    
    def write_component_code_from_description(self, prompt, reference_media_type, reference_data, components, component_index):
        system = '''You are writing landing pages with React and Tailwind. You will be given a breakdown of how the landing page should be separated into components. Use Tailwind for styling, basing the design off the reference image and reference breakdown, and write only the code for the component being written. Do not leave anything blank, or to be filled in later. If you need to do some copywriting then do so. Do not leave unfinished sections, for example, do not write "Add more feature items here". Make sure to adhere to the prompt, which will be supplied by the user. Write ONLY code, do not explain the code.'''
        messages=[
            self.create_user_message(f'''
Here's the page structure for the landing page:
{newline.join([component["name"] + ": " + component["description"] for component in components])}

Write the file for the {components[component_index]["name"]} component. Use the following breakdown as a reference for styling:
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
Responsive design: sm:, lg:

Make sure to adhere to this prompt: ''' + prompt, reference_media_type, reference_data)
        ]
        message = self.send_message(system, messages)
        return message

    def write_page_code_from_description(self, prompt, components):
        system = '''You are writing landing pages with React and Tailwind. You will be given a breakdown of how the landing page should be separated into components. The components have already been written and saved to the src directory, which is the same directory as App.jsx. Now you need to combine them into one App.jsx file. Include imports to the written components, which are in the same directory and do not need to be prefixed by anything, like components/. Write only the App.jsx file, do not write any other code for any other components.'''
        messages=[
            self.create_user_message(prompt + f'''
Here's the page structure for the landing page:
{newline.join([component["name"] + ": " + component["description"] for component in components])}

Write the App.jsx file, and only the App.jsx file. Do not write any other components.''')
        ]
        message = self.send_message(system, messages)
        return message
    
    def write_code_to_file(self, reply, path):
        code = reply.split('```jsx')[1].split('```')[0]
        with open(path, 'w') as f:
            f.write(code)

reference_url = "https://media.discordapp.net/attachments/758017965508788254/1215281033231204412/image.png?ex=65fc2da9&is=65e9b8a9&hm=5eba1351f92944e63717c6f83fc9038d8f41a4d445e709e30ecc63bdff4b391a&=&format=jpeg&quality=lossless&width=1100&height=576"
reference_media_type = "image/jpeg"
reference_data = base64.b64encode(httpx.get(reference_url).content).decode("utf-8")

newline = '\n'
# prompt = 'A landing page for vly.ai with a navbar, hero section, info section, faq, try it out section, and footer. The website should talk abotu how vly.ai is a revolutionary no-code platform for generating SaaS apps with natural language. We use LLMs and a highly optimized knowledge base with vector retrievals and recursive iteration system to allow full control over creating and modifying web apps - all with no code. The try it out section should include a textbox for users to enter a prompt, like this one, and with the click of a button, have it generate their landing page. While generating, there should be a space to view system output and what files are being generated.'

project = Project()
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