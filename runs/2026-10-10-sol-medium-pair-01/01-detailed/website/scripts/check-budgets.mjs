import fs from 'node:fs';import zlib from 'node:zlib';import routes from '../../compiled/routes.json' with {type:'json'};
const results=[];for(const r of routes.routes)for(const locale of ['en','pl']){
 const path=r.paths[locale];const file=`dist/client${path}index.html`;const html=fs.readFileSync(file,'utf8');
 const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]);let js=scripts.reduce((n,x)=>n+zlib.gzipSync(x).length,0),css=0,total=Buffer.byteLength(html);
 for(const href of [...html.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(x=>x[1])){const bytes=fs.readFileSync(`dist/client${href}`);css+=zlib.gzipSync(bytes).length;total+=bytes.length}
 const pass=js<=60*1024&&css<=100*1024&&total<=1024*1024;results.push({path,jsGzip:js,cssGzip:css,initialBytes:total,pass});
}
fs.writeFileSync('artifacts/budgets.json',JSON.stringify(results,null,2));console.log(`${results.filter(x=>x.pass).length}/${results.length} routes within budgets; maximum JS ${Math.max(...results.map(x=>x.jsGzip))} B gzip, CSS ${Math.max(...results.map(x=>x.cssGzip))} B gzip, initial bytes ${Math.max(...results.map(x=>x.initialBytes))}`);if(results.some(x=>!x.pass))process.exitCode=1;
