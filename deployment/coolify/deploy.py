"""Register experiment snapshots in Coolify and retain non-secret deployment receipts."""
import argparse
import base64
import json
from pathlib import Path
import urllib.error
import urllib.request

HERE = Path(__file__).resolve().parent
parser = argparse.ArgumentParser()
parser.add_argument('action', choices=['deploy', 'status', 'retry-staged', 'configure-routing'])
parser.add_argument('--credentials-file', required=True, type=Path)
args = parser.parse_args()
values = {}
for line in args.credentials_file.read_text().splitlines():
    if line.strip() and not line.lstrip().startswith('#') and '=' in line:
        key, value = line.split('=', 1)
        values[key.strip()] = value.strip().strip('\"').strip("'")
base = values['COOLIFY_ADDRESS'].rstrip('/')
if not base.endswith('/api/v1'):
    base += '/api/v1'

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        raise RuntimeError('Unexpected Coolify API redirect')

opener = urllib.request.build_opener(NoRedirect())
headers = {
    'Authorization': 'Bearer ' + values['COOLIFY_TOKEN'],
    'CF-Access-Client-Id': values['CF_Access_Client_Id'],
    'CF-Access-Client-Secret': values['CF_Access_Client_Secret'],
    'Content-Type': 'application/json', 'Accept': 'application/json',
    'User-Agent': 'Codex-Deployment-Check/1.0',
}

def api(path, method='GET', body=None):
    request = urllib.request.Request(base + path, method=method, headers=headers,
                                     data=json.dumps(body).encode() if body is not None else None)
    try:
        with opener.open(request, timeout=45) as response:
            return json.load(response)
    except urllib.error.HTTPError as error:
        detail = error.read().decode()[:1500]
        raise RuntimeError(f'Coolify {method} {path}: HTTP {error.code}: {detail}') from None

state_path = HERE / 'artifacts/deployment.json'
state = json.loads(state_path.read_text()) if state_path.exists() else {'applications': {}}
def save():
    state_path.write_text(json.dumps(state, indent=2) + '\n')

if args.action == 'configure-routing':
    for entry in state['applications'].values():
        previous = api('/deployments/' + entry['deployment_uuid'])
        if previous['status'] != 'finished':
            raise RuntimeError('Wait for the existing deployment to finish before changing routing')
        api('/applications/' + entry['uuid'], 'PATCH', {'ports_exposes': '8080', 'domains': entry['origin'].replace('https:', 'http:') + ':8080', 'is_force_https_enabled': False})
        entry.setdefault('previous_deployments', []).append(entry['deployment_uuid'])
        entry['deployment_uuid'] = api('/deploy', 'POST', {'uuid': entry['uuid']})['deployments'][0]['deployment_uuid']
        save()
        print(json.dumps({'name': entry['name'], 'deployment_uuid': entry['deployment_uuid']}), flush=True)
elif args.action == 'retry-staged':
    entry = state['applications']['01-detailed']
    previous = api('/deployments/' + entry['deployment_uuid'])
    if previous['status'] not in ['failed', 'cancelled', 'canceled']:
        raise RuntimeError('Only a failed deployment can be retried with staged input')
    app = api('/applications/' + entry['uuid'])
    if not app['status'].startswith('exited:'):
        raise RuntimeError('Refusing to replace an application that is not stopped')
    entry.setdefault('previous_deployments', []).append(entry['deployment_uuid'])
    entry.setdefault('previous_applications', []).append(entry['uuid'])
    api('/applications/' + entry['uuid'], 'DELETE')
    app = api('/applications/dockerfile', 'POST', {
        'project_uuid': state['project_uuid'], 'server_uuid': 'u6wd8m12ap9kvmmdze6kt9eg',
        'environment_name': 'production', 'name': entry['name'],
        'description': '01-detailed, gpt-6-astra xhigh. Authenticated draft preview. No live email.',
        'dockerfile': base64.b64encode((HERE / 'artifacts/01-detailed/Dockerfile.staged').read_bytes()).decode(),
        'ports_exposes': '8080', 'domains': entry['origin'].replace('https:', 'http:'),
        'instant_deploy': False, 'is_force_https_enabled': False,
        'health_check_enabled': False, 'limits_memory': '512m', 'limits_cpus': '1',
        'inject_build_args_to_dockerfile': False,
    })
    entry['uuid'] = app['uuid']
    save()
    entry['deployment_uuid'] = api('/deploy', 'POST', {'uuid': entry['uuid']})['deployments'][0]['deployment_uuid']
    save()
    print(json.dumps(entry), flush=True)
elif args.action == 'deploy':
    records = json.loads((HERE / 'artifacts/manifest.json').read_text())
    project = next((p for p in api('/projects') if p['name'] == 'Artifactory website experiment'), None)
    if project is None:
        project = api('/projects', 'POST', {'name': 'Artifactory website experiment', 'description': 'Detailed and inputs-only runs, 2026-10-09-pair-01. GPT-6 Astra xhigh. Authenticated draft previews.'})
    state['project_uuid'] = project['uuid']
    save()
    applications = api('/applications')
    for record in records:
        variant = record['variant']
        app = next((a for a in applications if a['name'] == record['name']), None)
        if app is None:
            app = api('/applications/dockerfile', 'POST', {
                'project_uuid': project['uuid'], 'server_uuid': 'u6wd8m12ap9kvmmdze6kt9eg',
                'environment_name': 'production', 'name': record['name'],
                'description': f"{variant}, gpt-6-astra xhigh, source {record['source_sha256']}. Cloudflare Access preview, noindex, no live email.",
                'dockerfile': base64.b64encode((HERE / 'artifacts' / variant / 'Dockerfile').read_bytes()).decode(),
                'ports_exposes': '8080', 'domains': record['origin'].replace('https:', 'http:'),
                'instant_deploy': False, 'is_force_https_enabled': False,
                'health_check_enabled': False, 'limits_memory': '512m', 'limits_cpus': '1',
                'inject_build_args_to_dockerfile': False,
            })
        entry = state['applications'].setdefault(variant, {})
        entry.update({'uuid': app['uuid'], 'name': record['name'], 'origin': record['origin'], 'source_sha256': record['source_sha256']})
        save()
        if 'deployment_uuid' not in entry:
            result = api('/deploy', 'POST', {'uuid': app['uuid']})
            entry['deployment_uuid'] = result['deployments'][0]['deployment_uuid']
            save()
        print(json.dumps(entry), flush=True)
else:
    for variant, entry in state['applications'].items():
        result = api('/deployments/' + entry['deployment_uuid'])
        app = api('/applications/' + entry['uuid'])
        print(json.dumps({'variant': variant, 'deployment_status': result['status'], 'application_status': app['status']}), flush=True)
        entry['deployment_status'] = result['status']
        entry['application_status'] = app['status']
        logs = result.get('logs')
        if isinstance(logs, str):
            try: logs = json.loads(logs)
            except ValueError: logs = None
        if logs:
            # Retain only build output; no runtime environment or request data.
            messages = [x.get('output', '') for x in logs if not x.get('hidden', False)]
            (HERE / 'artifacts' / variant / 'deployment.log').write_text('\n'.join(messages))
            concise = [line for message in messages[-8:] for line in message.splitlines() if len(line) < 500]
            print('\n'.join(concise)[-2400:], flush=True)
    save()
