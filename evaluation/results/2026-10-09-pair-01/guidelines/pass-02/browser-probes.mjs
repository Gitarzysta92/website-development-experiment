import fs from 'node:fs';
import path from 'node:path';
import net from 'node:net';
import {spawn} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const audit=path.dirname(root);
const resultsRoot=path.dirname(audit);
const out=path.join(root,'evidence');
const require=createRequire(path.join(resultsRoot,'snapshots/A/package.json'));
const {chromium}=require('@playwright/test');
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const results=[];
async function freePort(port){const server=net.createServer();await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(port,'127.0.0.1',resolve);});await new Promise(resolve=>server.close(resolve));}
async function start(label,port){
 await freePort(port);if(label==='A')await freePort(port+1);
 const env={...process.env,SITE_PROFILE:'preview',ENQUIRY_MODE:'fixture',HOST:'127.0.0.1',PORT:String(port),SITE_ORIGIN:`http://127.0.0.1:${port}`};
 for(const key of ['RESEND_API_KEY','ENQUIRY_FROM','ENQUIRY_TO','AF_LIVE_ACTIVATION_RECORD','NODE_OPTIONS'])delete env[key];
 const cwd=path.join(audit,'fixtures/pass-02',label);
 const child=spawn(process.execPath,label==='A'?['scripts/runtime/launch.mjs','start']:['server.mjs'],{cwd,env,detached:true,stdio:['ignore','pipe','pipe']});
 const log=fs.createWriteStream(path.join(out,`${label}-browser-server.log`));child.stdout.pipe(log,{end:false});child.stderr.pipe(log,{end:false});child.once('close',()=>log.end());
 for(let i=0;i<150;i++){
  try{const response=await fetch(`http://127.0.0.1:${port}/en/`,{signal:AbortSignal.timeout(1500)});if(response.status===200)return child;}catch{}
  if(child.exitCode!==null)throw new Error(`${label} server exited ${child.exitCode}`);
  await delay(100);
 }
 await stop(child);throw new Error('Preview did not start');
}
async function stop(child){if(!child)return;try{process.kill(-child.pid,'SIGTERM');}catch(error){if(error.code!=='ESRCH')throw error;}for(let i=0;i<30&&child.exitCode===null&&child.signalCode===null;i++)await delay(100);}
const routes=['/en/','/pl/projekty/aifield/badania-modeli-pola/','/pl/kontakt/'];
const metrics=page=>page.evaluate(()=>({
 title:document.querySelector('h1')?.textContent.trim(),text:document.querySelector('main')?.innerText,
 overflow:document.documentElement.scrollWidth>innerWidth,
 fonts:[...document.fonts].map(font=>({family:font.family,status:font.status})),
 h1Height:document.querySelector('h1')?.getBoundingClientRect().height,
 resourceBytes:performance.getEntriesByType('resource').reduce((sum,r)=>sum+r.transferSize,0),
 resources:performance.getEntriesByType('resource').map(r=>({path:new URL(r.name).pathname,transfer:r.transferSize,decoded:r.decodedBodySize})),
}));
const browser=await chromium.launch({headless:true});
try{
 for(const [label,port] of [['A',4601],['B',4611]]){
  let server;
  try{
   server=await start(label,port);
   for(const width of [390,1280]){
    const normal=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
    const blocked=await browser.newContext({viewport:{width,height:844},reducedMotion:'reduce'});
    const blockedFonts=[];
    await normal.route('**/*',r=>new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort());
    await blocked.route('**/*',r=>{
     if(r.request().resourceType()==='font'){blockedFonts.push(new URL(r.request().url()).pathname);return r.abort();}
     return new URL(r.request().url()).hostname==='127.0.0.1'?r.continue():r.abort();
    });
    const page=await normal.newPage();const fallback=await blocked.newPage();
    for(const route of routes){
     const url=`http://127.0.0.1:${port}${route}`;
     await page.goto(url);await page.evaluate(()=>document.fonts.ready);
     const before=await metrics(page);
     await page.reload();await page.evaluate(()=>document.fonts.ready);
     const warm=await metrics(page);
     await fallback.goto(url);await fallback.evaluate(()=>document.fonts.ready);
     const after=await metrics(fallback);
     const id=`${label}-font-fallback-${width}-${route.split('/').filter(Boolean).at(-1)}`;
     const screenshot=`${id}.png`;
     await fallback.screenshot({path:path.join(out,screenshot),fullPage:true});
     const {text:beforeText,...normalMetrics}=before;
     const {text:warmText,...warmMetrics}=warm;
     const {text:afterText,...fallbackMetrics}=after;
     const result={id,route,width,blockedFonts:[...new Set(blockedFonts)],normal:normalMetrics,warm:warmMetrics,fallback:fallbackMetrics,mainTextPreserved:beforeText===afterText,warmTextPreserved:beforeText===warmText,screenshot};
     results.push(result);console.log(JSON.stringify({id,fontsBlocked:result.blockedFonts.length,overflow:after.overflow,textPreserved:result.mainTextPreserved}));
    }
    await normal.close();await blocked.close();
   }
  }finally{await stop(server);}
 }
}finally{await browser.close();}
fs.writeFileSync(path.join(out,'browser-results.json'),JSON.stringify({chromium:browser.version(),scope:'Representative warm reload and blocked-font rendering; no Lighthouse or production performance claim. Request routing is enabled to inject failures, so transfer sizes are diagnostics and not a cache-efficiency comparison.',results},null,2)+'\n');
