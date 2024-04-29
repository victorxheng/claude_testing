from dataclasses import dataclass
import json
import os
from typing import List
import anthropic
import dotenv
import json
from typing import List, Optional


dotenv.load_dotenv()

def p(name):
    f = open("prompts/" + name + ".txt", "r")
    return f.read()

client = anthropic.Anthropic()
model = "claude-3-opus-20240229"

def send_message(system: str, messages: List):
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

def user_msg(message_content: str):
    return {"role": "user", "content": message_content}

def asst_msg(message_content: str):
    return {"role": "assistant", "content": message_content}

def read(file_path):
  with open(file_path, 'r') as f:
    return f.read()

def write(file_path, content):
  with open(file_path, 'w') as f:
    f.write(content)

def json_prompt_guard(json):
    return '''Output a json object that is correctly formated with quotes around field names and only single line fields, fitting the schema in the following <jsonSchema> tag.
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
<DatabaseSchema>
{json.dumps(schema, indent=2)}
</DatabaseSchema>

The queries available to the frontend are as follows:
<Queries>
{json.dumps(queries, indent=2)}
</Queries>

The mutations available to the frontend are as follows:
<Mutations>
{json.dumps(mutations, indent=2)}
</Mutations>

All return values are as stated, there is no object with a data field, error field, loading field, etc that is returned.

''' + p("convex_ex")

def extract_backend(schema_json_path, actions_json_path):
    with open(schema_json_path, 'r') as f:
        schema_json = json.loads(f.read())
    with open(actions_json_path, 'r') as f:
        actions_json = json.loads(f.read())
    prompt = schema_json["description"] + '\nFeatures: ' + schema_json["features_description"] + '\nActions: ' + actions_json["actions_description"]
    schema = schema_json["schema_tables"]
    queries = actions_json["query_actions"]
    for query in queries:
        del query["workflow_steps"]
    mutations = actions_json["mutation_actions"]
    for mutation in mutations:
        del mutation["workflow_steps"]
    return prompt, schema, queries, mutations


def generate_component_list(schema_path, actions_path):
    prompt, schema, queries, mutations = extract_backend(schema_path, actions_path)
    backend_info = dump_backend(schema, queries, mutations)
    system = f'''You are writing a web app with Next.js, Convex, and Tailwind. Take the user's description of the app and list out what pages the app will need. The titles of pages should not have spaces. 
Additionally, use information provided on the backend:
{backend_info}
''' + json_prompt_guard('''{
    pages: [
        {
            "url": string,
            "title": string,
            "description": string
        }
    ]
}''')
    pages = send_message(system, messages=[
        user_msg(prompt)
    ])
    system = f'''You are writing a web app with Next.js, Convex, and Tailwind. 
Take the user's description of the app and list of pages they want, and for each page, add an array of components that are necessary to make up that page. If any components are shared, do not omit them. For example, if there should be a navbar, then include the Navbar component in every page. 
You must base components on what is available in the back end and its requirements:
{backend_info}
''' + json_prompt_guard('''{
    pages: [
        {
            "url": string route path in next js form,
            "title": string page title,
            "description": string description of the page,
            "components": [
                {
                    "name": string,
                    "description": string
                }
            ]
        }
    ]
}''')
    message = send_message(system, messages=[
        user_msg(prompt + '\n\n Here are the pages:\n' + pages)
    ])
    return str(message)

page_boilerplate = read('boilerplate/boilerplate-page.txt')
component_boilerplate = read('boilerplate/boilerplate-component.txt')

def add_lines(page):
  page_with_lines = page.split('\n')
  page_with_lines = [f'{i} ' + line for i, line in enumerate(page_with_lines)]
  page_with_lines = '\n'.join(page_with_lines)
  return page_with_lines

@dataclass
class ReplaceTag:
  start: int
  end: int
  content: str

def get_replace_tags(llm_output: str) -> List[ReplaceTag]:
  tags = []
  # llm likes to yap so cut to the chase
  first_replace = llm_output.index("<replace")
  # split by every time the tag begins
  for tag in llm_output[first_replace:].split('<replace ')[1:]:
    # get everything between when the tag begins and ends
    tag_text = tag.split('\n</replace>')[0]
    # get the rest of the line with the beginning of the tag "start=x end=y>"
    tag_header = tag_text.split('\n')[0]
    # get rid of the first line with the rest of the beginning of tag
    tag_text = '\n'.join(tag_text.split('\n')[1:])
    tag_start = int(tag_header.split('end')[0][6:])
    tag_end = int(tag_header.split('end=')[1][:-1])
    tags.append(ReplaceTag(tag_start, tag_end, tag_text))
  return tags

def diff_replace_tags(file_path, tags: List[ReplaceTag]):
  lines = read(file_path).split('\n')
  for tag in tags[::-1]:
    for line_num in reversed(range(tag.start, tag.end)):
      del lines[line_num]
    for line_num, line in enumerate(tag.content.split('\n')):
      lines.insert(tag.start + line_num, line)
  
  write(file_path, '\n'.join(lines))


def generate_page(path, pages, page, schema_path, actions_path):
  # extracts information and builds prompts
  prompt, schema, queries, mutations = extract_backend(schema_path, actions_path)
  backend_info = dump_backend(schema, queries, mutations)
  system = f'''
You are writing a web app with Next.js, Convex, and Tailwind. Take the following description of the app and a list of pages and components, and edit the boilerplate file. 
The app description is as follows: \n{prompt}
You are to write the {page['title']} page.
List of pages:
{json.dumps(pages, indent=2)}
{p("styling")}
{backend_info}
{p("edit")}
'''
  print(system)


  dir = f'{path}{page["url"]}/'
  os.makedirs(os.path.join(dir, 'components'), exist_ok=True)
  page_file_path = os.path.join(dir, 'page.tsx')
  write(page_file_path, page_boilerplate)

  for i, component in enumerate(page['components']):
    print(f'Writing the {component["name"]} component... (enter)')

    component_file_path = os.path.join(dir, 'components', component['name'] + '.tsx')
    write(component_file_path, component_boilerplate)
    message = send_message(system, messages=[
      user_msg(f'Edit the following file for the {component["name"]} component of the {page["title"]} page:\n<page>\n{add_lines(component_boilerplate)}\n</page>')
    ])
    replace_tags = get_replace_tags(message)
    diff_replace_tags(component_file_path, replace_tags)
    print(f'Writing the page.tsx... (enter)')


    user_message = '''So far, you have the following components in the components/ directory, which is in the same directory as the page.tsx file:
  '''
    for component in page['components'][:i + 1]:
      user_message += f'{component["name"]}.tsx:\n'
      user_message += read(component_file_path) + '\n\n'
      user_message += f'Use the currently written components and edit the following file for the {page["title"]} page. Do not use components that haven\'t been explicitly stated as written; just ignore that part of the page.tsx file:\n{add_lines(read(page_file_path))}'

    message = send_message(system, messages=[
      user_msg(user_message)
    ])
    replace_tags = get_replace_tags(message)
    diff_replace_tags(page_file_path, replace_tags)
  
    while (edits := input('Edits to this component (enter to accept): ').strip()) != '':
      message = send_message(system, messages=[
        user_msg(f'Make the following changes to the file for the {component["name"]} component of the {page["title"]} page: {edits}\n{add_lines(read(component_file_path))}')
      ])
      replace_tags = get_replace_tags(message)
      diff_replace_tags(component_file_path, replace_tags)


def generate_page(path, pages, schema_path, actions_path):
   for page in pages:
      generate_page(path, pages, page, schema_path, actions_path)
