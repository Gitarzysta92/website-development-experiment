import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const port = Number(process.env.PORT || 3000);
const receiver = process.env.ENQUIRY_ENDPOINT || '';
const receiverUrl = receiver ? new URL(receiver) : null;
if (receiverUrl && receiverUrl.protocol !== 'https:' && !['localhost','127.0.0.1'].includes(receiverUrl.hostname)) throw Error('ENQUIRY_ENDPOINT must use HTTPS, except localhost');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml'};
const redirects = new Map([['/','/en/'],['/artisense-module/','/pl/projekty/artisense/'],['/about/','/pl/o-nas/'],['/partners/','/pl/wspolpraca/'],['/contact/','/pl/kontakt/']]);
const limits = new Map();
const json = (res,status,data) => {res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
const fixed = (res,status,body) => {res.writeHead(status,{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'});res.end(body);};
const missing = (res,path) => {
  const pl = path.startsWith('/pl/');
  const lang = pl ? 'pl' : 'en';
  const title = pl ? 'Nie znaleziono strony' : 'Page not found';
  const intro = pl ? 'Ten adres nie prowadzi do strony Artifactory.' : 'This address does not lead to an Artifactory page.';
  const links = pl ? [['/pl/','Strona główna'],['/pl/projekty/','Projekty'],['/pl/kontakt/','Kontakt']] : [['/en/','Home'],['/en/projects/','Projects'],['/en/contact/','Contact']];
  res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
  res.end(`<!doctype html><html lang="${lang}"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} | Artifactory</title><link rel="stylesheet" href="/assets/style.css"><main class="shell" style="padding-block:12vh"><p class="eyebrow">404 / ARTIFACTORY</p><h1 style="font:normal clamp(48px,7vw,80px)/1.1 Georgia,serif;letter-spacing:-.05em">${title}</h1><p>${intro}</p><nav aria-label="${pl?'Przydatne strony':'Useful pages'}" style="display:flex;gap:24px;flex-wrap:wrap;margin-top:38px">${links.map(([href,label])=>`<a class="text-link" href="${href}">${label} ↗</a>`).join('')}</nav></main></html>`);
};
const valid = d => d && typeof d === 'object' && ['investment','partnership','demo','general'].includes(d.type) && ['', 'artisense','aifield'].includes(d.project || '') && typeof d.email === 'string' && d.email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) && typeof d.message === 'string' && d.message.trim().length >= 10 && d.message.length <= 5000 && ['name','organization'].every(k => d[k] === undefined || (typeof d[k] === 'string' && d[k].length <= 120));
const server = createServer(async (req,res) => {
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options','DENY');
  const url = new URL(req.url || '/',`http://${req.headers.host || 'localhost'}`);
  let path = url.pathname;
  if (redirects.has(path)) { res.writeHead(308,{Location:redirects.get(path)});res.end();return; }
  if (path === '/api/enquiries/status' && req.method === 'GET') return json(res,200,{available:Boolean(receiverUrl)});
  if (path === '/api/enquiries' && req.method === 'POST') {
    if (!receiverUrl) return json(res,503,{status:'unavailable'});
    const ip = req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const previous = limits.get(ip) || [];
    const recent = previous.filter(t => now-t < 60_000);
    if (recent.length >= 5) return json(res,429,{status:'rejected'});
    recent.push(now); limits.set(ip,recent);
    let body='';
    for await (const chunk of req) {body+=chunk;if(body.length>7000)return json(res,413,{status:'rejected'});}
    let data; try {data=JSON.parse(body);} catch {return json(res,400,{status:'rejected'});}
    if (!valid(data)) return json(res,400,{status:'rejected'});
    try {
      const outbound = await fetch(receiverUrl,{method:'POST',headers:{'Content-Type':'application/json',...(process.env.ENQUIRY_TOKEN?{'Authorization':`Bearer ${process.env.ENQUIRY_TOKEN}`}:{})},body:JSON.stringify({type:data.type,project:data.project || '',name:data.name || '',organization:data.organization || '',email:data.email,message:data.message}),signal:AbortSignal.timeout(10_000),redirect:'manual'});
      if (outbound.status>=200 && outbound.status<300) return json(res,200,{status:'accepted'});
      return json(res,502,{status:'rejected'});
    } catch {return json(res,504,{status:'uncertain'});}
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') return fixed(res,405,'Method not allowed');
  if (path.includes('\0') || path.includes('\\')) return fixed(res,400,'Bad request');
  if (!path.endsWith('/') && !extname(path)) {res.writeHead(308,{Location:path+'/'+url.search});res.end();return;}
  let decoded;
  try { decoded = decodeURIComponent(path); } catch { return fixed(res,400,'Bad request'); }
  const target = resolve(join(root,decoded,path.endsWith('/')?'index.html':''));
  if (!target.startsWith(root+'/')) return fixed(res,403,'Forbidden');
  try {
    const info=await stat(target);
    if (!info.isFile()) throw Error('not file');
    const bytes=await readFile(target);
    res.writeHead(200,{'Content-Type':mime[extname(target)]||'application/octet-stream','Cache-Control':path.startsWith('/assets/')?'public, max-age=3600':'no-store'});
    res.end(req.method==='HEAD'?undefined:bytes);
  } catch {missing(res,path);}
});
server.listen(port,'127.0.0.1',()=>console.log(`Artifactory local server: http://127.0.0.1:${port}`));
