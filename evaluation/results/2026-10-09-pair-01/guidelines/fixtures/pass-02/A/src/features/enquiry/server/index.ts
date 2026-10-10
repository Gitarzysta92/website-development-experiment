import { createEnquiryService } from '../application/index';
import type { Outcome } from '../domain/index';
import { fixtureReceiver,disabledReceiver,resendReceiver } from './receivers';
import { liveConfiguration } from '../../../config/server';
export { fixtureReceiver,disabledReceiver,resendReceiver } from './receivers';
const mode=process.env.ENQUIRY_MODE||'fixture';
const origin=process.env.SITE_ORIGIN||'http://127.0.0.1:4321';
if(mode==='fixture'&&((process.env.SITE_PROFILE||'preview')!=='preview'||new URL(origin).hostname!=='127.0.0.1'||(process.env.HOST&&process.env.HOST!=='127.0.0.1')))throw new Error('Unsafe fixture configuration');
const live=liveConfiguration(process.env);
const receiver=mode==='fixture'?fixtureReceiver(Date.now,entry=>{if(process.env.AF_TEST_RECEIPT_OBSERVER==='1'&&process.send)process.send({type:'fixture-receipt',...entry});}):mode==='resend'&&live?resendReceiver(live):disabledReceiver;
const service=createEnquiryService(receiver);
export function createEndpoint(submit:(raw:unknown)=>Promise<Outcome>,allowedOrigin:string,clock=Date.now){const attempts=new Map<string,{start:number;count:number}>();return async function handle(request:Request,peer:string){const headers={'Content-Type':'application/json','Cache-Control':'no-store'};const respond=(status:number,result:Outcome,extra={})=>new Response(JSON.stringify(result),{status,headers:{...headers,...extra}});
 if(request.method!=='POST')return respond(405,{status:'rejected'},{Allow:'POST'});
 if(request.headers.get('origin')!==allowedOrigin)return respond(403,{status:'rejected'});
 if(!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type')||''))return respond(415,{status:'rejected'});
 const now=clock();for(const [key,v] of attempts)if(now-v.start>=60000)attempts.delete(key);
 const prior=attempts.get(peer);if(prior&&prior.count>=5)return respond(429,{status:'throttled',retryAfter:Math.ceil((60000-now+prior.start)/1000)},{'Retry-After':String(Math.ceil((60000-now+prior.start)/1000))});
 if(!prior&&attempts.size>=1000)return respond(503,{status:'unavailable'});attempts.set(peer,{start:prior?.start??now,count:(prior?.count??0)+1});
 try{let size=0;const chunks:Uint8Array[]=[];const reader=request.body?.getReader();if(!reader)return respond(400,{status:'rejected'});while(true){const next=await reader.read();if(next.done)break;size+=next.value.byteLength;if(size>32768){await reader.cancel();return respond(413,{status:'rejected'});}chunks.push(next.value);}const buffer=new Uint8Array(size);let offset=0;for(const chunk of chunks){buffer.set(chunk,offset);offset+=chunk.length;}let value:unknown;try{value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(buffer));}catch{return respond(400,{status:'rejected'});}
 const outcome=await submit(value);const codes:Record<Outcome['status'],number>={accepted:200,rejected:422,pending:409,conflict:409,unavailable:503,uncertain:504,throttled:429};return respond(codes[outcome.status],outcome);
 }catch{return respond(400,{status:'rejected'});}
};}
export const handleEnquiry=createEndpoint(service.submit,origin);
