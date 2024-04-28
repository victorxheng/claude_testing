import json
from flask import Flask, Response, request
import time

from flask_cors import CORS
from archive.generate import project

app = Flask(__name__)
CORS(app)

def format_sse(data):
    return f'data: {data}\n\n'

@app.route('/generate')
def generate():
    prompt = str(request.args.get("prompt"))
    print(prompt)
    def eventStream():
        yield format_sse('Generating landing page structure...')
        components = project.create_page_structure(prompt)
        yield format_sse('Generated componenents:')
        yield format_sse(', '.join(component["name"] for component in components[:-1]) + ', ' + components[-1]["name"])
        for i in range(len(components)):
            try:
                project.write_code_to_file(project.write_component_code_from_description(prompt, None, None, components, i), f'demo/src/{components[i]["name"]}.jsx')
                yield format_sse(f'Finished generating {components[i]["name"]} component')
            except Exception as e:
                print(e)
                yield format_sse(f'There was an error generating the {components[i]["name"]} component, skipping...')
        project.write_code_to_file(project.write_page_code_from_description(prompt, components), f'demo/src/App.jsx')
        yield format_sse(f'Finished generating landing page!')
        yield f'data: finished\n\n'
    return Response(eventStream(), mimetype="text/event-stream")

@app.route('/')
def index():
    return "HELP"

if __name__ == '__main__':
    app.debug = True
    app.run(threaded=True)