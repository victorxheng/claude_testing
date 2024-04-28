from dataclasses import dataclass
import json
import os
from typing import List
from generate_frontend import send_message, create_user_message, pages, prompt, backend_info

def read_file(file_path):
  with open(file_path, 'r') as f:
    return f.read()

def write_file(file_path, content):
  with open(file_path, 'w') as f:
    f.write(content)

page_boilerplate = read_file('boilerplate-page.tsx')
component_boilerplate = read_file('boilerplate-component.tsx')

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
  lines = read_file(file_path).split('\n')
  for tag in tags[::-1]:
    for line_num in reversed(range(tag.start, tag.end)):
      del lines[line_num]
    for line_num, line in enumerate(tag.content.split('\n')):
      lines.insert(tag.start + line_num, line)
  
  write_file(file_path, '\n'.join(lines))

edit_instructions = f'''Edit the file by outputting <replace /> tags as you see fit. The file is marked by line numbers. Use those line numbers in the replace tag to indicate which lines should be replaced. The <replace /> tag takes in two arguments, start (inclusive) and end (exclusive). For example, consider the request "Fix the errors in the poem." and the following file:
0 When, in disgrace with fortune and men's eyes,
1 I all alone beweep my outcast state,
2 And trouble deaf heaven with my bootless cries,
3 And look upon myself and curse my fate,
4 Wishing me like to one more rich in hope,
5 Featured like him, like him with friends possessed,
6 Desiring this man's fart and that man's cope,
7 With what I most enjoy contented least;
8 Haply I think on thee, and then my state,
9 (Like to the lark at break of day arising
10 From sullen earth) sings hymns at heaven's gate;
11        For thy sweet love remembered such wealth brings
12        That then I scorn to change my state with kings.

You would output:
<replace start=6 end=7>
Desiring this man's art and that man's scope
</replace>

<replace start=8 end=8>
Yet in these thoughts myself almost despising,
</replace>

Which would result in the following file:
0 When, in disgrace with fortune and men's eyes,
1 I all alone beweep my outcast state,
2 And trouble deaf heaven with my bootless cries,
3 And look upon myself and curse my fate,
4 Wishing me like to one more rich in hope,
5 Featured like him, like him with friends possessed,
6 Desiring this man's art and that man's scope,
7 With what I most enjoy contented least;
8 Yet in these thoughts myself almost despising,
9 Haply I think on thee, and then my state,
10 (Like to the lark at break of day arising
11 From sullen earth) sings hymns at heaven's gate;
12        For thy sweet love remembered such wealth brings
13        That then I scorn to change my state with kings.

Note the use of an equivalent start and end value in order to insert a line without deleting. Similarly, an empty set of <replace></replace> tags can be used to delete a line without inserting anything. Make sure to put the beginning and ending tags on separate lines. Do not write them with the code on the same line like this: <replace start=3 end=4>const postTweet = useMutation(api.backend.postTweet)</replace>. When replacing, make sure to replace everything you want to be gone and not just the first few lines.
'''

styling_instructions = f'''Use the following breakdown as a reference for styling:
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
'''

def generate_page(pages, page, prompt, backend_info):
  system = f'''You are writing a web app with Next.js, Convex, and Tailwind. Take the following description of the app and a list of pages and components, and edit the boilerplate file. The app description is as follows: {prompt}
You are to write the {page['title']} page.
List of pages:
{json.dumps(pages, indent=2)}
{styling_instructions}
{backend_info}
{edit_instructions}
'''
  dir = f'generated/frontend/{page["title"]}/'
  os.makedirs(os.path.join(dir, 'components'), exist_ok=True)
  page_file_path = os.path.join(dir, 'page.tsx')
  write_file(page_file_path, page_boilerplate)

  for i, component in enumerate(page['components']):
    print(f'Writing the {component["name"]} component... (enter)')
    input()
    component_file_path = os.path.join(dir, 'components', component['name'] + '.tsx')
    write_file(component_file_path, component_boilerplate)
    message = send_message(system, messages=[
      create_user_message(f'Edit the following file for the {component["name"]} component of the {page["title"]} page:\n{add_lines(component_boilerplate)}')
    ])
    replace_tags = get_replace_tags(message)
    diff_replace_tags(component_file_path, replace_tags)
    print(f'Writing the page.tsx... (enter)')
    input()

    user_message = '''So far, you have the following components in the components/ directory, which is in the same directory as the page.tsx file:
  '''
    for component in page['components'][:i + 1]:
      user_message += f'{component["name"]}.tsx:\n'
      user_message += read_file(component_file_path) + '\n\n'
      
      user_message += f'Use the currently written components and edit the following file for the {page["title"]} page. Do not use components that haven\'t been explicitly stated as written; just ignore that part of the page.tsx file:\n{add_lines(read_file(page_file_path))}'

    message = send_message(system, messages=[
      create_user_message(user_message)
    ])
    replace_tags = get_replace_tags(message)
    diff_replace_tags(page_file_path, replace_tags)
  
    while (edits := input('Edits to this component (enter to accept): ').strip()) != '':
      message = send_message(system, messages=[
        create_user_message(f'Make the following changes to the file for the {component["name"]} component of the {page["title"]} page: {edits}\n{add_lines(read_file(component_file_path))}')
      ])
      replace_tags = get_replace_tags(message)
      diff_replace_tags(component_file_path, replace_tags)

generate_page(pages, pages[0], prompt, backend_info)
# tags = get_replace_tags('''<replace start=6 end=7>
# Desiring this man's art and that man's scope
# </replace>

# <replace start=8 end=8>
# Yet in these thoughts myself almost despising,
# </replace>''')
# diff_replace_tags('sonnet_29_bad.txt', tags)
# # print(component_boilerplate)
