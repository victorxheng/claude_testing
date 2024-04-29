from dataclasses import dataclass
import json
from typing import Callable, Dict, List
import anthropic
from anthropic.types.beta.tools import ToolParam

model = "claude-3-sonnet-20240229"

client = anthropic.Anthropic()

@dataclass
class Tool:
  schema: ToolParam
  tool: Callable[..., str]

def match_and_execute(tools: List[Tool], tool_use):
  for tool in tools:
    if tool.schema["name"] == tool_use["name"]:
      return tool.tool(**tool_use["input"])

def has_tool(response):
  for message in response["content"]:
    if message["type"] == "tool_use":
      return True
    return False

def use_tool(tools: List[Tool], system: str, messages: List):
  output = ''
  while has_tool(response := json.loads(client.beta.tools.messages.create(
    model=model,
    max_tokens=4096,
    temperature=0.0,
    tools=[tool.schema for tool in tools],
    system=system,
    messages=messages
  ).json())):
    for message in response["content"]:
      if message["type"] == "text":
        print(message["text"])
        output += message["text"] + '\n'
    messages.append({
      "role": "assistant",
      "content": response["content"]
      })
    messages.append({
      "role": "user",
      "content": [
        {
          "type": "tool_result",
          "tool_use_id": tool_use["id"],
          "content": match_and_execute(tools, tool_use)
        }
        for tool_use in response["content"] if tool_use["type"] == "tool_use"
      ]
    })
  for message in response["content"]:
    if message["type"] == "text":
      print(message["text"])
      output += message["text"] + '\n'
  return output