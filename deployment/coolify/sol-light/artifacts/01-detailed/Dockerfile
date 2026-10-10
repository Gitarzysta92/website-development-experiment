# syntax=docker/dockerfile:1
FROM node:24.21.0-bookworm-slim AS build
WORKDIR /app
RUN node --input-type=module -e "import {writeFileSync} from 'node:fs'; import {createHash} from 'node:crypto'; const r=await fetch('http://127.0.0.1:18765/b9d91dc9afac884f1a0b35545945f7b56619301ba3e65dd3d55635a4d95ca570.tar.gz'); if(!r.ok) throw Error('Missing build source'); const b=Buffer.from(await r.arrayBuffer()); if(createHash('sha256').update(b).digest('hex')!=='b9d91dc9afac884f1a0b35545945f7b56619301ba3e65dd3d55635a4d95ca570') throw Error('Source checksum mismatch'); writeFileSync('/tmp/source.tar.gz',b);" && tar -xzf /tmp/source.tar.gz -C /app && rm /tmp/source.tar.gz
WORKDIR /app/website
ENV ASTRO_TELEMETRY_DISABLED=1 SITE_PROFILE=preview ENQUIRY_MODE=fixture
RUN npm install -g npm@11.19.0 && npm ci --no-audit --no-fund
RUN npm run check && npm test && npm run build && npm run check:links && npm run check:boundaries
RUN npm prune --omit=dev --no-audit --no-fund

FROM node:24.21.0-bookworm-slim
WORKDIR /app/website
ENV NODE_ENV=production RUN_VARIANT=01-detailed PREVIEW_ORIGIN=https://artifactory-detailed-sol-light.coolify.threesixty.dev GATEWAY_PORT=8080
COPY --from=build --chown=node:node /app/website/package.json /app/website/package.json
COPY --from=build --chown=node:node /app/website/preview-gateway.mjs /app/website/preview-gateway.mjs
COPY --from=build --chown=node:node /app/website/dist /app/website/dist
COPY --from=build --chown=node:node /app/website/node_modules /app/website/node_modules
COPY --from=build --chown=node:node /app/website/content-routes.json /app/website/content-routes.json
COPY --from=build --chown=node:node /app/website/scripts/runtime /app/website/scripts/runtime
USER node
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 CMD node -e "fetch('http://127.0.0.1:8080/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "preview-gateway.mjs"]
