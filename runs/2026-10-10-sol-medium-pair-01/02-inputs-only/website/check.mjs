import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { routes, pathFor, copy } from './content.mjs';
const root = new URL('./dist/', import.meta.url).pathname;
let checked = 0;
for (const id of Object.keys(routes)) for (const lang of ['en','pl']) {
  const path = join(root,pathFor(id,lang),'index.html');
  const html = await readFile(path,'utf8');
  if (!html.includes(`<html lang="${lang}">`)) throw Error(`Wrong language: ${path}`);
  if (!html.includes(`<h1>${copy[lang].pages[id].title}</h1>`)) throw Error(`Missing title: ${path}`);
  for (const other of ['en','pl']) if (!html.includes(`hreflang="${other}" href="https://artifactory.tech${pathFor(id,other)}"`)) throw Error(`Missing language pair: ${path}`);
  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = match[1].replaceAll('&amp;','&');
    const target = join(root,href,href.endsWith('/')?'index.html':'');
    try {await stat(target);} catch {throw Error(`Broken link ${href} in ${path}`);}
  }
  checked++;
}
const sitemap = await readFile(join(root,'sitemap.xml'),'utf8');
if ((sitemap.match(/<loc>/g)||[]).length !== 34) throw Error('Sitemap route count mismatch');
console.log(`Checked ${checked} localized pages, internal links, language pairs, and sitemap.`);
