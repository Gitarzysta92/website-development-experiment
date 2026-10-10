"""Package reproducible, self-contained Coolify Dockerfiles from experiment sources."""
import base64
import gzip
import hashlib
import io
import json
from pathlib import Path
import tarfile

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
RUN = ROOT / 'runs/2026-10-09-pair-01'
COMMON = ['package.json', 'package-lock.json', 'src', 'public', 'tests']
VARIANTS = {
    '01-detailed': ['content', 'scripts', 'astro.config.mjs', 'tsconfig.json', 'vitest.config.ts'],
    '02-inputs-only': ['server.mjs', 'build.mjs'],
}
records = []
for variant, extra in VARIANTS.items():
    source = RUN / variant / 'website'
    output = HERE / 'artifacts' / variant
    output.mkdir(parents=True, exist_ok=True)
    files = []
    for name in COMMON + extra:
        path = source / name
        files.extend(sorted(p for p in path.rglob('*') if p.is_file()) if path.is_dir() else [path])
    manifest = {str(p.relative_to(source)): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
    raw = io.BytesIO()
    with tarfile.open(fileobj=raw, mode='w') as archive:
        for path in files:
            content = path.read_bytes()
            info = tarfile.TarInfo(str(path.relative_to(source)))
            info.size, info.mode, info.mtime = len(content), 0o644, 0
            archive.addfile(info, io.BytesIO(content))
        gateway = (HERE / 'preview-gateway.mjs').read_bytes()
        info = tarfile.TarInfo('preview-gateway.mjs')
        info.size, info.mode, info.mtime = len(gateway), 0o644, 0
        archive.addfile(info, io.BytesIO(gateway))
    bundle = gzip.compress(raw.getvalue(), mtime=0)
    (output / 'source.tar.gz').write_bytes(bundle)
    encoded = base64.b64encode(bundle).decode()
    encoded = '\n'.join(encoded[i:i+120] for i in range(0, len(encoded), 120))
    slug = 'artifactory-' + variant.split('-', 1)[1] + '-astra-xhigh'
    origin = f'https://{slug}.coolify.threesixty.dev'
    dockerfile = f'''# syntax=docker/dockerfile:1
FROM node:24.21.0-bookworm-slim AS build
WORKDIR /app
COPY <<'SOURCE_ARCHIVE' /tmp/source.b64
{encoded}
SOURCE_ARCHIVE
RUN base64 -d /tmp/source.b64 | tar -xz -C /app && rm /tmp/source.b64
ENV ASTRO_TELEMETRY_DISABLED=1 SITE_PROFILE=preview
RUN npm install -g npm@11.19.0 && npm ci --no-audit --no-fund
RUN npm run build && npm test
RUN npm prune --omit=dev --no-audit --no-fund

FROM node:24.21.0-bookworm-slim
WORKDIR /app
ENV NODE_ENV=production RUN_VARIANT={variant} PREVIEW_ORIGIN={origin} GATEWAY_PORT=8080
COPY --from=build --chown=node:node /app /app
USER node
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=5 CMD node -e "fetch('http://127.0.0.1:8080/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "preview-gateway.mjs"]
'''
    (output / 'Dockerfile').write_text(dockerfile)
    # Coolify's SSH command has an argument-size limit for inline Dockerfiles.
    # Larger snapshots are staged over SSH and served on host loopback while building.
    if len(dockerfile) > 90000:
        digest = hashlib.sha256(bundle).hexdigest()
        start = dockerfile.index("COPY <<'SOURCE_ARCHIVE'")
        end = dockerfile.index('ENV ASTRO_TELEMETRY_DISABLED')
        transfer = f'''RUN node --input-type=module -e "import {{writeFileSync}} from 'node:fs'; import {{createHash}} from 'node:crypto'; const r=await fetch('http://127.0.0.1:18765/{digest}.tar.gz'); if(!r.ok) throw Error('Missing build source'); const b=Buffer.from(await r.arrayBuffer()); if(createHash('sha256').update(b).digest('hex')!=='{digest}') throw Error('Source checksum mismatch'); writeFileSync('/tmp/source.tar.gz',b);" && tar -xzf /tmp/source.tar.gz -C /app && rm /tmp/source.tar.gz
'''
        (output / 'Dockerfile.staged').write_text(dockerfile[:start] + transfer + dockerfile[end:])
    record = {'variant': variant, 'model': 'gpt-6-astra', 'reasoning_effort': 'xhigh', 'name': slug, 'origin': origin, 'source_sha256': hashlib.sha256(bundle).hexdigest(), 'source_files': manifest, 'gateway_sha256': hashlib.sha256(gateway).hexdigest()}
    (output / 'manifest.json').write_text(json.dumps(record, indent=2) + '\n')
    records.append({k: v for k, v in record.items() if k != 'source_files'})
    print(json.dumps({'variant': variant, 'source_files': len(files), 'bundle_bytes': len(bundle), 'dockerfile_bytes': len(dockerfile), 'origin': origin}))
(HERE / 'artifacts/manifest.json').write_text(json.dumps(records, indent=2) + '\n')
