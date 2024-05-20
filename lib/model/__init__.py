import dotenv

from .ClaudeModel import ClaudeModel
from .LLMModel import LLMModel, UserMessage, AssistantMessage

dotenv.load_dotenv()

def create_model() -> LLMModel:
    # return ClaudeModel("claude-3-opus-20240229")
    return ClaudeModel("claude-3-haiku-20240307")