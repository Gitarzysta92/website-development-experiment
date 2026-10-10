import { spawn } from 'node:child_process';
import { mkdirSync, createWriteStream, writeFileSync, copyFileSync, existsSync } from 'node:fs';
import {implementationFingerprint} from './fingerprint.mjs';
const runId=new Date().toISOString().replaceAll(':','-');
const runDir=`artifacts/runs/${runId}`;mkdirSync(runDir,{recursive:true});
const fingerprint=implementationFingerprint();
const log=createWriteStream('artifacts/browser-server.log',{flags:'a'});
const server=spawn(process.execPath,['scripts/runtime/launch.mjs','start'],{env:{...process.env,AF_TEST_RECEIPT_OBSERVER:'1'},stdio:['ignore','pipe','pipe','ipc']});server.stdout.pipe(log);server.stderr.pipe(log);
const receipts=[];writeFileSync('artifacts/receipts.json','[]');server.on('message',message=>{if(message.type==='fixture-receipt'){receipts.push(message);writeFileSync('artifacts/receipts.json',JSON.stringify(receipts,null,2));}});
let ready=false;
try{
 for(let i=0;i<80;i++){try{const r=await fetch(`${process.env.TEST_ORIGIN || 'http://127.0.0.1:4321'}/robots.txt`);if(r.status===200){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}
 if(!ready)throw new Error('Built server did not become ready');
 const child=spawn(process.execPath,['node_modules/@playwright/test/cli.js','test',...process.argv.slice(2)],{stdio:'inherit'});
 process.exitCode=await new Promise(resolve=>child.on('exit',c=>resolve(c||0)));
}finally{server.kill('SIGTERM');log.end();for(const file of ['browser-results.json','receipts.json'])if(existsSync(`artifacts/${file}`))copyFileSync(`artifacts/${file}`,`${runDir}/${file}`);writeFileSync(`${runDir}/run.json`,JSON.stringify({time:runId,fingerprint,args:process.argv.slice(2),componentFixtures:process.env.COMPONENT_FIXTURES==='1',exitCode:process.exitCode||0},null,2));}
