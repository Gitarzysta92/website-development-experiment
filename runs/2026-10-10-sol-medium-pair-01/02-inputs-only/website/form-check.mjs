import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';

let received;
const receiver = createServer(async (req,res) => {
  let body = '';
  for await (const chunk of req) body += chunk;
  received = JSON.parse(body);
  res.writeHead(202).end();
});
receiver.listen(0,'127.0.0.1');
await once(receiver,'listening');
const receiverPort = receiver.address().port;
const app = spawn(process.execPath,['server.mjs'],{cwd:new URL('.',import.meta.url),env:{...process.env,PORT:'43112',ENQUIRY_ENDPOINT:`http://127.0.0.1:${receiverPort}/`},stdio:'ignore'});
const base = 'http://127.0.0.1:43112';
try {
  let ready = false;
  for (let i=0;i<30;i++) {
    try { const response=await fetch(base+'/api/enquiries/status'); ready=(await response.json()).available; if(ready)break; } catch {}
    await new Promise(r=>setTimeout(r,100));
  }
  if (!ready) throw Error('Form server did not start');
  const payload = {type:'investment',project:'aifield',email:'local-test@example.test',message:'Local integration test only'};
  const accepted = await fetch(base+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  if (accepted.status!==200 || received.email!==payload.email) throw Error('Receiver acceptance failed');
  const rejected = await fetch(base+'/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...payload,email:'invalid'})});
  if (rejected.status!==400) throw Error('Validation failed');
  console.log('Form integration accepted a local test enquiry and rejected invalid input.');
} finally {
  app.kill();
  receiver.close();
}
