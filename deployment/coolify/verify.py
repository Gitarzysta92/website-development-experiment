"""Verify hosted routing, access protection, assets and the existing enquiry behavior."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import subprocess
import urllib.error
import urllib.parse
import urllib.request
import uuid

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
parser = argparse.ArgumentParser()
parser.add_argument('--credentials-file', type=Path, required=True)
parser.add_argument('--variant', choices=['01-detailed', '02-inputs-only'])
args = parser.parse_args()
values = {}
for line in args.credentials_file.read_text().splitlines():
    if line.strip() and not line.lstrip().startswith('#') and '=' in line:
        key, value = line.split('=', 1)
        values[key.strip()] = value.strip().strip('\"').strip("'")

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None

def request(origin, path, method='GET', body=None, authenticated=True, extra=None):
    headers = {'User-Agent': 'Codex-Deployment-Check/1.0'}
    if authenticated:
        headers.update({'CF-Access-Client-Id': values['CF_Access_Client_Id'], 'CF-Access-Client-Secret': values['CF_Access_Client_Secret']})
    if body is not None:
        headers['Content-Type'] = 'application/json'
    headers.update(extra or {})
    req = urllib.request.Request(origin + path, method=method, headers=headers, data=json.dumps(body).encode() if body is not None else None)
    try:
        response = urllib.request.build_opener(NoRedirect()).open(req, timeout=25)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        return response.code, response.headers, response.read()

class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        value = attrs.get('src') if tag in ['script', 'img'] else attrs.get('href') if tag == 'link' and attrs.get('rel') in ['stylesheet', 'icon', 'preload'] else None
        if value and value.startswith('/'):
            self.paths.add(value)

state = json.loads((HERE / 'artifacts/deployment.json').read_text())
for variant, entry in state['applications'].items():
    if args.variant and args.variant != variant:
        continue
    origin = entry['origin']
    status, headers, _ = request(origin, '/en/', authenticated=False)
    assert status in [302, 303, 307] and urllib.parse.urlparse(headers['Location']).hostname.endswith('.cloudflareaccess.com'), ('Access protection', status)
    source = ROOT / 'runs/2026-10-09-pair-01' / variant / 'website'
    if variant == '01-detailed':
        records = json.loads((source / 'content/shared/routes.json').read_text())['routes']
    else:
        records = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', "import {pages} from './src/content.mjs'; console.log(JSON.stringify(pages));"], cwd=source))
    routes = [path for record in records for path in record['paths'].values()]
    assets = set()
    def check_page(path):
        code, response_headers, body = request(origin, path)
        html = body.decode()
        assert code == 200, (path, code)
        assert 'noindex' in response_headers.get('X-Robots-Tag', ''), path
        assert origin + path in html, ('Hosted metadata', path)
        assert 'http://127.0.0.1:' not in html, ('Loopback metadata', path)
        parsed = Assets()
        parsed.feed(html)
        return parsed.paths
    with ThreadPoolExecutor(max_workers=4) as pool:
        for found in pool.map(check_page, routes):
            assets.update(found)
        for asset, code in pool.map(lambda path: (path, request(origin, path)[0]), sorted(assets)):
            assert code == 200, (asset, code)
    code, headers, _ = request(origin, '/')
    assert code == 308 and headers['Location'] == '/en/', ('Root redirect', code, headers.get('Location'))
    for path in ['/en/does-not-exist/', '/pl/does-not-exist/', '/.env', '/inputs/', '/content/', '/package.json']:
        assert request(origin, path)[0] == 404, path
    assert b'Disallow: /' in request(origin, '/robots.txt')[2]
    assert b'<loc>' not in request(origin, '/sitemap.xml')[2]
    payload = {'intent': 'general', 'email': 'coolify-smoke@example.test', 'message': 'Synthetic Coolify preview verification. No email delivery expected.', 'locale': 'en', 'submissionId': str(uuid.uuid4()), 'website': ''}
    code, _, body = request(origin, '/api/enquiries', 'POST', payload, extra={'Origin': origin})
    if variant == '01-detailed':
        outcome = json.loads(body)
        assert code == 200 and outcome.get('status') == 'accepted' and outcome.get('mode') == 'fixture', (code, body)
        enquiry = 'Synthetic fixture receipt confirmed, no email sent'
    else:
        assert code == 405, (code, body)
        enquiry = 'Write requests rejected, email drafting remains browser-only'
    assert request(origin, '/api/enquiries', 'POST', payload, extra={'Origin': 'https://example.test'})[0] == 403
    result = {'variant': variant, 'origin': origin, 'verified_at': datetime.now(timezone.utc).isoformat(), 'cloudflare_access_protected': True, 'pages_ok': len(routes), 'assets_ok': len(assets), 'redirects_and_404s_ok': True, 'source_paths_private': True, 'noindex': True, 'enquiry': enquiry}
    (HERE / 'artifacts' / variant / 'verification.json').write_text(json.dumps(result, indent=2) + '\n')
    print(json.dumps(result), flush=True)
