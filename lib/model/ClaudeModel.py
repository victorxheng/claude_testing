from dataclasses import dataclass
from typing import List, Union

import anthropic
from anthropic.types import MessageParam

from lib.model.LLMModel import UserMessage, AssistantMessage, LLMModel

@dataclass
class ClaudeUserMessage(UserMessage):
    content: str

    def serialize(self) -> MessageParam:
        return {"role": "user", "content": self.content}
    
    def get_content(self) -> str:
        return self.content

@dataclass
class ClaudeAssistantMessage(AssistantMessage):
    content: str
    
    def serialize(self) -> MessageParam:
        return {"role": "assistant", "content": self.content}
    
    def get_content(self) -> str:
        return self.content

class ClaudeModel(LLMModel):
    def __init__(self, model_name, max_tokens=4096, temperature=0.0):
        self.client = anthropic.Anthropic()
        self.model_name = model_name
        self.max_tokens = max_tokens
        self.temperature = temperature
    
    def create_user_message(self, message: str) -> ClaudeUserMessage:
        return ClaudeUserMessage(message)
    
    @staticmethod
    def to_claude_message(message: UserMessage | AssistantMessage) -> ClaudeUserMessage | ClaudeAssistantMessage:
        if isinstance(message, UserMessage):
            return ClaudeUserMessage(message.get_content())
        return ClaudeAssistantMessage(message.get_content())
    
    def send_message(self, system: str, messages: List[UserMessage | AssistantMessage]) -> ClaudeAssistantMessage:
        reply = ''
        with self.client.messages.stream(
            model=self.model_name,
            max_tokens=self.max_tokens,
            temperature=self.temperature,
            system=system,
            messages=[ClaudeModel.to_claude_message(message).serialize() for message in messages]) as stream:
                for text in stream.text_stream:
                    reply += text
                    print(text, end="", flush=True)
        print()
        return ClaudeAssistantMessage(reply)
