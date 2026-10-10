import { spawn } from 'node:child_process';
import http from 'node:http';
import { readFileSync } from 'node:fs';
import { configuration, securityHeaders } from './config.mjs';
const config = configuration();
const dev = process.argv[2] === 'dev';
if (!dev) {const built=JSON.parse(readFileSync('dist/profile.json','utf8'));if(built.profile!==config.profile||built.origin!==config.origin)throw new Error('Build/runtime profile or origin mismatch; rebuild with matching configuration');}
const upstreamPort = config.port + 1;
const child = spawn(process.execPath, dev ? ['node_modules/astro/bin/astro.mjs','dev','--host','127.0.0.1','--port',String(upstreamPort)] : ['dist/server/entry.mjs'], { stdio:['ignore','inherit','inherit','ipc'], env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1',HOST:'127.0.0.1',PORT:String(upstreamPort),SITE_ORIGIN:config.origin,ENQUIRY_MODE:config.mode} });
child.on('message',message=>{if(process.send)process.send(message);});
const server = http.createServer((req,res) => {
 for (const [name,value] of Object.entries(securityHeaders)) res.setHeader(name,value);
 res.setHeader('Cache-Control', req.url?.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'no-store');
 if (config.profile === 'preview') res.setHeader('X-Robots-Tag','noindex, nofollow');
 if (req.headers.host !== new URL(config.origin).host) { res.writeHead(403); res.end('Invalid host'); return; }
 const path = new URL(req.url || '/', config.origin).pathname;
 if (/^\/(?:inputs|compiled|knowledge|content|docs|tests|artifacts|\.env|\.git|@fs)(?:\/|$)/.test(path)) {res.writeHead(404);res.end('Not found');return;}
 const chunks=[]; let size=0;
 req.on('data', chunk=>{size+=chunk.length;if(size<=32768)chunks.push(chunk);else if(!res.writableEnded){res.writeHead(413);res.end(JSON.stringify({status:'rejected'}));}});
 req.on('end',()=>{
 if(res.writableEnded)return;
 const headers={...req.headers}; for(const h of Object.keys(headers))if(h.startsWith('x-forwarded-') || h==='forwarded')delete headers[h];
 const proxy=http.request({hostname:'127.0.0.1',port:upstreamPort,path:req.url,method:req.method,headers},response=>{
 res.statusCode=response.statusCode || 502;
 for(const [key,value] of Object.entries(response.headers))if(value && !['cache-control','content-security-policy','x-robots-tag'].includes(key))res.setHeader(key,value);
 response.pipe(res);
 });
 proxy.on('error',()=>{if(!res.headersSent)res.writeHead(503);res.end('Local server starting or unavailable');});
 proxy.end(Buffer.concat(chunks));
 });
});
server.listen(config.port,config.host,()=>console.log(`Artifactory ${config.profile}: ${config.origin}`));
function stop(){server.close();child.kill('SIGTERM');}
process.on('SIGINT',()=>{stop();process.exit(0);});process.on('SIGTERM',()=>{stop();process.exit(0);});
child.on('exit',code=>{server.close();process.exit(code || 0);});
