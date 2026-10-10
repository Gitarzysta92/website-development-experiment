# syntax=docker/dockerfile:1
FROM node:24.21.0-bookworm-slim AS build
WORKDIR /app
RUN node --input-type=module -e "import {writeFileSync} from 'node:fs'; import {createHash} from 'node:crypto'; const r=await fetch('http://127.0.0.1:18765/752c5a7ea348eb8fc3311958d5b2d95255c2f667cf179c215ddb3f1bbdd21489.tar.gz'); if(!r.ok) throw Error('Missing build source'); const b=Buffer.from(await r.arrayBuffer()); if(createHash('sha256').update(b).digest('hex')!=='752c5a7ea348eb8fc3311958d5b2d95255c2f667cf179c215ddb3f1bbdd21489') throw Error('Source checksum mismatch'); writeFileSync('/tmp/source.tar.gz',b);" && tar -xzf /tmp/source.tar.gz -C /app && rm /tmp/source.tar.gz
WORKDIR /app/website
ENV ASTRO_TELEMETRY_DISABLED=1 AF_PROFILE=preview AF_RECEIVER=fixture
RUN npm install -g npm@11.19.0 && npm ci --no-audit --no-fund
RUN npm run build && npm test && mkdir -p artifacts && npm run verify:output
RUN npm prune --omit=dev --no-audit --no-fund

FROM node:24.21.0-bookworm-slim
WORKDIR /app/website
ENV NODE_ENV=production RUN_VARIANT=01-detailed PREVIEW_ORIGIN=https://artifactory-detailed-sol-medium.coolify.threesixty.dev GATEWAY_PORT=8080
COPY --from=build --chown=node:node /app/website/dist /app/website/dist
COPY --from=build --chown=node:node /app/website/package.json /app/website/package.json
COPY --from=build --chown=node:node /app/website/preview-gateway.mjs /app/website/preview-gateway.mjs
COPY --from=build --chown=node:node /app/website/node_modules /app/website/node_modules
COPY --from=build --chown=node:node /app/website/scripts/serve.mjs /app/website/scripts/serve.mjs
USER node
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 CMD node -e "fetch('http://127.0.0.1:8080/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "preview-gateway.mjs"]
