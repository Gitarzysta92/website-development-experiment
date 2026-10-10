"""Package unchanged Sol medium experiment sources for protected Coolify previews."""
import base64
import gzip
import hashlib
import io
import json
from pathlib import Path
import tarfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
RUN = ROOT / 'runs/2026-10-10-sol-medium-pair-01'
INPUTS = {
    '01-detailed': ['package.json', 'package-lock.json', 'astro.config.mjs', 'tsconfig.json', 'src', 'content', 'public', 'scripts', 'tests'],
    '02-inputs-only': ['package.json', 'server.mjs', 'build.mjs', 'check.mjs', 'form-check.mjs', 'content.mjs', 'app.js', 'style.css'],
}
records = []
for variant, selected in INPUTS.items():
    root = RUN / variant
    source = root / 'website'
    output = HERE / 'artifacts' / variant
    output.mkdir(parents=True, exist_ok=True)
    files = []
    for name in selected:
        path = source / name
        files.extend(sorted(p for p in path.rglob('*') if p.is_file()) if path.is_dir() else [path])
    if variant == '01-detailed':
        files.append(root / 'compiled/routes.json')
    manifest = {str(p.relative_to(root)): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
    raw = io.BytesIO()
    with tarfile.open(fileobj=raw, mode='w') as archive:
        contents = [(str(p.relative_to(root)), p.read_bytes()) for p in files]
        contents.append(('website/preview-gateway.mjs', (HERE / 'preview-gateway.mjs').read_bytes()))
        for name, data in contents:
            info = tarfile.TarInfo(name)
            info.size, info.mode, info.mtime = len(data), 0o644, 0
            archive.addfile(info, io.BytesIO(data))
    bundle = gzip.compress(raw.getvalue(), mtime=0)
    digest = hashlib.sha256(bundle).hexdigest()
    (output / 'source.tar.gz').write_bytes(bundle)
    name = 'artifactory-' + variant.split('-', 1)[1] + '-sol-medium'
    origin = f'https://{name}.coolify.threesixty.dev'
    if variant == '01-detailed':
        transfer = f'''RUN node --input-type=module -e "import {{writeFileSync}} from 'node:fs'; import {{createHash}} from 'node:crypto'; const r=await fetch('http://127.0.0.1:18765/{digest}.tar.gz'); if(!r.ok) throw Error('Missing build source'); const b=Buffer.from(await r.arrayBuffer()); if(createHash('sha256').update(b).digest('hex')!=='{digest}') throw Error('Source checksum mismatch'); writeFileSync('/tmp/source.tar.gz',b);" && tar -xzf /tmp/source.tar.gz -C /app && rm /tmp/source.tar.gz
'''
        build = 'RUN npm install -g npm@11.19.0 && npm ci --no-audit --no-fund\nRUN npm run build && npm test && mkdir -p artifacts && npm run verify:output\nRUN npm prune --omit=dev --no-audit --no-fund'
        runtime = 'COPY --from=build --chown=node:node /app/website/node_modules /app/website/node_modules\nCOPY --from=build --chown=node:node /app/website/scripts/serve.mjs /app/website/scripts/serve.mjs'
    else:
        encoded = base64.b64encode(bundle).decode()
        encoded = '\n'.join(encoded[i:i+120] for i in range(0, len(encoded), 120))
        transfer = f"COPY <<'SOURCE_ARCHIVE' /tmp/source.b64\n{encoded}\nSOURCE_ARCHIVE\nRUN base64 -d /tmp/source.b64 | tar -xz -C /app && rm /tmp/source.b64\n"
        build = 'RUN npm run build && npm run check && npm run test:form'
        runtime = 'COPY --from=build --chown=node:node /app/website/server.mjs /app/website/server.mjs'
    dockerfile = f'''# syntax=docker/dockerfile:1
FROM node:24.21.0-bookworm-slim AS build
WORKDIR /app
{transfer}WORKDIR /app/website
ENV ASTRO_TELEMETRY_DISABLED=1 AF_PROFILE=preview AF_RECEIVER=fixture
{build}

FROM node:24.21.0-bookworm-slim
WORKDIR /app/website
ENV NODE_ENV=production RUN_VARIANT={variant} PREVIEW_ORIGIN={origin} GATEWAY_PORT=8080
COPY --from=build --chown=node:node /app/website/dist /app/website/dist
COPY --from=build --chown=node:node /app/website/package.json /app/website/package.json
COPY --from=build --chown=node:node /app/website/preview-gateway.mjs /app/website/preview-gateway.mjs
{runtime}
USER node
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 CMD node -e "fetch('http://127.0.0.1:8080/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "preview-gateway.mjs"]
'''
    assert len(dockerfile) < 90000
    (output / 'Dockerfile').write_text(dockerfile)
    record = {'variant': variant, 'run_group': RUN.name, 'name': name, 'origin': origin, 'model': 'gpt-6-sol', 'reasoning_effort': 'medium', 'source_sha256': digest, 'source_files': manifest}
    (output / 'manifest.json').write_text(json.dumps(record, indent=2) + '\n')
    records.append({k: v for k, v in record.items() if k != 'source_files'})
    print(json.dumps({'variant': variant, 'bundle_bytes': len(bundle), 'dockerfile_bytes': len(dockerfile), 'source_files': len(files)}))
(HERE / 'artifacts/manifest.json').write_text(json.dumps(records, indent=2) + '\n')
