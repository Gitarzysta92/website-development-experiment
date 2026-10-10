import {readFileSync,existsSync} from 'node:fs';
const routes=JSON.parse(readFileSync('content-routes.json','utf8')).routes;
const paths=new Set(routes.flatMap(r=>Object.values(r.paths)));
let checked=0;for(const path of paths){const file=`dist/client${path}index.html`;if(!existsSync(file))throw Error(`Missing built page ${path}`);const html=readFileSync(file,'utf8');for(const href of html.matchAll(/href="(\/[^"#?]*)/g)){if(!paths.has(href[1])&&!existsSync(`dist/client${href[1]}`))throw Error(`${path} links to missing ${href[1]}`);checked++}}console.log(`${paths.size} routes, ${checked} local links checked`);
