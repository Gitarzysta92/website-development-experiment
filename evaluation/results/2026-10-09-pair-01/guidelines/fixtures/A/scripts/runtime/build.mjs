import { spawnSync } from 'node:child_process';
import { existsSync, rmSync, renameSync, writeFileSync } from 'node:fs';
import { configuration } from './config.mjs';
const config=configuration();
for (const script of ['scripts/check-content.mjs','scripts/check-boundaries.mjs']) {
 if (existsSync(script) && (script !== 'scripts/check-content.mjs' || existsSync('tests/content.test.ts'))) { const r = spawnSync(process.execPath,[script],{stdio:'inherit'}); if(r.status !== 0) process.exit(r.status || 1); }
}
rmSync('.dist-candidate', { recursive: true, force: true });
const r = spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'inherit',env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1',SITE_ORIGIN:config.origin}});
if(r.status !== 0) process.exit(r.status || 1);
const boundary=spawnSync(process.execPath,['scripts/check-boundaries.mjs'],{stdio:'inherit',env:{...process.env,CHECK_OUTPUT:'.dist-candidate/client'}});
if(boundary.status!==0)process.exit(boundary.status||1);
writeFileSync('.dist-candidate/profile.json', JSON.stringify({profile:config.profile,origin:config.origin}));
rmSync('.dist-previous',{recursive:true,force:true});
if(existsSync('dist')) renameSync('dist','.dist-previous');
renameSync('.dist-candidate','dist');
console.log('Candidate verified and selected; previous artifact retained in .dist-previous.');
