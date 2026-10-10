import fs from 'node:fs';import crypto from 'node:crypto';
import routes from '../../compiled/routes.json' with {type:'json'};
if(process.env.AF_PROFILE==='published')throw Error('Publication blocked: factual, translation, asset, privacy, origin and receiver prerequisites remain unapproved.');
const seen=new Set(),paths=new Set();const ledger=JSON.parse(fs.readFileSync('content/evidence/review-ledger.json'));
for(const r of routes.routes)for(const locale of ['en','pl']){
 const key=`${r.id}/${locale}`;if(seen.has(key))throw Error(`Duplicate ${key}`);seen.add(key);
 const path=r.paths[locale];if(paths.has(path))throw Error(`Duplicate path ${path}`);paths.add(path);
 if(!/^\/(en|pl)\/(?:[a-z0-9-]+\/)*$/.test(path))throw Error(`Invalid route ${path}`);
 const file=`content/pages/${locale}/${r.id}.json`;const raw=fs.readFileSync(file);const page=JSON.parse(raw);
 if(page.id!==r.id||page.locale!==locale||page.sections.length<2||!page.sourceRefs?.length)throw Error(`Invalid record ${key}`);
 if(page.editorialState!=='draft')throw Error(`Unexpected public-intent state ${key}`);
 for(const id of page.related)if(!routes.routes.some(x=>x.id===id))throw Error(`Unknown related ${id}`);
 const hash=crypto.createHash('sha256').update(raw).digest('hex');const review=ledger[key];if(!review)throw Error(`No review record ${key}`);
 if(review.contentHash!==hash&&review.languageReview==='reviewed')throw Error(`Review stale for ${key}`);
}
const assets=JSON.parse(fs.readFileSync('content/assets/registry.json'));for(const asset of assets)if(!fs.existsSync(asset.file))throw Error(`Missing asset ${asset.file}`);
console.log(`Validated ${seen.size} records, ${paths.size} routes, ${assets.length} concept assets; reviews remain pending.`);
