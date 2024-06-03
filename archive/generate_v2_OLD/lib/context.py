"""
Context is a class for keeping track of the current message history. Used in AI.

self.ai is the message list.
"""
from helpers.messages import Messages

class Context:
    def __init__(self) -> None:
        self.ai = Messages("")

