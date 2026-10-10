import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import net from 'node:net';
import crypto from 'node:crypto';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const audit = path.dirname(root);
const resultsRoot = path.dirname(audit);
const output = path.join(root, 'evidence');
const fixtureRoot = path.join(audit, 'fixtures/pass-02');
fs.mkdirSync(output, { recursive: true });
if (fs.existsSync(fixtureRoot)) throw new Error('Pass-02 fixtures already exist; preserve previous evidence.');
fs.mkdirSync(fixtureRoot, { recursive: true });
for (const name of ['report.md', 'rule-matrix.json', 'rule-matrix.md'])
  fs.copyFileSync(path.join(audit, name), path.join(root, `before-${name}`));
const results = [];
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const digest = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const treeDigest = dir => {
  const items = [];
  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true }).sort((a,b) => a.name.localeCompare(b.name))) {
      const file = path.join(current, entry.name);
      if (entry.isDirectory()) walk(file);
      else items.push([path.relative(dir, file), digest(file)]);
    }
  }
  walk(dir);
  return crypto.createHash('sha256').update(JSON.stringify(items)).digest('hex');
};
function record(value) {
  results.push(value);
  fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify({
    scope: 'Frozen first-delivery copies, synthetic local checks only. Promotion faults are explicitly injected; no production release or external send.',
    node: process.version, results,
  }, null, 2) + '\n');
  console.log(JSON.stringify(value));
}
function cleanEnv(port) {
  const env = { ...process.env };
  for (const key of ['NODE_OPTIONS','RESEND_API_KEY','ENQUIRY_FROM','ENQUIRY_TO','AF_LIVE_ACTIVATION_RECORD','PUBLICATION_APPROVAL_FILE','CONTENT_APPROVED','SITE_INDEXABLE']) delete env[key];
  return { ...env, SITE_PROFILE:'preview', ENQUIRY_MODE:'fixture', HOST:'127.0.0.1', PORT:String(port), SITE_ORIGIN:`http://127.0.0.1:${port}`, ASTRO_TELEMETRY_DISABLED:'1' };
}
async function command(label, cwd, args, env) {
  const child = spawn(process.execPath, args, { cwd, env, stdio:['ignore','pipe','pipe'] });
  const log = fs.createWriteStream(path.join(output, `${label}.log`));
  child.stdout.pipe(log, { end:false }); child.stderr.pipe(log, { end:false });
  return await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('close', code => { log.end(); resolve(code); });
  });
}
async function freePort(port) {
  const server = net.createServer();
  await new Promise((resolve,reject) => { server.once('error',reject); server.listen(port,'127.0.0.1',resolve); });
  await new Promise(resolve => server.close(resolve));
}
async function get(port, pathname='/en/') {
  try {
    const response = await fetch(`http://127.0.0.1:${port}${pathname}`, { signal:AbortSignal.timeout(3000) });
    return { status:response.status, body:await response.text() };
  } catch(error) { return { status:null, error:error.cause?.code || error.name }; }
}
async function start(label, cwd, port, env) {
  await freePort(port);
  if (label === 'A') await freePort(port + 1);
  const args = label === 'A' ? ['scripts/runtime/launch.mjs','start'] : ['server.mjs'];
  const child = spawn(process.execPath, args, { cwd, env, detached:true, stdio:['ignore','pipe','pipe'] });
  const log = fs.createWriteStream(path.join(output, `${label}-server-${Date.now()}.log`));
  child.stdout.pipe(log, { end:false }); child.stderr.pipe(log, { end:false });
  child.once('close', () => log.end());
  for (let i=0; i<150; i++) {
    const response = await get(port);
    if (response.status === 200) return child;
    if (child.exitCode !== null) throw new Error(`${label} server exited ${child.exitCode}`);
    await delay(100);
  }
  await stop(child);
  throw new Error(`${label} server did not become ready`);
}
async function stop(child) {
  if (!child) return;
  // The detached group contains only this evaluation's server and its children.
  try { process.kill(-child.pid, 'SIGTERM'); } catch(error) { if (error.code !== 'ESRCH') throw error; }
  for (let i=0; i<30 && child.exitCode === null && child.signalCode === null; i++) await delay(100);
}
async function malformedTarget(port) {
  return await new Promise(resolve => {
    const request = http.request({ host:'127.0.0.1', port, path:'http://[', method:'GET', headers:{Host:`127.0.0.1:${port}`,Connection:'close'} }, response => {
      let body=''; response.on('data', chunk => body += chunk); response.on('end', () => resolve({status:response.statusCode,body}));
    });
    request.setTimeout(3000, () => request.destroy(new Error('timeout')));
    request.once('error', error => resolve({status:null,error:error.code || error.message}));
    request.end();
  });
}

fs.writeFileSync(path.join(root, 'fail-promotion.mjs'), `import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {syncBuiltinESMExports} from 'node:module';
function fail(from,to){
 if(['.dist-candidate','.build-temp'].includes(path.basename(String(from)))&&path.basename(String(to))==='dist'){
  fs.writeFileSync(process.env.EVAL_FAULT_MARKER,JSON.stringify({from:String(from),to:String(to),code:'EACCES'}));
  const error=new Error('Synthetic evaluation: candidate promotion denied');error.code='EACCES';throw error;
 }
}
const sync=fs.renameSync;fs.renameSync=function(from,to){fail(from,to);return sync.apply(this,arguments);};
const asyncRename=fsp.rename;fsp.rename=async function(from,to){fail(from,to);return asyncRename.apply(this,arguments);};
syncBuiltinESMExports();
`);

for (const [label,port] of [['A',4601],['B',4611]]) {
  const cwd = path.join(fixtureRoot,label);
  const snapshot = path.join(resultsRoot,'snapshots',label);
  fs.mkdirSync(cwd);
  const manifest = JSON.parse(fs.readFileSync(path.join(resultsRoot,`snapshot-${label}.json`)));
  for (const item of manifest) {
    if (item.path.startsWith('dist/')) continue;
    const destination=path.join(cwd,item.path);
    fs.mkdirSync(path.dirname(destination),{recursive:true});
    fs.copyFileSync(path.join(snapshot,item.path),destination);
  }
  fs.symlinkSync(path.join(snapshot,'node_modules'),path.join(cwd,'node_modules'),'dir');
  const env=cleanEnv(port);
  const buildArgs=label==='A'?['scripts/runtime/build.mjs']:['build.mjs'];
  const baselineBuild=await command(`${label}-baseline-build`,cwd,buildArgs,env);
  if(baselineBuild!==0)throw new Error(`${label} baseline build failed: ${baselineBuild}`);
  const dist=path.join(cwd,'dist');
  const baselineHash=treeDigest(dist);
  let server;
  try {
    server=await start(label,cwd,port,env);
    const baseline=await get(port);
    record({id:`${label}-baseline`,buildExit:baselineBuild,httpStatus:baseline.status,artifactHash:baselineHash});

    const requests=await Promise.all(Array.from({length:24},(_,i)=>get(port,i%2?'/en/':'/pl/')));
    record({id:`${label}-parallel-read-smoke`,requests:requests.length,statuses:requests.map(r=>r.status),scope:'Small local smoke check, not a capacity or production-load benchmark.'});

    if(label==='A'){
      const payload={intent:'general',email:'evaluation@example.test',message:'Synthetic second-pass reliability check.',locale:'en',submissionId:crypto.randomUUID(),website:''};
      const submit=async value=>{const response=await fetch(`http://127.0.0.1:${port}/api/enquiries`,{method:'POST',headers:{Origin:env.SITE_ORIGIN,'Content-Type':'application/json'},body:JSON.stringify(value),signal:AbortSignal.timeout(15000)});return {status:response.status,result:await response.json()};};
      const sameId=await Promise.all(Array.from({length:4},()=>submit(payload)));
      const conflict=await submit({...payload,message:'A changed synthetic payload under the same identifier.'});
      const rateLimited=await submit(payload);
      record({id:'A-network-idempotency',sameId,distinctReceipts:[...new Set(sameId.map(x=>x.result.receiptId).filter(Boolean))],conflict,rateLimited});
    }

    const source=path.join(cwd,label==='A'?'content/pages/en/home.json':'src/render.mjs');
    const sourceBytes=fs.readFileSync(source);
    let failedPreparation;
    try{
      fs.writeFileSync(source,label==='A'?'{ invalid candidate':sourceBytes.toString()+'\nSYNTHETIC INVALID JAVASCRIPT !!!\n');
      failedPreparation=await command(`${label}-invalid-preparation`,cwd,buildArgs,env);
    }finally{fs.writeFileSync(source,sourceBytes);}
    const afterPreparation=await get(port);
    record({id:`${label}-failed-preparation`,exitCode:failedPreparation,artifactUnchanged:treeDigest(dist)===baselineHash,httpStatus:afterPreparation.status,htmlUnchanged:afterPreparation.body===baseline.body});

    const marker=path.join(output,`${label}-promotion-fault.json`);
    const promotionExit=await command(`${label}-failed-promotion`,cwd,buildArgs,{...env,NODE_OPTIONS:`--import=${path.join(root,'fail-promotion.mjs')}`,EVAL_FAULT_MARKER:marker});
    const backup=path.join(cwd,label==='A'?'.dist-previous':'.dist-old');
    const afterPromotion=await get(port);
    await delay(200);
    record({id:`${label}-failed-promotion`,exitCode:promotionExit,faultInjected:fs.existsSync(marker),distExists:fs.existsSync(dist),backupExists:fs.existsSync(backup),backupMatchesBaseline:fs.existsSync(backup)&&treeDigest(backup)===baselineHash,httpStatus:afterPromotion.status,requestError:afterPromotion.error??null,serverExitCode:server.exitCode});
    await stop(server);server=undefined;
    if(!fs.existsSync(dist)&&fs.existsSync(backup))fs.renameSync(backup,dist);
    server=await start(label,cwd,port,env);
    const restored=await get(port);
    record({id:`${label}-manual-artifact-restore`,httpStatus:restored.status,htmlUnchanged:restored.body===baseline.body,artifactUnchanged:treeDigest(dist)===baselineHash});

    const malformed=await malformedTarget(port);
    await delay(300);
    const afterMalformed=await get(port);
    record({id:`${label}-malformed-request-target`,target:'http://[',response:malformed,serverExitCode:server.exitCode,followupStatus:afterMalformed.status,followupError:afterMalformed.error??null});
  }finally{await stop(server);}
}
