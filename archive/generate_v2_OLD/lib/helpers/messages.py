import completions as c

class Messages:
    """
    Object for interfacing with message history. A messages list with user and assistant messages is created and kept. Each message has a 'role' and 'content' fields.
    """

    def __init__(self, system: str):
        self.system = system
        self.messages = []

    def send(self) -> str:
        """
        Send the compiled messages, returns the result. Throws error if the last message is an assistant message.
        """
        if self.messages[len(self.messages)]['role'] == 'assistant':
            raise Exception("Incomplete messages list")

        return c.send_message(self.system, self.messages)

    def set_system(self, system):
        """
        Set the system message
        """
        self.system = system

    def set_message(self, index: int, content: str):
        """
        Set the specific index of a message history, with index being [0: user, 1: assistant, 2: user, 3: assistant...] and so on.
        """
        self.messages[index]['content'] = content

    def add(self, content: str):
        """
        Add content to history.
        """
        if len(self.messages) % 2 == 0:
            self.messages.append(c.u_msg(content))
        else:
            self.messages.append(c.a_msg(content))

    def pop(self) -> str:
        """
        Remove last message
        """
        return self.messages.pop()['content']

    def __str__(self) -> str:
        string = "System:\n" + self.system
        for i in range(len(self.messages)):
            if i % 2 == 0:
                string += "\n\nUser:\n"
            else:
                string += "\n\nAssistant:\n"
            
            string += self.messages[i]
        return string






    


