import { validateEnquiry, retryWindowMs, type EnquiryReceiver, type Outcome } from '../domain/index';
export interface Entry{payload:string;created:number;pending:boolean;result?:Outcome;}
export interface Limits{entries:Map<string,Entry>;maxEntries:number;timeoutMs:number;}
export async function submitEnquiry(raw:unknown,{receiver,clock,limits}:{receiver:EnquiryReceiver;clock:()=>number;limits:Limits}):Promise<Outcome>{
 const parsed=validateEnquiry(raw);if(!parsed.ok)return {status:'rejected',errors:parsed.errors};
 const request=parsed.value;const now=clock();const payload=JSON.stringify(request);
 for(const [id,entry] of limits.entries)if(now-entry.created>=24*60*60*1000)limits.entries.delete(id);
 const previous=limits.entries.get(request.submissionId);
 if(previous){if(previous.payload!==payload)return {status:'conflict'};if(now-previous.created>=retryWindowMs)return {status:'unavailable'};if(previous.pending)return {status:'pending'};if(previous.result?.status==='accepted')return previous.result;}
 if(!previous&&limits.entries.size>=limits.maxEntries)return {status:'unavailable'};
 const entry=previous||{payload,created:now,pending:true};entry.pending=true;limits.entries.set(request.submissionId,entry);
 if(!previous){const expiry=setTimeout(()=>{if(limits.entries.get(request.submissionId)===entry)limits.entries.delete(request.submissionId);},24*60*60*1000);expiry.unref?.();}
 const controller=new AbortController();let timer:ReturnType<typeof setTimeout>|undefined;
 try{
 const response=await Promise.race([receiver.accept(request,request.submissionId,controller.signal),new Promise<Outcome>(resolve=>{timer=setTimeout(()=>{controller.abort();resolve({status:'uncertain'});},limits.timeoutMs);})]);
 const result:Outcome=response.status==='accepted'&&!response.receiptId?{status:'uncertain'}:response;
 entry.result=result;return result;
 }catch{entry.result={status:'uncertain'};return entry.result;}finally{clearTimeout(timer);entry.pending=false;}
}
export function createEnquiryService(receiver:EnquiryReceiver,clock=Date.now,options:Partial<Omit<Limits,'entries'>>={}){const limits:Limits={entries:new Map(),maxEntries:1000,timeoutMs:10000,...options};return {submit:(raw:unknown)=>submitEnquiry(raw,{receiver,clock,limits}),inspect:()=>limits.entries};}
