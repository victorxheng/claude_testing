import re
import os

def remove_links(file_path):
  with open(file_path, 'r') as f:
    text = f.read()
  with open(file_path, 'w') as f:
    f.write(re.sub(r"!?\[([^\]]*)\]\([^ ]+\)", r"\1", text))

def remove_all_links(dir):
  for path in os.listdir(dir):
    if os.path.isdir(os.path.join(dir, path)):
      remove_all_links(os.path.join(dir, path))
    else:
      remove_links(os.path.join(dir, path))

remove_all_links('./')