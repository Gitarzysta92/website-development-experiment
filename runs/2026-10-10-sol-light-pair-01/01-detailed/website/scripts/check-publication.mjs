import {readFileSync,existsSync} from 'node:fs';import {createHash} from 'node:crypto';
const read=path=>JSON.parse(readFileSync(path,'utf8'));
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
const copy=page=>digest({title:page.title,lead:page.lead,description:page.description,sections:page.sections});
const fail=reason=>{throw Error(`Published export blocked: ${reason}`)};
const origin=process.env.SITE_ORIGIN;try{if(!origin||new URL(origin).protocol!=='https:')fail('approved HTTPS SITE_ORIGIN required')}catch{fail('valid approved HTTPS SITE_ORIGIN required')}
if(process.env.ENQUIRY_MODE!=='resend'||!process.env.RESEND_API_KEY||!process.env.ENQUIRY_FROM||!process.env.ENQUIRY_TO)fail('approved live receiver configuration required');
if(!existsSync('content/evidence/live-activation.json'))fail('live send/data activation record absent');
const activation=read('content/evidence/live-activation.json');if(activation.approved!==true||!activation.operator||!activation.dataOwner)fail('live activation approval incomplete');
if(!existsSync('content/assets/concepts.json'))fail('asset register absent');
const assetDigest=digest(read('content/assets/concepts.json'));
const reviews=read('content/evidence/reviews.json').records;
for(const route of read('content-routes.json').routes){const en=read(`content/pages/en/${route.id}.json`),pl=read(`content/pages/pl/${route.id}.json`),record=reviews[route.id];if(!record||en.editorialState!=='published'||pl.editorialState!=='published')fail(`${route.id} editorial publication state absent`);const checks=[['facts',copy(en)],['en',copy(en)],['pl',copy(pl)]];for(const [kind,hash] of checks){const approval=record[kind];if(approval?.state!=='reviewed'||approval.digest!==hash||!approval.reviewer)fail(`${route.id} ${kind} review absent or stale`)}if(record.assets?.state!=='reviewed'||record.assets.digest!==assetDigest||!record.assets.reviewer)fail(`${route.id} asset rights review absent or stale`)}
console.log('Published export prerequisites verified');
