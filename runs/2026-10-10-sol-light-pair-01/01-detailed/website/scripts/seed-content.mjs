import {mkdirSync,copyFileSync,existsSync,readdirSync} from 'node:fs';import {join,resolve} from 'node:path';
const target=process.argv[2]?resolve(process.argv[2]):resolve('content/pages');const seed=resolve('content/seeds/pages');let added=0,skipped=0;
for(const locale of ['en','pl']){const dir=join(target,locale);mkdirSync(dir,{recursive:true});for(const file of readdirSync(join(seed,locale))){if(!file.endsWith('.json'))continue;const to=join(dir,file);if(existsSync(to)){skipped++;continue}copyFileSync(join(seed,locale,file),to);added++}}
console.log(`Content seed: ${added} added, ${skipped} existing records preserved`);
