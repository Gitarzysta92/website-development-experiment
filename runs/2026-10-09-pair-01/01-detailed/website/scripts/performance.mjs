import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { spawn, spawnSync } from 'node:child_process';
import os from 'node:os';
import {implementationFingerprint} from './fingerprint.mjs';
import { chromium } from '@playwright/test';
if(!existsSync('dist/client/en/index.html'))throw new Error('Home is not implemented/built yet');
mkdirSync('artifacts/performance',{recursive:true});
const routes=JSON.parse(readFileSync('content/shared/routes.json','utf8')).routes;
const candidates=routes.filter(r=>r.project&&r.id!==r.project).map(r=>{
 const record=JSON.parse(readFileSync(`content/pages/pl/${r.id}.json`,'utf8'));
 const text=[record.title,record.lead,...record.sections.flatMap(s=>[s.title,...s.paragraphs,...(s.items||[]),...(s.rows||[]).flat()])].join(' ');
 return {...r,textLength:text.length};
}).sort((a,b)=>b.textLength-a.textLength);
const tech=candidates[0];
writeFileSync('artifacts/performance/conditions.json',JSON.stringify({fingerprint:implementationFingerprint(),time:new Date().toISOString(),node:process.version,os:os.release(),platform:os.platform(),arch:os.arch(),cpu:os.cpus()[0]?.model,logicalCPUs:os.cpus().length,memoryBytes:os.totalmem(),selection:'Longest PL technical authored visible text (title, lead, headings, paragraphs, lists and tables)',candidates:candidates.map(r=>({id:r.id,characters:r.textLength})),profile:'Lighthouse default simulated mobile; cold browser per sample; local loopback'},null,2));

const server=spawn(process.execPath,['scripts/runtime/launch.mjs','start'],{stdio:'ignore'});
try {
let ready=false;for(let i=0;i<80;i++){try{if((await fetch('http://127.0.0.1:4321/robots.txt')).status===200){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}if(!ready)throw new Error('Performance server unavailable');
const samples=[];
for(const [label,path] of (process.argv.includes('--home-only')?[['home','/en/']]:[['home','/en/'],['technical',tech.paths.pl]]))for(let i=1;i<=3;i++){
 const output=`artifacts/performance/${label}-${i}.json`;
 const r=spawnSync(process.execPath,['node_modules/lighthouse/cli/index.js',`${process.env.TEST_ORIGIN||'http://127.0.0.1:4321'}${path}`,'--only-categories=performance','--output=json',`--output-path=${output}`,'--chrome-flags=--headless --no-sandbox','--quiet'],{stdio:'inherit',env:{...process.env,CHROME_PATH:chromium.executablePath()}});
 if(r.status!==0)process.exit(r.status||1);
 const report=JSON.parse(readFileSync(output,'utf8'));samples.push({label,path,run:i,score:report.categories.performance.score*100,lcp:report.audits['largest-contentful-paint'].numericValue,cls:report.audits['cumulative-layout-shift'].numericValue,version:report.lighthouseVersion});
}
writeFileSync('artifacts/performance/summary.json',JSON.stringify(samples,null,2));
for(const label of [...new Set(samples.map(s=>s.label))]){const group=samples.filter(s=>s.label===label);for(const [key,threshold,greater] of [['score',90,true],['lcp',2500,false],['cls',0.1,false]]){const median=group.map(s=>s[key]).sort((a,b)=>a-b)[1];console.log(label,key,median);if(greater?median<threshold:median>threshold)process.exitCode=1;}}

} finally {server.kill('SIGTERM');}
