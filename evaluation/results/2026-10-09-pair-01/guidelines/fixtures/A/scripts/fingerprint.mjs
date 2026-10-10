import {createHash} from 'node:crypto';
import {readdirSync,readFileSync} from 'node:fs';
import path from 'node:path';
export function walk(directory){return readdirSync(directory,{withFileTypes:true}).filter(e=>e.name!=='__pycache__').flatMap(e=>e.isDirectory()?walk(path.join(directory,e.name)):[path.join(directory,e.name)]);}
export function digestFiles(files){const hash=createHash('sha256');for(const file of [...files].sort())hash.update(file).update('\0').update(readFileSync(file)).update('\0');return hash.digest('hex');}
export function implementationFingerprint(){return digestFiles(['package.json','package-lock.json','astro.config.mjs','playwright.config.ts','vitest.config.ts','tsconfig.json','.env.example',...['src','content','public','scripts','tests'].flatMap(walk)]);}
