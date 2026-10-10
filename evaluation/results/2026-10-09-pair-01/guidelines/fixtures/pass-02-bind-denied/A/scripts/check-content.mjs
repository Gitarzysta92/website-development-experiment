import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
if(!existsSync('tests/content.test.ts'))throw new Error('IU-CONTENT has not supplied its required contract checks');
const r=spawnSync(process.execPath,['node_modules/vitest/vitest.mjs','run','tests/content.test.ts'],{stdio:'inherit'});if(r.status !== 0)process.exit(r.status || 1);
if(process.env.SITE_PROFILE === 'published') {
 const { assertPublication } = await import('../src/content/publication.mjs');
 const file=process.env.PUBLICATION_APPROVAL_FILE;
 if(!file)throw new Error('Publication blocked: PUBLICATION_APPROVAL_FILE is required');
 const config=JSON.parse(readFileSync(file,'utf8'));
 if(config.origin!==process.env.SITE_ORIGIN)throw new Error('Publication approval origin mismatch');
 const records=['en','pl'].flatMap(locale=>readdirSync(`content/pages/${locale}`).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(readFileSync(`content/pages/${locale}/${f}`,'utf8'))));
 assertPublication(records,config);
}
