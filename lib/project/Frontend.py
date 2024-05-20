from dataclasses import dataclass
from typing import List
from uuid import UUID, uuid4
import json

from lib.project.Project import Plugin, PluginObject, FileManager

class Component(PluginObject):
    def __init__(self, schema, fm: FileManager):
        self.id = schema.get("id", uuid4())
        self.name: str = schema["name"]
        self.description: str = schema["description"]
        if not fm.exists(self.name + ".tsx"):
            with open("boilerplate/new_component.tsx", "r") as f:
                self.code = f.read()
            fm.write(self.name + ".tsx", self.code)
        else:
            self.code = fm.read(self.name + ".tsx")

    @staticmethod
    def create_schema() -> dict:
        return {
            "name": "The name of the component in PascalCase",
            "description": "A detailed description of the component and it's intended purpose"
        }
    
    @staticmethod
    def get_name() -> str:
        return "Component"
    
    def edit(self, edits: str):
        pass

    def get_id(self) -> UUID:
        return self.id
    
    def serialize(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }

class Page(PluginObject):
    def __init__(self, schema, fm: FileManager):
        self.id = schema.get("id", uuid4())
        self.url: str = schema["url"]
        self.title: str = schema["title"]
        self.description: str = schema["description"]

        component_fm = FileManager("components", fm)
        self.components = [Component(component, component_fm) for component in schema.get("components", [])]

        if not fm.exists("page.tsx"):
            with open("boilerplate/new_page.tsx", "r") as f:
                self.code = f.read()
            fm.write("page.tsx", self.code)
        else:
            self.code = fm.read("page.tsx")

    @staticmethod
    def create_schema() -> dict:
        return {
            "url": "The url of the page, specifically the path that will be created in the app/ directory of the Next.js project",
            "title": "The title of the page in PascalCase",
            "description": "A detailed description of the page and it's intended purpose"
        }
    
    @staticmethod
    def get_name() -> str:
        return "Page"
    
    def edit(self, edits: str):
        pass
    
    def get_id(self) -> UUID:
        return self.id
    
    def serialize(self) -> dict:
        return {
            "id": self.id,
            "url": self.url,
            "title": self.title,
            "description": self.description,
            "components": [component.serialize() for component in self.components]
        }

class Frontend(Plugin):
    def __init__(self, fm: FileManager):
        self.fm = fm
        self.pages = []
    
    def plugin_objects(self) -> List[type[PluginObject]]:
        return [Page, Component]

    def documentation(self) -> str:
        return f"""{json.dumps([page.serialize() for page in self.pages], indent=2)}"""