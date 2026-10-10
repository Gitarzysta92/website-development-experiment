import http from 'node:http';
import { spawn } from 'node:child_process';

const variant = process.env.RUN_VARIANT;
if (!['01-detailed', '02-inputs-only'].includes(variant)) throw new Error('Unknown run');
const publicOrigin = new URL(process.env.PREVIEW_ORIGIN);
if (publicOrigin.protocol !== 'https:' || publicOrigin.pathname !== '/' || publicOrigin.username || publicOrigin.password || publicOrigin.search || publicOrigin.hash) throw new Error('Expected an HTTPS preview origin');
const upstreamPort = variant === '01-detailed' ? 4321 : 4317;
const upstreamOrigin = `http://127.0.0.1:${upstreamPort}`;
const child = spawn(process.execPath, variant === '01-detailed' ? ['scripts/runtime/launch.mjs', 'start'] : ['server.mjs'], {
  stdio: ['ignore', 'inherit', 'inherit'],
  env: { ...process.env, HOST: '127.0.0.1', PORT: String(upstreamPort), SITE_ORIGIN: upstreamOrigin, SITE_PROFILE: 'preview', ENQUIRY_MODE: 'fixture' },
});
const server = http.createServer((req, res) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.setHeader('Cache-Control', 'no-store');
  const health = req.url === '/healthz' && ['GET', 'HEAD'].includes(req.method);
  if (!health && req.headers.host !== publicOrigin.host) {
    res.writeHead(403); res.end('Invalid preview host'); return;
  }
  const writing = !['GET', 'HEAD', 'OPTIONS'].includes(req.method);
  if (writing && req.headers.origin !== publicOrigin.origin) {
    res.writeHead(403); res.end('Invalid preview origin'); return;
  }
  const headers = { ...req.headers, host: `127.0.0.1:${upstreamPort}`, 'accept-encoding': 'identity' };
  // Keep Access credentials and untrusted proxy headers out of the experiment app.
  for (const key of Object.keys(headers)) {
    if (key.startsWith('cf-') || key.startsWith('x-forwarded-') || ['forwarded', 'authorization', 'cookie', 'connection'].includes(key)) delete headers[key];
  }
  if (headers.origin === publicOrigin.origin) headers.origin = upstreamOrigin;
  const proxy = http.request({ hostname: '127.0.0.1', port: upstreamPort, path: health ? '/en/' : req.url, method: health ? 'GET' : req.method, headers }, (upstream) => {
    if (health) {
      upstream.resume();
      res.writeHead(upstream.statusCode === 200 ? 200 : 503, { 'Content-Type': 'text/plain' });
      res.end(req.method === 'HEAD' ? undefined : 'ready');
      return;
    }
    res.statusCode = upstream.statusCode || 502;
    const html = String(upstream.headers['content-type'] || '').includes('text/html');
    for (const [key, value] of Object.entries(upstream.headers)) {
      if (value === undefined || ['connection', 'transfer-encoding', 'cache-control', 'x-robots-tag'].includes(key) || (html && ['content-length', 'etag'].includes(key))) continue;
      res.setHeader(key, key === 'location' && typeof value === 'string' ? value.replace(upstreamOrigin, publicOrigin.origin) : value);
    }
    if (html) {
      const chunks = [];
      upstream.on('data', (chunk) => chunks.push(chunk));
      upstream.on('end', () => res.end(Buffer.concat(chunks).toString('utf8').replaceAll(upstreamOrigin, publicOrigin.origin)));
    } else upstream.pipe(res);
    upstream.on('error', () => res.destroy());
  });
  proxy.setTimeout(15000, () => proxy.destroy(new Error('Upstream timeout')));
  proxy.on('error', () => { if (res.writableEnded) return; if (!res.headersSent) res.writeHead(503); res.end('Preview starting or unavailable'); });
  req.on('aborted', () => proxy.destroy());
  let bytes = 0;
  req.on('data', (chunk) => {
    bytes += chunk.length;
    if (bytes > 32768) {
      if (!res.headersSent) res.writeHead(413);
      res.end('Request too large'); proxy.destroy();
    } else if (!proxy.destroyed) proxy.write(chunk);
  });
  req.on('end', () => { if (!proxy.destroyed) proxy.end(); });
});
server.listen(Number(process.env.GATEWAY_PORT || 8080), process.env.GATEWAY_HOST || '0.0.0.0', () => console.log(`Artifactory ${variant} preview gateway ready`));
let stopping = false;
function stop() {
  if (stopping) return;
  stopping = true;
  server.close(); child.kill('SIGTERM');
  setTimeout(() => process.exit(0), 5000).unref();
}
process.on('SIGTERM', stop);
process.on('SIGINT', stop);
child.on('error', (error) => { console.error(error.message); process.exit(1); });
child.on('exit', (code) => { server.close(); process.exit(stopping ? 0 : (code || 1)); });
