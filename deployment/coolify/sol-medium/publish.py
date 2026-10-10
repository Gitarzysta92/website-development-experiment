"""Create and inspect only the Sol medium preview applications."""
import argparse
import base64
import json
from pathlib import Path
import urllib.error
import urllib.request

HERE = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('action', choices=['deploy', 'status'])
parser.add_argument('--credentials-file', type=Path, required=True)
args = parser.parse_args()
values = {}
for line in args.credentials_file.read_text().splitlines():
    if line.strip() and not line.lstrip().startswith('#') and '=' in line:
        key, value = line.split('=', 1)
        values[key.strip()] = value.strip().strip('\"').strip("'")
base = values['COOLIFY_ADDRESS'].rstrip('/')
if not base.endswith('/api/v1'):
    base += '/api/v1'
headers = {'Authorization': 'Bearer ' + values['COOLIFY_TOKEN'], 'CF-Access-Client-Id': values['CF_Access_Client_Id'], 'CF-Access-Client-Secret': values['CF_Access_Client_Secret'], 'Content-Type': 'application/json', 'Accept': 'application/json', 'User-Agent': 'Codex-Deployment-Check/1.0'}

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        raise RuntimeError('Unexpected API redirect')

def api(path, method='GET', body=None):
    req = urllib.request.Request(base + path, method=method, headers=headers, data=None if body is None else json.dumps(body).encode())
    try:
        with urllib.request.build_opener(NoRedirect()).open(req, timeout=45) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        raise RuntimeError(f'Coolify {method} {path}: HTTP {error.code}: {error.read().decode()[:1000]}') from None

state_path = HERE / 'artifacts/deployment.json'
state = json.loads(state_path.read_text()) if state_path.exists() else {'project_uuid': 'vw79xyabzjyhlbuwwtdjpbrk', 'run_group': '2026-10-10-sol-medium-pair-01', 'applications': {}}
def save():
    state_path.write_text(json.dumps(state, indent=2) + '\n')

if args.action == 'deploy':
    apps = api('/applications')
    for record in json.loads((HERE / 'artifacts/manifest.json').read_text()):
        variant = record['variant']
        entry = state['applications'].get(variant)
        if entry and entry.get('deployment_uuid'):
            print(json.dumps(entry), flush=True)
            continue
        app = next((app for app in apps if app['name'] == record['name']), None)
        if app is None:
            app = api('/applications/dockerfile', 'POST', {
                'project_uuid': state['project_uuid'], 'server_uuid': 'u6wd8m12ap9kvmmdze6kt9eg',
                'environment_name': 'production', 'name': record['name'],
                'description': f"{variant}, gpt-6-sol medium, 2026-10-10-sol-medium-pair-01. Authenticated preview. No real email delivery.",
                'dockerfile': base64.b64encode((HERE / 'artifacts' / variant / 'Dockerfile').read_bytes()).decode(),
                'domains': record['origin'].replace('https:', 'http:') + ':8080',
                'ports_exposes': '8080', 'instant_deploy': False, 'is_force_https_enabled': False,
                'health_check_enabled': False, 'limits_memory': '512m', 'limits_cpus': '1',
                'inject_build_args_to_dockerfile': False,
            })
        entry = {**record, 'uuid': app['uuid']}
        state['applications'][variant] = entry
        save()
        api('/applications/' + app['uuid'], 'PATCH', {'ports_exposes': '8080', 'domains': record['origin'].replace('https:', 'http:') + ':8080', 'is_force_https_enabled': False})
        config = api('/applications/' + app['uuid'])
        assert config['ports_exposes'] == '8080'
        entry['deployment_uuid'] = api('/deploy', 'POST', {'uuid': app['uuid']})['deployments'][0]['deployment_uuid']
        save()
        print(json.dumps(entry), flush=True)
else:
    for variant, entry in state['applications'].items():
        deployment = api('/deployments/' + entry['deployment_uuid'])
        app = api('/applications/' + entry['uuid'])
        entry['deployment_status'] = deployment['status']
        entry['application_status'] = app['status']
        print(json.dumps({'variant': variant, 'deployment': deployment['status'], 'application': app['status']}), flush=True)
        logs = deployment.get('logs') or []
        if isinstance(logs, str):
            logs = json.loads(logs)
        messages = [log.get('output', '') for log in logs if not log.get('hidden')]
        (HERE / 'artifacts' / variant / 'deployment.log').write_text('\n'.join(messages))
        print('\n'.join(line for message in messages[-7:] for line in message.splitlines() if len(line) < 500)[-1800:], flush=True)
    save()
