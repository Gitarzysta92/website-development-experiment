import fs from 'node:fs';import register from '../../compiled/routes.json' with {type:'json'};
const base='http://127.0.0.1:4321';const result=[];const check=(name,condition,detail)=>result.push({name,pass:!!condition,detail});
for(const r of register.routes)for(const locale of ['en','pl']){
 const path=r.paths[locale];const response=await fetch(base+path);const html=await response.text();check(`route ${path}`,response.status===200&&html.includes(`lang="${locale}"`)&&html.includes('noindex,nofollow')&&response.headers.get('cache-control')==='no-store',response.status);
}
for(const [path,target] of Object.entries(register.redirects)){const r=await fetch(base+path,{redirect:'manual'});check(`redirect ${path}`,r.status===308&&r.headers.get('location')===target,`${r.status} ${r.headers.get('location')}`)}
for(const path of ['/en/not-a-page/','/pl/nie-ma/']){const r=await fetch(base+path);check(`404 ${path}`,r.status===404,(await r.text()).slice(0,80))}
const post=(body,headers={})=>fetch(base+'/api/enquiries',{method:'POST',headers:{Origin:base,'Content-Type':'application/json',...headers},body});
let r=await fetch(base+'/api/enquiries',{method:'GET',headers:{Origin:base}});check('method rejected',r.status===405,r.status);
r=await post('{}',{'Content-Type':'text/plain'});check('media rejected',r.status===415,r.status);
r=await fetch(base+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});check('missing origin rejected',r.status===403,r.status);
r=await post('{}',{Origin:'http://malicious.example'});check('foreign origin rejected',r.status===403,r.status);
r=await post('{bad');check('malformed JSON rejected',r.status===400,r.status);
r=await post(JSON.stringify({intent:'general',email:'synthetic@example.com',message:'Synthetic test with unknown field',locale:'en',submissionId:crypto.randomUUID(),website:'',secret:'x'}));check('unknown field rejected',r.status===422,r.status);
r=await post('x'.repeat(32769));check('streamed body rejected',r.status===413,r.status);
for(let i=0;i<3;i++)r=await post('{}');check('rate limited',r.status===429,r.status);
fs.writeFileSync('artifacts/http-smoke.json',JSON.stringify(result,null,2));console.log(`${result.filter(x=>x.pass).length}/${result.length} checks passed`);if(result.some(x=>!x.pass)){console.log(result.filter(x=>!x.pass));process.exitCode=1}
