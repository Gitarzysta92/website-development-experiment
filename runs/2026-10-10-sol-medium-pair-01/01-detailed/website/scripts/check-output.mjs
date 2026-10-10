import fs from 'node:fs';import routes from '../../compiled/routes.json' with {type:'json'};
const fails=[];for(const r of routes.routes)for(const locale of ['en','pl']){
 const path=r.paths[locale],html=fs.readFileSync(`dist/client${path}index.html`,'utf8');
 for(const value of [`lang="${locale}"`,`hreflang="en" href="http://127.0.0.1:4321${r.paths.en}"`,`hreflang="pl" href="http://127.0.0.1:4321${r.paths.pl}"`,`hreflang="x-default" href="http://127.0.0.1:4321${r.paths.en}"`,`rel="canonical" href="http://127.0.0.1:4321${path}"`])if(!html.includes(value))fails.push(`${path}: ${value}`);
 for(const privateText of ['sourceRevision','sourceRefs','reviewedFactHash','HP-1.1','RESEND_API_KEY','project-context.md'])if(html.includes(privateText))fails.push(`${path}: leaked ${privateText}`);
 if(!html.includes('content="noindex,nofollow"'))fails.push(`${path}: no preview robots`);
}
const sitemap=fs.readFileSync('dist/client/sitemap.xml','utf8');if(sitemap.includes('<url>'))fails.push('preview sitemap includes URLs');
const files=[];function list(path){for(const e of fs.readdirSync(path,{withFileTypes:true})){const p=`${path}/${e.name}`;if(e.isDirectory())list(p);else files.push(p)}}list('dist/client');for(const p of files)if(/(?:input|compiled|guidelines|review-ledger|\.map$)/.test(p))fails.push(`sensitive path ${p}`);
fs.writeFileSync('artifacts/output-check.json',JSON.stringify({checked:34,fails},null,2));console.log(`${34-fails.length}/34 output checks passed`,fails);if(fails.length)process.exitCode=1;
