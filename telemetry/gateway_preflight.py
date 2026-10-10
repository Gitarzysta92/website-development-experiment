#!/usr/bin/env python3
"""Read-only check of the existing gateway; run only after destination authorization."""
import argparse
import json
from pathlib import Path
import tomllib
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

EXPECTED_HOST = 'litellm.coolify.threesixty.dev'


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--response-id', help='An existing response ID from the preflight chat; no new model request is made')
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    config = tomllib.loads((Path.home()/'.codex/config.toml').read_text())
    name = config.get('model_provider')
    provider = config.get('model_providers', {}).get(name, {})
    url = urlsplit(provider.get('base_url', ''))
    if url.scheme != 'https' or url.hostname != EXPECTED_HOST or url.port not in (None, 443) or url.username or url.password:
        raise SystemExit('Configured gateway differs from the reviewed HTTPS destination; no request sent.')
    origin = 'https://' + EXPECTED_HOST
    headers = {k: v for k, v in provider.get('http_headers', {}).items()
               if k.lower() in ('cf-access-client-id', 'cf-access-client-secret', 'x-litellm-api-key')}
    api_key = next((v for k, v in headers.items() if k.lower() == 'x-litellm-api-key'), None)
    opener = build_opener(NoRedirect)
    endpoints = [('health', '/health/liveliness'), ('models', '/v1/models')]
    if args.response_id:
        endpoints.append(('spend', '/spend/logs?' + urlencode({'request_id': args.response_id})))
    report = {'provider': name, 'host': EXPECTED_HOST, 'model': 'gpt-6-astra',
              'reasoning_effort': 'xhigh', 'checks': {}, 'new_model_requests': 0}
    for kind, path in endpoints:
        request_headers = dict(headers)
        if kind == 'spend' and api_key:
            # Standard LiteLLM management authentication, using the existing gateway key.
            # Never reads or forwards a ChatGPT access/refresh token.
            request_headers['Authorization'] = 'Bearer ' + api_key
        try:
            with opener.open(Request(origin + path, headers=request_headers), timeout=15) as response:
                raw = response.read(4_000_001)
                result = {'http_status': response.status}
                if len(raw) > 4_000_000:
                    result['result'] = 'response too large; not retained'
                elif kind == 'health':
                    result['result'] = 'reachable'
                else:
                    try:
                        data = json.loads(raw)
                    except ValueError:
                        result['result'] = 'non-JSON response; body not retained'
                    else:
                        if kind == 'models':
                            entries = data.get('models', data.get('data', [])) if isinstance(data, dict) else []
                            matches = [x for x in entries if isinstance(x, dict) and
                                       (x.get('id') == 'gpt-6-astra' or x.get('slug') == 'gpt-6-astra')]
                            result.update(result='model listed' if matches else 'model not confirmed',
                                          astra_available=bool(matches))
                        else:
                            entries = data if isinstance(data, list) else data.get('data', []) if isinstance(data, dict) else []
                            matches = [x for x in entries if isinstance(x, dict) and x.get('request_id') == args.response_id]
                            result.update(result='matched' if matches else 'request correlation not verified', matched_rows=len(matches))
                            result['records'] = [{k: x[k] for k in ('request_id', 'model', 'spend', 'prompt_tokens',
                                                  'completion_tokens', 'total_tokens', 'startTime', 'endTime') if k in x}
                                                 for x in matches]
                            result['unrelated_rows_discarded'] = len(entries) - len(matches)
                            result['cost_available'] = any(isinstance(x.get('spend'), (int, float)) for x in matches)
                report['checks'][kind] = result
        except HTTPError as error:
            report['checks'][kind] = {'http_status': error.code, 'result': 'HTTP failure; body not retained'}
        except URLError:
            report['checks'][kind] = {'result': 'connection failed'}
        except TimeoutError:
            report['checks'][kind] = {'result': 'timeout'}
    report['gateway_usage_cost_verified'] = bool(report['checks'].get('models', {}).get('astra_available') and
                                                 report['checks'].get('spend', {}).get('cost_available'))
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report, indent=2))


if __name__ == '__main__':
    main()
