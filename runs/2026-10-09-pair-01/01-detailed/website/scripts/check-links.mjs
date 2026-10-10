import { spawnSync } from 'node:child_process';
const r=spawnSync(process.execPath,['scripts/browser-check.mjs','--project=chromium','--grep','all actual links'],{stdio:'inherit'});process.exit(r.status || 0);
