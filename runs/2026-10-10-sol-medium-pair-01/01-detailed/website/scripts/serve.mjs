import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
process.env.ASTRO_NODE_AUTOSTART='disabled';
const {handler}=await import('../dist/server/entry.mjs');
if(process.env.HOST&&!['127.0.0.1','localhost','::1'].includes(process.env.HOST))throw new Error('Preview host must be loopback.');
const host='127.0.0.1';
const port=Number(process.env.PORT||4321);
if(process.env.AF_PROFILE==='published')throw new Error('No approved published records or live release prerequisites.');
if(process.env.AF_RECEIVER==='resend'&&process.env.AF_ENABLE_LIVE_SEND==='approved')throw new Error('Real external sending is outside the local experiment.');
const inlineHashes=new Set();
function scan(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())scan(file);else if(file.endsWith('.html')){const html=fs.readFileSync(file,'utf8');for(const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)){if(match[1].trim())inlineHashes.add(`'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`)}}}}
scan(new URL('../dist/client/',import.meta.url).pathname);
const csp=`default-src 'self'; script-src 'self' ${[...inlineHashes].join(' ')}; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'`;
const server=http.createServer((req,res)=>{
 const authority=req.headers.host||'';
 if(!/^((127\.0\.0\.1)|(localhost))(:\d+)?$/.test(authority)){res.writeHead(403);res.end('Loopback preview only');return}
 if(req.url?.startsWith('/api/enquiries?')||req.url==='/api/enquiries')req.url=req.url.replace('/api/enquiries','/api/enquiries/');
 const path=(req.url||'/').split('?')[0];
 const html=!path.startsWith('/_astro/')&&!['/robots.txt','/sitemap.xml','/favicon.svg'].includes(path)&&!path.startsWith('/media/');
 res.setHeader('X-Content-Type-Options','nosniff');
 res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
 res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');
 res.setHeader('Content-Security-Policy',csp);
 if(html){res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('Cache-Control','no-store')}
 const original=res.setHeader.bind(res);
 res.setHeader=(name,value)=>original(name.toLowerCase()==='cache-control'&&html?'Cache-Control':name,name.toLowerCase()==='cache-control'&&html?'no-store':value);
 if(path==='/api/enquiries/'&&req.method==='POST'&&!String(req.headers['content-type']||'').startsWith('application/json')){res.writeHead(415,{'Content-Type':'application/json'});res.end(JSON.stringify({status:'rejected',error:'media'}));return}
 handler(req,res);
});
server.listen(port,host,()=>console.log(`Artifactory local preview: http://${host}:${port}`));
