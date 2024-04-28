import json
import os

output_path = 'generated/frontend'

with open('generated/frontend.json', 'r') as f:
    frontend = json.loads(f.read())

def generate_page(page):
    page_path = os.path.join(output_path, page['route_name'])
    component_path = os.path.join(page_path, 'components')
    os.makedirs(component_path, exist_ok=True)
    for component in page['components']:
        with open(os.path.join(component_path, f'{component["name"]}.tsx'), 'w') as f:
            f.write(component["code"])
    with open(os.path.join(page_path, 'page.tsx'), 'w') as f:
        for data_call in page['data_calls']:
            code = data_call['code'].split()
            code[1] = code[1] + ': any'
            data_call['code'] = ' '.join(code)
        print(page['data_calls'][0]['code'], page['data_calls'][0]['query_name'])
        if 'userId' in page['layout']:
            page['layout'] = page['layout'].replace('React.FC = () => {\n', 'React.FC = () => {\n  const userId = useStoreUserEffect();\n')
        f.write(''''use client';
import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import useStoreUserEffect from "@/app/useStoreUserEffect";
''')
        f.write(page['layout'].replace('{ userId: user.id }', 'userId ? { userId: userId } : "skip"'))

generate_page(frontend['pages'][0])