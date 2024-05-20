from abc import ABC, abstractmethod
from typing import List

class UserMessage(ABC):
    @abstractmethod
    def get_content(self) -> str:
        pass

class AssistantMessage(ABC):
    @abstractmethod
    def get_content(self) -> str:
        pass

class LLMModel(ABC):
    # TODO: allow adding images to message
    @abstractmethod
    def create_user_message(self, message: str) -> UserMessage:
        pass


    # TODO: add list of functions
    @abstractmethod
    def send_message(self, system: str, messages: List[UserMessage | AssistantMessage]) -> AssistantMessage:
        pass

    # TODO: abstract method for registering functions
