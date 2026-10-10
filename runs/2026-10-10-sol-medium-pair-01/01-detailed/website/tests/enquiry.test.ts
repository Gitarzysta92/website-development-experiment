import {describe,it,expect,vi} from 'vitest';
import {parseEnquiry} from '../src/features/enquiry/domain';
import {fixtureReceiver,resendReceiver,ReceiverError,disabledReceiver} from '../src/features/enquiry/server';
const valid={intent:'investment',email:'synthetic@example.com',message:'A fully synthetic question for testing.',locale:'en',submissionId:'5616a984-4675-4c43-80a9-ccfc34a36323',website:''};
describe('enquiry boundary',()=>{
 it('accepts the contract and rejects unknown fields, CRLF, short Unicode text and honeypot',()=>{
  expect(parseEnquiry(valid).success).toBe(true);
  expect(parseEnquiry({...valid,admin:true}).success).toBe(false);
  expect(parseEnquiry({...valid,email:'a@example.com\nBcc: other@example.com'}).success).toBe(false);
  expect(parseEnquiry({...valid,message:'😀'.repeat(19)}).success).toBe(false);
  expect(parseEnquiry({...valid,message:'😀'.repeat(20)}).success).toBe(true);
  expect(parseEnquiry({...valid,website:'bot'}).success).toBe(false);
  expect(parseEnquiry({...valid,submissionId:'not-a-uuid'}).success).toBe(false);
 });
 it('keeps one local receipt for matching requests and rejects changed bytes',async()=>{
  let now=0;const fixture=fixtureReceiver(()=>now);const value=parseEnquiry(valid).data!;const bytes=JSON.stringify(value);
  const [a,b]=await Promise.all([fixture.receive(value,bytes),fixture.receive(value,bytes)]);
  expect(a).toEqual(b);expect(fixture.count()).toBe(1);expect(fixture.inspect(value.submissionId)).toEqual(a);
  await expect(fixture.receive(value,bytes+' ')).rejects.toMatchObject({kind:'conflict'});
  now=24*60*60*1000+1;expect(fixture.inspect(value.submissionId)).toBeUndefined();expect(fixtureReceiver().count()).toBe(0);
  await fixture.receive(value,bytes);expect(fixture.count()).toBe(1);
 });
 it('sends the fixed provider schema and idempotency key through a controlled transport',async()=>{
  const transport=vi.fn(async(_url:string,request:any)=>new Response(JSON.stringify({id:'provider-123'}),{status:200}));
  const receiver=resendReceiver({key:'test-key',from:'verified@example.org',to:'inbox@example.org',transport:transport as any});
  const receipt=await receiver(parseEnquiry(valid).data!,JSON.stringify(valid));expect(receipt).toEqual({status:'accepted',receiptId:'provider-123',mode:'resend'});
  expect(transport).toHaveBeenCalledOnce();const [url,request]=transport.mock.calls[0];expect(url).toBe('https://api.resend.com/emails');expect(request.headers['Idempotency-Key']).toBe(`enquiry/${valid.submissionId}`);
  const payload=JSON.parse(request.body);expect(payload).toMatchObject({from:'verified@example.org',to:['inbox@example.org'],reply_to:'synthetic@example.com'});expect(payload.text).toContain(valid.message);
 });
 it('coalesces provider concurrency and limits uncertain retry to 23 hours',async()=>{
  const value=parseEnquiry(valid).data!;let now=0;let finish:(response:Response)=>void=()=>{};
  const calls:any[]=[];const transport=vi.fn((_url:string,request:any)=>{calls.push(request);return new Promise<Response>(resolve=>{finish=resolve})});
  const receiver=resendReceiver({key:'x',from:'a',to:'b',transport:transport as any,now:()=>now});
  const first=receiver(value,JSON.stringify(value));await expect(receiver(value,JSON.stringify(value))).rejects.toMatchObject({kind:'pending'});
  expect(transport).toHaveBeenCalledOnce();finish(new Response('broken',{status:200}));await expect(first).rejects.toMatchObject({kind:'uncertain'});
  now=22*60*60*1000;const retry=receiver(value,JSON.stringify(value));expect(transport).toHaveBeenCalledTimes(2);
  expect(calls[1].body).toBe(calls[0].body);expect(calls[1].headers['Idempotency-Key']).toBe(calls[0].headers['Idempotency-Key']);
  finish(new Response('bad gateway',{status:500}));await expect(retry).rejects.toMatchObject({kind:'uncertain'});
  now=23*60*60*1000+1;await expect(receiver(value,JSON.stringify(value))).rejects.toMatchObject({kind:'unavailable'});expect(transport).toHaveBeenCalledTimes(2);
  await expect(receiver({...value,message:'Different synthetic message content.'},JSON.stringify({...value,message:'Different synthetic message content.'}))).rejects.toMatchObject({kind:'conflict'});
 });
 it('treats malformed success and ambiguous failure as uncertain; disabled mode never sends',async()=>{
  const value=parseEnquiry(valid).data!;
  await expect(disabledReceiver(value,'')).rejects.toMatchObject({kind:'unavailable'});
  await expect(resendReceiver({key:'x',from:'a',to:'b',transport:async()=>new Response('{}',{status:200})})(value,'')).rejects.toMatchObject({kind:'uncertain'});
  await expect(resendReceiver({key:'x',from:'a',to:'b',transport:async()=>{throw Error('offline')}})(value,'')).rejects.toMatchObject({kind:'uncertain'});
 });
});
