import { createServer } from 'node:http';
import {createHash} from 'node:crypto';
import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const profile=process.env.SITE_PROFILE??'preview';
const host=process.env.HOST??'127.0.0.1';
const port=Number(process.env.PORT??4321);
if(profile==='preview'&&!['127.0.0.1','localhost','::1'].includes(host))throw Error('Preview requires a loopback host');
if((process.env.ENQUIRY_MODE??'fixture')==='fixture'&&(profile!=='preview'||!['127.0.0.1','localhost','::1'].includes(host)))throw Error('Fixture requires loopback preview');
if(profile==='published')throw Error('Published build needs approved content and release configuration');
process.env.ASTRO_NODE_AUTOSTART='disabled';
const {handler}=await import('../../dist/server/entry.mjs');
function files(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(join(dir,e.name)):[join(dir,e.name)])}
const hashes=new Set();for(const file of files('dist/client').filter(f=>f.endsWith('.html'))){const html=readFileSync(file,'utf8');for(const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)){if(match[1].trim())hashes.add(`'sha256-${createHash('sha256').update(match[1]).digest('base64')}'`)}}
const knownPaths=new Set(JSON.parse(readFileSync('content-routes.json','utf8')).routes.flatMap(route=>[route.paths.en,route.paths.pl]));
const redirects={'/':'/en/','/artisense-module/':'/pl/projekty/artisense/','/about/':'/pl/o-nas/','/partners/':'/pl/wspolpraca/','/contact/':'/pl/kontakt/'};
createServer((req,res)=>{
  const allowedHosts=new Set([`127.0.0.1:${port}`,`localhost:${port}`,`[::1]:${port}`]);
  if(!allowedHosts.has(req.headers.host)){res.writeHead(421,{'Content-Type':'text/plain','Cache-Control':'no-store'});res.end('Misdirected request');return}
  const path=new URL(req.url??'/',`http://${host}:${port}`).pathname;
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');res.setHeader('Content-Security-Policy',`default-src 'self'; script-src 'self' ${Array.from(hashes).join(' ')}; style-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'`);res.setHeader('X-Robots-Tag','noindex, nofollow');
  if(path.startsWith('/api/')||path.endsWith('/')||path.endsWith('.html'))res.setHeader('Cache-Control','no-store');
  if(redirects[path]){res.writeHead(308,{Location:redirects[path]});res.end();return}
  if(path.startsWith('/pl/')&&!knownPaths.has(path)&&path!=='/pl/404/'){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});res.end(readFileSync('dist/client/pl/404/index.html'));return}
  handler(req,res);
}).listen(port,host,()=>console.log(`Artifactory preview listening on http://${host}:${port}`));
