"""
For structuring the messages and sending them to the AI model:

Required to be in a [system, user, assistant, user, assistant, ...] format, with each message being a dictionary with the keys "role" and "content".

"""
import openai
import anthropic
import dotenv

dotenv.load_dotenv()

# TODO: allow dynamic swapping of the model

def send_message(system: str, messages):
    """
    Send message to the AI model, gpt-4o
    """
    msgs = [{"role": "system", "content": f"{str(system)}"}]
    msgs = msgs + messages
    stream = openai.chat.completions.create(
        model="gpt-4o",
        messages=msgs,
        stream=True
    )
    output = ""
    for chunk in stream:
        if chunk.choices[0].delta.content is not None:
            output += chunk.choices[0].delta.content
            print(chunk.choices[0].delta.content, end="")
    return output

# send specific to anthropic model
def send_anthropic(system: str, messages, model):
    client = anthropic.Anthropic()
    reply = ''
    with client.messages.stream(
        model=model,
        max_tokens=4096,
        temperature=0.0,
        system=system,
        messages=messages) as stream:
            for text in stream.text_stream:
                reply += text
                print(text, end="", flush=True)
    print()
    return reply
     

def send_opus(system: str, messages):
    return send_anthropic(system, messages, "claude-3-opus-20240229")

def send_sonnet(system: str, messages):
    return send_anthropic(system, messages, "claude-3-sonnet-20240229")

def send_haiku(system: str, messages):
    return send_anthropic(system, messages, "claude-3-haiku-20240307")

def claude(system: str, messages):
    return send_opus(system, messages)

def u_msg(message_content: str):
    """
    Creates a user message
    """
    return {"role": "user", "content": message_content}

def a_msg(message_content: str):
    """
    Creates an assistant message
    """
    return {"role": "assistant", "content": message_content}
