import {it,expect,vi} from 'vitest';
import {createEnquiryHandler} from '../src/features/enquiry/server/http';
import {ReceiverError,fixtureReceiver} from '../src/features/enquiry/server';
const base='http://127.0.0.1:4321';
const valid={intent:'general',email:'synthetic@example.com',message:'A synthetic HTTP handler test message.',locale:'en',submissionId:'5616a984-4675-4c43-80a9-ccfc34a36323',website:''};
const request=(body:string,headers:Record<string,string>={})=>new Request(base+'/api/enquiries',{method:'POST',headers:{Host:'127.0.0.1:4321',Origin:base,'Content-Type':'application/json',...headers},body});
it('rejects invalid HTTP payloads without invoking receiver',async()=>{
 const receiver=vi.fn(async()=>({status:'accepted',receiptId:'x',mode:'fixture'} as const));const handler=createEnquiryHandler(()=>receiver);
 expect((await handler(request('{bad'),'a')).status).toBe(400);
 expect((await handler(request(JSON.stringify({...valid,extra:'private'})),'b')).status).toBe(422);
 expect((await handler(request('x'.repeat(32769)),'c')).status).toBe(413);
 expect((await handler(request(JSON.stringify(valid),{Origin:'http://wrong.example'}),'d')).status).toBe(403);
 expect((await handler(request(JSON.stringify(valid),{'Content-Type':'text/plain'}),'e')).status).toBe(415);
 expect(receiver).not.toHaveBeenCalled();
});
it('maps unavailable, uncertain and pending without private diagnostics',async()=>{
 for(const [kind,status] of [['unavailable',503],['uncertain',504],['pending',409],['conflict',409]] as const){
  const handler=createEnquiryHandler(()=>async()=>{throw new ReceiverError(kind)});
  const response=await handler(request(JSON.stringify(valid)),kind);expect(response.status).toBe(status);
  const text=await response.text();expect(text).not.toContain(valid.email);expect(text).not.toContain(valid.message);expect(response.headers.get('cache-control')).toBe('no-store');
 }
});
it('throttles on direct peer and reports a retry delay',async()=>{
 let time=0;const handler=createEnquiryHandler(()=>async()=>({status:'accepted',receiptId:'local',mode:'fixture'}),()=>time);
 for(let i=0;i<5;i++)expect((await handler(request(JSON.stringify(valid)),'peer')).status).toBe(200);
 const limited=await handler(request(JSON.stringify(valid)),'peer');expect(limited.status).toBe(429);expect(limited.headers.get('retry-after')).toBe('60');
 time=60001;expect((await handler(request(JSON.stringify(valid)),'peer')).status).toBe(200);
});

it('independently inspects one receipt after an HTTP handler submission',async()=>{
 const fixture=fixtureReceiver();const handler=createEnquiryHandler(()=>fixture.receive);const result=await handler(request(JSON.stringify(valid)),'synthetic-peer');expect(result.status).toBe(200);const body=await result.json();expect(fixture.inspect(valid.submissionId)).toEqual(body);expect(fixture.count()).toBe(1);
});
