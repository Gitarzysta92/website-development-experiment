import type {APIRoute} from 'astro';
import {validateRequest} from '../../features/enquiry/domain';
import {selectReceiver} from '../../features/enquiry/server';
import {submitEnquiry} from '../../features/enquiry/application';
export const prerender=false;
const peers=new Map<string,{count:number;start:number}>();
const receiver=selectReceiver();
const json=(body:object,status:number,extra:Record<string,string>={})=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',...extra}});
export const ALL:APIRoute=async({request,clientAddress})=>{
  if(request.method!=='POST')return json({status:'method'},405,{Allow:'POST'});
  if(request.headers.get('content-type')?.split(';')[0].trim()!=='application/json')return json({status:'media'},415);
  const origin=request.headers.get('origin');const expected=process.env.SITE_ORIGIN??'http://127.0.0.1:4321';if(!origin||origin!==expected)return json({status:'origin'},403);
  const peer=clientAddress||'unknown';const now=Date.now();if(peers.size>=1000){for(const [k,v] of peers)if(now-v.start>60000)peers.delete(k);if(peers.size>=1000&&!peers.has(peer))peers.delete(peers.keys().next().value!)}const entry=peers.get(peer);const current=!entry||now-entry.start>60000?{count:0,start:now}:entry;current.count++;peers.set(peer,current);if(current.count>5)return json({status:'throttled'},429,{'Retry-After':String(Math.max(1,Math.ceil((current.start+60000-now)/1000)))});
  let bytes=0;const chunks:Uint8Array[]=[];if(!request.body)return json({status:'invalid'},400);const reader=request.body.getReader();try{while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;if(bytes>32768){await reader.cancel();return json({status:'too_large'},413)}chunks.push(value)}}catch{return json({status:'invalid'},400)}
  let value;try{value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks)))}catch{return json({status:'invalid'},400)}const parsed=validateRequest(value);if(!parsed.success)return json({status:'rejected',errors:parsed.error.issues.map(i=>({field:String(i.path[0]??'request'),code:i.code}))},422);
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),10000);try{return json(await submitEnquiry(parsed.data,receiver,controller.signal),200)}catch(error){const reason=error instanceof Error?error.message:'uncertain';if(reason==='conflict'||reason==='pending')return json({status:reason},409);if(reason==='unavailable')return json({status:'unavailable'},503);return json({status:'uncertain'},504)}finally{clearTimeout(timer)}
};
