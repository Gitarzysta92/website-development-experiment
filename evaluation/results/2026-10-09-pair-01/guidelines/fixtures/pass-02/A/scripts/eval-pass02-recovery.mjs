import {spawn,spawnSync} from 'node:child_process';
import {readFileSync,writeFileSync,mkdirSync,renameSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {walk,digestFiles,implementationFingerprint} from './fingerprint.mjs';
const dir='artifacts/recovery';mkdirSync(dir,{recursive:true});
const filename='content/pages/en/home.json';const original=readFileSync(filename);const baseline=digestFiles(walk('dist'));const contentBaseline=digestFiles(walk('content'));const htmlBaseline=createHash('sha256').update(readFileSync('dist/client/en/index.html')).digest('hex');
const events=[];let server;
function command(label,args,env={}){const result=spawnSync(process.execPath,args,{encoding:'utf8',env:{...process.env,...env}});writeFileSync(`${dir}/${label}.log`,result.stdout+result.stderr);return result.status;}
async function start(){server=spawn(process.execPath,['scripts/runtime/launch.mjs','start'],{stdio:'ignore'});for(let i=0;i<100;i++){try{const response=await fetch('http://127.0.0.1:4601/en/');if(response.status===200)return await response.text();}catch{}await new Promise(r=>setTimeout(r,50));}throw new Error('Recovery server did not start');}
async function stop(){if(server){const child=server;server=undefined;const ended=new Promise(resolve=>child.once('exit',resolve));child.kill('SIGTERM');await ended;}}
try{
 const before=await start();assert(before.includes('Artifactory'));
 writeFileSync(filename,'{invalid candidate');
 assert.notEqual(command('invalid-candidate',['scripts/runtime/build.mjs']),0);
 assert.equal(digestFiles(walk('dist')),baseline);
 assert.equal(await (await fetch('http://127.0.0.1:4601/en/')).text(),before);
 events.push({check:'failed candidate while server running',result:'pass',artifactUnchanged:true});
 await stop();writeFileSync(filename,original);
 const edited=JSON.parse(original);edited.lead+=' Recovery verification edit.';edited.visualCaption='Recovery verification caption: an explanatory concept.';edited.editorialState='draft';edited.reviews={facts:null,language:null,assets:null};writeFileSync(filename,JSON.stringify(edited,null,2)+'\n');
 assert.equal(command('edited-preview-build',['scripts/runtime/build.mjs']),0);
 const changed=await start();assert(changed.includes('Recovery verification edit.'));assert(changed.includes('Recovery verification caption:'));await stop();events.push({check:'record and caption edit visible in built preview',result:'pass'});
 const synthetic=`${dir}/synthetic-gate-config.json`;writeFileSync(synthetic,JSON.stringify({origin:'https://example.test',privacyApproved:true,receiverApproved:true,assetsApproved:true,fixtureOnly:true}));
 assert.notEqual(command('unapproved-published-build',['scripts/runtime/build.mjs'],{SITE_PROFILE:'published',SITE_ORIGIN:'https://example.test',ENQUIRY_MODE:'disabled',PUBLICATION_APPROVAL_FILE:synthetic}),0);events.push({check:'real drafts rejected despite isolated synthetic gate configuration',result:'pass'});
 writeFileSync(filename,original);assert.equal(command('restored-source-build',['scripts/runtime/build.mjs']),0);
 assert.equal(digestFiles(walk('content')),contentBaseline);assert.equal(createHash('sha256').update(readFileSync('dist/client/en/index.html')).digest('hex'),htmlBaseline);
 const restored=await start();assert.equal(restored,before);await stop();events.push({check:'source restore rebuild and rendered HTML identity',result:'pass'});
 renameSync('dist','.dist-recovery-selected');renameSync('.dist-previous','dist');
 try{const previous=await start();assert(previous.includes('Recovery verification edit.'));await stop();}finally{await stop();renameSync('dist','.dist-previous');renameSync('.dist-recovery-selected','dist');}
 const final=await start();assert.equal(final,before);await stop();events.push({check:'previous artifact restore/start and final artifact reselection',result:'pass'});
 writeFileSync(`${dir}/results.json`,JSON.stringify({time:new Date().toISOString(),fingerprint:implementationFingerprint(),baselineArtifact:baseline,restoredArtifact:digestFiles(walk('dist')),htmlBaseline,events},null,2));console.log(JSON.stringify(events));
}finally{await stop();writeFileSync(filename,original);}
