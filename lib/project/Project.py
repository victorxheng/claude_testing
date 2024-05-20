import os
from dataclasses import dataclass
from abc import ABC, abstractmethod
from typing import List, Optional, Self, Callable
from uuid import UUID

"""
Components of the project should satisfy the ProjectComponent interface, which provides everything needed to save, load, write, edit, and create new instances of that component
class ProjectComponent(ABC):

    @abstractmethod
    def serialize(self)

    @abstractmethod
    def deserialize(self)

    @abstractmethod
    def write(self, path)

    @abstractmethod
    def create_new(self)

    @abstractmethod
    def to_system_message(self)

    @abstractmethod
    def edit_message(self)


*** NEW PAGE FLOW ***
    IN:
        REQUEST FOR NEW PAGE
    AI WRITES PAGE DESCRIPTION
    AI WRITES COMPONENT DESCRIPTIONS
    CREATE AND AI EDITS EACH COMPONENT (Component.create_new)
    CREATE AND AI EDITS PAGE (Page.create_new)
"""

"""
NEW IDEA:
class Plugin(ABC):
    detects all creatable objects and their create schemas (all editable objects must have schemas which properly instantiate boilerplate)
    detects all editable objects (components, pages, tables)
    manages files for objects
    provides documentation for plugin
    provides knowledge base
"""

class FileManager:
    def __init__(self, path: str, fm: Optional[Self]):
        if fm is not None:
            self.path = os.path.join(fm.path, path)
        else:
            self.path = path
    
    def read(self, file: str):
        with open(os.path.join(self.path, file), "r") as f:
            return f.read()
    
    def write(self, file: str, content: str):
        with open(os.path.join(self.path, file), "w") as f:
            f.write(content)

    def exists(self, file: str):
        return os.path.exists(os.path.join(self.path, file))

class Project:
    pass

# this should be changed to "Creatable/Editable Object"
# then add view_source so AI can view before editing.
class PluginObject(ABC):
    @staticmethod
    @abstractmethod
    def create_schema() -> dict:
        pass

    @staticmethod
    @abstractmethod
    def get_name() -> str:
        pass

    @abstractmethod
    def get_id(self) -> UUID:
        pass

    @abstractmethod
    def edit(self, edits: str):
        pass
        

class Plugin(ABC):
    @abstractmethod
    def __init__(self, fm: FileManager):
        pass

    @abstractmethod
    def documentation(self) -> str:
        pass

    @abstractmethod
    def plugin_objects(self) -> List[type[PluginObject]]:
        pass

# @dataclass
# class BackendTable:
#     pass

# class BackendQuery:
#     pass

# class BackendMutation:
#     pass

# @dataclass
# class Component:
#     name: str
#     description: str
#     code: str
#     fm: FileManager

#     def serialize(self):
#         return {"name": self.name, "description": self.description}

#     @classmethod
#     def deserialize(cls, component_dict, fm: FileManager) -> Self:
#         component_dict["code"] = fm.read(component_dict["name"] + ".tsx")
#         return cls(**component_dict, fm=fm)
    
#     @classmethod
#     def create_new(cls, name: str, description: str, fm: FileManager) -> Self:
#         with open("boilerplate/new_component.tsx", "r") as f:
#             code = f.read()
#         fm.write(name + ".tsx", code)
#         return cls(name, description, code, fm)
    
#     @classmethod
#     def get_schema_new(cls) -> dict:
#         return {"name": "The name of the component"}

# @dataclass
# class Page:
#     url: str
#     title: str
#     description: str
#     code: str
#     components: List[Component]
#     fm: FileManager

#     def serialize(self):
#         return {"url": self.url, "title": self.title, "description": self.description, "components": [component.serialize() for component in self.components]}
    
#     @classmethod
#     def deserialize(cls, page_dict, fm: FileManager) -> Self:
#         page_dict["components"] = [Component.deserialize(component_dict, FileManager(os.path.join(page_dict["url"], "components"), fm)) for component_dict in page_dict["components"]]

#         page_dict["code"] = fm.read(os.path.join(page_dict["url"], "page.tsx"))
#         return cls(**page_dict)
    
#     @classmethod
#     def create_new(cls, url: str, title: str, description: str, components: List[Component], fm: FileManager) -> Self:
#         with open("boilerplate/new_page.tsx", "r") as f:
#             code = f.read()
#         fm.write(url + ".tsx", code)
#         return cls(url, title, description, code, components, fm)
