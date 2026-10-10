import {spawnSync} from 'node:child_process';
import {existsSync,renameSync,rmSync} from 'node:fs';
if(process.env.SITE_PROFILE==='published'){const preflight=spawnSync(process.execPath,['scripts/check-publication.mjs'],{stdio:'inherit',env:process.env});if(preflight.status!==0)process.exit(preflight.status||1)}
const backup='dist.previous';
if(existsSync(backup))rmSync(backup,{recursive:true,force:true});
const had=existsSync('dist');if(had)renameSync('dist',backup);
const result=spawnSync(process.execPath,['node_modules/astro/bin/astro.mjs','build'],{stdio:'inherit',env:process.env});
if(result.status===0){if(had)rmSync(backup,{recursive:true,force:true});process.exit(0)}
if(existsSync('dist'))rmSync('dist',{recursive:true,force:true});if(had)renameSync(backup,'dist');process.exit(result.status||1);
