import {createHash} from 'node:crypto';
import {serverConfig} from '../../../config/server';
import type {Enquiry,Receiver,Receipt} from '../domain';
export class ReceiverError extends Error {constructor(public kind:'conflict'|'pending'|'unavailable'|'uncertain'){super(kind)}}
const DAY=24*60*60*1000;
export function fixtureReceiver(now=()=>Date.now()){
 const receipts=new Map<string,{hash:string;receipt:Receipt;expires:number}>();
 const receive:Receiver=async(value,bytes)=>{
  const time=now();for(const [k,v] of receipts)if(v.expires<=time)receipts.delete(k);
  const hash=createHash('sha256').update(bytes).digest('hex');
  const existing=receipts.get(value.submissionId);
  if(existing){if(existing.hash!==hash)throw new ReceiverError('conflict');return existing.receipt}
  if(receipts.size>=1000)receipts.delete(receipts.keys().next().value!);
  const receipt:Receipt={status:'accepted',receiptId:`local-${value.submissionId}`,mode:'fixture'};
  receipts.set(value.submissionId,{hash,receipt,expires:time+DAY});return receipt;
 };
 return {receive,inspect:(id:string)=>{const entry=receipts.get(id);if(entry&&entry.expires<=now()){receipts.delete(id);return undefined}return entry?.receipt},count:()=>receipts.size};
}
export const disabledReceiver:Receiver=async()=>{throw new ReceiverError('unavailable')};
export type ResendConfig={key:string;from:string;to:string;transport?:typeof fetch;now?:()=>number};
export function resendReceiver(config:ResendConfig):Receiver{
 const fetcher=config.transport??fetch;const now=config.now??Date.now;
 const attempts=new Map<string,{hash:string;started:number;state:'pending'|'uncertain'|'accepted';receipt?:Receipt}>();
 return async(value:Enquiry,bytes:string)=>{
  const time=now();for(const [id,item] of attempts)if(item.started+DAY<time)attempts.delete(id);
  const hash=createHash('sha256').update(bytes).digest('hex');
  let attempt=attempts.get(value.submissionId);
  if(attempt){
   if(attempt.hash!==hash)throw new ReceiverError('conflict');
   if(attempt.state==='accepted')return attempt.receipt!;
   if(attempt.state==='pending')throw new ReceiverError('pending');
   if(time-attempt.started>23*60*60*1000)throw new ReceiverError('unavailable');
  }else{attempt={hash,started:time,state:'pending'};attempts.set(value.submissionId,attempt)}
  attempt.state='pending';
  const subject=`Artifactory enquiry: ${value.intent}${value.project?` / ${value.project}`:''}`;
  const text=[`Intent: ${value.intent}`,`Project: ${value.project??'unspecified'}`,`Locale: ${value.locale}`,`Name: ${value.name??''}`,`Organization: ${value.organization??''}`,`Email: ${value.email}`,'',value.message].join('\n');
  const payload=JSON.stringify({from:config.from,to:[config.to],subject,text,reply_to:value.email});
  let response:Response;
  try{response=await fetcher('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${config.key}`,'Content-Type':'application/json','Idempotency-Key':`enquiry/${value.submissionId}`},body:payload,signal:AbortSignal.timeout(10000)})}catch{attempt.state='uncertain';throw new ReceiverError('uncertain')}
  if(!response.ok){if([400,401,403,422].includes(response.status)){attempts.delete(value.submissionId);throw new ReceiverError('unavailable')}attempt.state='uncertain';throw new ReceiverError('uncertain')}
  let json:any;try{json=await response.json()}catch{attempt.state='uncertain';throw new ReceiverError('uncertain')}
  if(typeof json?.id!=='string'||!json.id.trim()){attempt.state='uncertain';throw new ReceiverError('uncertain')}
  const receipt:Receipt={status:'accepted',receiptId:json.id,mode:'resend'};
  attempt.state='accepted';attempt.receipt=receipt;return receipt;
 };
}
const fixture=fixtureReceiver();
export function selectedReceiver():Receiver{
 const mode=serverConfig().receiver;
 if(mode==='fixture')return fixture.receive;
 if(mode==='resend'){
  if(process.env.AF_ENABLE_LIVE_SEND!=='approved'||!process.env.RESEND_API_KEY||!process.env.RESEND_FROM||!process.env.ENQUIRY_TO)return disabledReceiver;
  return resendReceiver({key:process.env.RESEND_API_KEY,from:process.env.RESEND_FROM,to:process.env.ENQUIRY_TO});
 }
 return disabledReceiver;
}
export const inspectFixture=fixture.inspect;
