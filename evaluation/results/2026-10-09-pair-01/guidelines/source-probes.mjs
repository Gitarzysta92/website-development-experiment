import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const root = path.dirname(new URL(import.meta.url).pathname);
const snapshots = path.resolve(root, '../snapshots');
const out = path.join(root, 'evidence');
const fixtures = path.join(root, 'fixtures');
fs.mkdirSync(out, { recursive:true });
fs.mkdirSync(fixtures, { recursive:true });
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const results = [];

const a = path.join(fixtures, 'A');
if (fs.existsSync(a)) throw new Error('Fixture already exists; preserve previous evidence.');
fs.mkdirSync(a);
for (const item of ['src','content','tests','scripts','public','package.json','tsconfig.json','vitest.config.ts'])
  fs.cpSync(path.join(snapshots,'A',item), path.join(a,item), {recursive:true});
fs.symlinkSync(path.join(snapshots,'A/node_modules'),path.join(a,'node_modules'),'dir');
const {fingerprint,eligible,assertPublication} = await import(pathToFileURL(path.join(a,'src/content/publication.mjs')));
const records = [];
for (const locale of ['en','pl']) for (const name of fs.readdirSync(path.join(a,'content/pages',locale))) {
  if (!name.endsWith('.json')) continue;
  const file = path.join(a,'content/pages',locale,name);
  const record = JSON.parse(fs.readFileSync(file));
  record.editorialState = 'published';
  const stamp = fingerprint(record);
  record.reviews = {facts:stamp,language:stamp,assets:stamp};
  records.push(record);
  fs.writeFileSync(file,JSON.stringify(record,null,2));
}
const approval = {origin:'https://example.test',privacyApproved:true,receiverApproved:true,assetsApproved:true};
const gatePasses = () => {try {assertPublication(records,approval);return true;}catch{return false;}};
const before = gatePasses();
const diagramPath = path.join(a,'src/templates/aifield-ai/diagram.json');
const oldDiagram = fs.readFileSync(diagramPath);
const diagram = JSON.parse(oldDiagram);
diagram.en[0].description = 'Synthetic evaluation mutation: changed diagram content after review.';
fs.writeFileSync(diagramPath,JSON.stringify(diagram,null,2));
results.push({id:'A-approval-media-binding',fixtureOnly:true,beforeGatePass:before,afterGatePass:gatePasses(),
  beforeDiagramHash:hash(oldDiagram),afterDiagramHash:hash(fs.readFileSync(diagramPath)),
  affectedPageStillEligible:eligible(records.find(r=>r.id==='aifield-ai'&&r.locale==='en')),
  observation:'The rendered diagram changes, but the actual publication gate reads record fingerprints and approval booleans only; it does not bind this dependency to review.'});
fs.writeFileSync(diagramPath,oldDiagram);
const approvalPath=path.join(a,'synthetic-approval.json');
fs.writeFileSync(approvalPath,JSON.stringify(approval));
const check=spawnSync(process.execPath,['scripts/check-content.mjs'],{
  cwd:a,encoding:'utf8',env:{...process.env,SITE_PROFILE:'published',SITE_ORIGIN:approval.origin,PUBLICATION_APPROVAL_FILE:approvalPath},
});
fs.writeFileSync(path.join(out,'A-approved-content-check.log'),check.stdout+check.stderr);
results.push({id:'A-approved-content-check',fixtureOnly:true,command:'node scripts/check-content.mjs',exitCode:check.status,
  approvedRecords:records.length,gateDirectlyAcceptsApprovedFixture:gatePasses(),
  observation:'The documented build prerequisite executes tests that require every actual record to remain draft/unreviewed. The approved fixture therefore fails before publication can proceed.'});

const b=path.join(fixtures,'B');
if(fs.existsSync(b))throw new Error('Fixture already exists; preserve previous evidence.');
fs.mkdirSync(b);
for(const item of ['src','public','build.mjs','package.json'])fs.cpSync(path.join(snapshots,'B',item),path.join(b,item),{recursive:true});
fs.symlinkSync(path.join(snapshots,'B/node_modules'),path.join(b,'node_modules'),'dir');
const buildEnv={...process.env,CONTENT_APPROVED:'true',SITE_INDEXABLE:'true',SITE_ORIGIN:'https://example.test'};
const build=()=>spawnSync(process.execPath,['build.mjs'],{cwd:b,encoding:'utf8',env:buildEnv});
const beforeBuild=build();
const renderPath=path.join(b,'src/render.mjs');
const oldRender=fs.readFileSync(renderPath,'utf8');
const changed=oldRender.replace('Engineering<br><span>light.</span> Creating<br>possibility.','Synthetic evaluation text changed after approval.');
if(changed===oldRender)throw new Error('Mutation target not found.');
fs.writeFileSync(renderPath,changed);
const afterBuild=build();
const afterHtml=fs.readFileSync(path.join(b,'dist/en/index.html'),'utf8');
fs.writeFileSync(path.join(out,'B-approval-reuse.log'),beforeBuild.stdout+beforeBuild.stderr+afterBuild.stdout+afterBuild.stderr);
results.push({id:'B-approval-revision-binding',fixtureOnly:true,beforeExitCode:beforeBuild.status,afterExitCode:afterBuild.status,
  changedContentRendered:afterHtml.includes('Synthetic evaluation text changed after approval.'),
  indexableAfterChange:afterHtml.includes('content="index,follow"'),
  observation:'The same CONTENT_APPROVED/SITE_INDEXABLE booleans generate an indexable artifact after authored content changes. No revision-bound approval or invalidation exists.'});
fs.writeFileSync(renderPath,oldRender);

fs.writeFileSync(path.join(out,'source-probes.json'),JSON.stringify({scope:'Disposable local fixtures only; no original/snapshot edits, no deployment, no real approvals or external sends.',results},null,2));
console.log(JSON.stringify(results,null,2));
