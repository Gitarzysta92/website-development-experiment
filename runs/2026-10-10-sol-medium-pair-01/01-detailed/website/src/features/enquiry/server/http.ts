import {parseEnquiry,type Receiver} from '../domain';
import {submitEnquiry} from '../application';
import {ReceiverError} from './index';
const response=(status:number,data:unknown,headers?:HeadersInit)=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store',...headers}});
export function createEnquiryHandler(receiver:()=>Receiver,now=()=>Date.now()){
 const attempts=new Map<string,number[]>();
 return async(request:Request,peer:string):Promise<Response>=>{
  if(request.method!=='POST')return response(405,{status:'rejected',error:'method'},{Allow:'POST'});
  const origin=request.headers.get('origin'),host=request.headers.get('host');let source:URL;
  try{source=new URL(origin||'')}catch{return response(403,{status:'rejected',error:'origin'})}
  if(!host||source.host!==host||!['127.0.0.1','localhost'].includes(source.hostname)||source.protocol!=='http:')return response(403,{status:'rejected',error:'origin'});
  if(!request.headers.get('content-type')?.startsWith('application/json'))return response(415,{status:'rejected',error:'media'});
  const time=now();for(const [key,values] of attempts)if(values.every(x=>x<time-60000))attempts.delete(key);
  const times=(attempts.get(peer)||[]).filter(x=>x>=time-60000);if(times.length>=5)return response(429,{status:'throttled',retryAfter:60},{'Retry-After':'60'});times.push(time);attempts.set(peer,times);
  if(attempts.size>1000)attempts.delete(attempts.keys().next().value!);
  let bytes=0;const chunks:Uint8Array[]=[];
  try{for await(const chunk of request.body as any){const data=typeof chunk==='string'?new TextEncoder().encode(chunk):chunk;bytes+=data.byteLength;if(bytes>32768)return response(413,{status:'rejected',error:'size'});chunks.push(data)}}catch{return response(400,{status:'rejected',error:'body'})}
  let body:string;try{body=new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks));}catch{return response(400,{status:'rejected',error:'utf8'})}
  let json:unknown;try{json=JSON.parse(body)}catch{return response(400,{status:'rejected',error:'json'})}
  const parsed=parseEnquiry(json);if(!parsed.success){const errors=parsed.error.issues.map(x=>({field:x.path[0]||'form',code:x.code}));return response(422,{status:'rejected',errors})}
  try{return response(200,await submitEnquiry(receiver(),parsed.data,JSON.stringify(parsed.data)))}catch(error){
   const kind=error instanceof ReceiverError?error.kind:'uncertain';return response(kind==='conflict'||kind==='pending'?409:kind==='unavailable'?503:504,{status:kind});
  }
 };
}
