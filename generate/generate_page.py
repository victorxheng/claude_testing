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
    for line_num in reversed(range(tag.start, tag.end+1)):
      del lines[line_num]
    for line_num, line in enumerate(tag.content.split('\n')):
      lines.insert(tag.start + line_num, line)
  
  write(file_path, '\n'.join(lines))

def get_knowledge_base():
  return json.loads(read("generated/knowledge_base.json"))

def write_knowledge_base(knowledge_base):
  write("generated/knowledge_base.json", json.dumps(knowledge_base, indent=2))

class Project:
  def __init__(self, path, pages, schema_path, actions_path):
    self.path = path
    prompt, schema, queries, mutations = extract_backend(schema_path, actions_path)
    backend_info = dump_backend(schema, queries, mutations)
    self.system = f'''
You are writing a web app with Next.js, Convex, and Tailwind. Take the following description of the app and a list of pages and components, and edit the file. When editing, write all the code necessary, do not leave any unfinished sections.
The app description is as follows: \n{prompt}
List of pages:
{json.dumps(pages, indent=2)}
{p("styling")}
{backend_info}
{p("edit")}
'''
    self.shared_components = set()
    components = set()
    for page in pages:
        for component in page['components']:
          if (component['name'], component['description']) in components:
              self.shared_components.add((component['name'], component['description']))
          components.add((component['name'], component['description']))
    
    for page in pages:
      page_file_path = f'{path}{page["url"]}/'
      page['generated'] = True
      for component in page['components']:
        if (component['name'], component['description']) in self.shared_components:
          component['shared'] = True
          component_file_path = os.path.join(path, 'components', component['name'] + '.tsx')
        else:
          component['shared'] = False
          component_file_path = os.path.join(page_file_path, 'components', component['name'] + '.tsx')
        if os.path.isfile(component_file_path):
          component['generated'] = True
        else:
          page['generated'] = False
          component['generated'] = False

    self.pages = pages

  def print_pages_menu(self):
    for i, page in enumerate(self.pages):
      print(f'{(i)} {page["title"]} ({"g" if page["generated"] else "ng"})')
  
  def print_page_menu(self, page_idx):
    page = self.pages[page_idx]
    print(f'{page["title"]} ({"g" if page["generated"] else "ng"})')
    for i, component in enumerate(page['components']):
      print(f'({i}) {component["name"]} ({"g" if component["generated"] else "ng"}) ({"s" if component["shared"] else "ns"})')

  def edit_page(self, page_idx: int, edit_request: str):
    page = self.pages[page_idx]
    page_dir = f'{self.path}{page["url"]}/'
    page_file_path = os.path.join(page_dir, 'page.tsx')
    user_message = '''You have the following components in the ./components directory, which is in the same directory as the page.tsx file:
    '''
    for component in page['components']:
      if component['generated'] and not component['shared']:
        user_message += f'{component["name"]}.tsx:\n'
        user_message += read(os.path.join(page_dir, 'components', component['name'] + '.tsx')) + '\n\n'

    user_message += '''And the following components in @/app/components directory:
'''
    for component in page['components']:
      if component['generated'] and component['shared']:
        user_message += f'{component["name"]}.tsx:\n'
        user_message += read(os.path.join(page_dir, 'components', component['name'] + '.tsx')) + '\n\n'

    user_message += f'Make the following changes to the page.tsx for the {page["title"]} page: {edit_request}\n{add_lines(read(page_file_path))}'
    message = send_message(self.system, messages=[
      user_msg(user_message)
    ])
    diff_replace_tags(page_file_path, get_replace_tags(message))

  def extract_styles(self, code: str):
    system = f'''You are an expert in Tailwind. Take the code the user gives you and break down the styles and themes used in the code, similar to the following breakdown:
    {p("styling")}
    '''
    send_message(system, messages=[user_msg(code)])


  def add_to_knowledge_base(self, page_idx: int, component_idx: int):
    knowledge_base = get_knowledge_base()

    component = {'name': self.pages[page_idx]['components'][component_idx]['name'], 'description': self.pages[page_idx]['components'][component_idx]['description']}
    page = {'title': self.pages[page_idx]['title'], 'description': self.pages[page_idx]['description']}

    page_dir = f'{self.path}{self.pages[page_idx]["url"]}/'
    if self.pages[page_idx]['components'][component_idx]['shared']:
      component_file_path = os.path.join(self.path, 'components', component['name'] + '.tsx')
    else:
      component_file_path = os.path.join(page_dir, 'components', component['name'] + '.tsx')
    component['code'] = read(component_file_path)
    page['components'] = [component]
    knowledge_base['pages'].append(page)
    write_knowledge_base(knowledge_base)
  
  def edit_component(self, page_idx: int, component_idx: int, edit_request: str = ''):
    page = self.pages[page_idx]
    component = page['components'][component_idx]
    page_dir = f'{self.path}{page["url"]}/'
    page_file_path = os.path.join(page_dir, 'page.tsx')
    # get component path
    if component['shared']:
      component_file_path = os.path.join(self.path, 'components', component['name'] + '.tsx')
    else:
      component_file_path = os.path.join(page_dir, 'components', component['name'] + '.tsx')

    # initial generation
    if not component['generated']:
      # edit component
      write(component_file_path, component_boilerplate)
      message = send_message(self.system, messages=[
        user_msg(f'Edit the following file for the {component["name"]} component of the {page["title"]} page:\n<page>\n{add_lines(component_boilerplate)}\n</page>')
      ])
      diff_replace_tags(component_file_path, get_replace_tags(message))
      component['generated'] = True

      # edit page.tsx
      if not os.path.exists(page_file_path):
        write(page_file_path, page_boilerplate)

      user_message = '''So far, you have the following components in the ./components directory, which is in the same directory as the page.tsx file:
    '''
      for component in page['components']:
        if component['generated'] and not component['shared']:
          user_message += f'{component["name"]}.tsx:\n'
          user_message += read(os.path.join(page_dir, 'components', component['name'] + '.tsx')) + '\n\n'

      user_message += '''And the following components in @/app/components directory:
'''
      for component in page['components']:
        if component['generated'] and component['shared']:
          user_message += f'{component["name"]}.tsx:\n'
          user_message += read(os.path.join(page_dir, 'components', component['name'] + '.tsx')) + '\n\n'
      
      user_message += f'Use the currently written components and edit the following file for the {page["title"]} page. Do not use components that haven\'t been explicitly stated as written; just ignore that part of the page.tsx file:\n{add_lines(read(page_file_path))}'
      message = send_message(self.system, messages=[
        user_msg(user_message)
      ])
      diff_replace_tags(page_file_path, get_replace_tags(message))
    else:
      message = send_message(self.system, messages=[
        user_msg(f'Make the following changes to the file for the {component["name"]} component of the {page["title"]} page: {edit_request}\n{add_lines(read(component_file_path))}')
      ])
      diff_replace_tags(component_file_path, get_replace_tags(message))

def generate_page(path, pages, page, schema_path, actions_path, skip=0):
  # extracts information and builds prompts
  prompt, schema, queries, mutations = extract_backend(schema_path, actions_path)
  backend_info = dump_backend(schema, queries, mutations)
  system = f'''
You are writing a web app with Next.js, Convex, and Tailwind. Take the following description of the app and a list of pages and components, and edit the file. When editing, write all the code necessary, do not leave any unfinished sections.
The app description is as follows: \n{prompt}
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
    if i < skip:
       continue
    print(f'Writing the {component["name"]} component... (enter)')

    component_file_path = os.path.join(dir, 'components', component['name'] + '.tsx')
    write(component_file_path, component_boilerplate)
    message = send_message(system, messages=[
      user_msg(f'Edit the following file for the {component["name"]} component of the {page["title"]} page:\n<page>\n{add_lines(component_boilerplate)}\n</page>')
    ])
    diff_replace_tags(component_file_path, get_replace_tags(message))
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


def generate_pages(path, pages, schema_path, actions_path):
   for page in pages:
      generate_page(path, pages, page, schema_path, actions_path)
