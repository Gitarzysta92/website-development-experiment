import { test, expect } from 'vitest';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { validateRecords, publicView, fingerprint, eligible, editPair, seed, assertPublication, translationState, readRecords, type PageRecord } from '../src/content/index';
import { routes, routeFor, contactHref, ancestors, projectEntries } from '../src/navigation/index';
import { metadata, sitemap, safeAsset } from '../src/metadata/index';
const record=(locale:'en'|'pl'='en'):PageRecord=>({id:'home',locale,type:'home',title:'Synthetic <title>',description:'A private synthetic record for checking the real public projection.',eyebrow:'Fixture',lead:'A sufficiently long synthetic introduction for this contract.',sections:[{id:'scope',title:'Scope',paragraphs:['Test narrative.']}],relatedIds:[],project:null,sourceReferences:['private source'],sourceRevision:'fixture-1',editorialState:'draft',modifiedAt:'2026-10-09T00:00:00.000Z',reviews:{facts:null,language:null,assets:null},privateNotes:'PRIVATE_SENTINEL'});
test('canonical register and real authored records',()=>{expect(routes).toHaveLength(17);expect(new Set(routes.flatMap(r=>Object.values(r.paths))).size).toBe(34);expect(validateRecords(readRecords())).toBeDefined();for(const r of routes)for(const locale of ['en','pl'] as const)expect(routeFor(r.id,locale)).toMatch(new RegExp(`^/${locale}/`));expect(ancestors('aifield-ai')).toEqual(['home','projects','aifield']);expect(contactHref('pl','demo','aifield')).toBe('/pl/kontakt/?intent=demo&project=aifield');});
test('invalid, missing, duplicate, reserved and unknown relationships fail',()=>{for(const list of [[record()],[record(),record('pl'),record()], [{...record(),id:'api'},record('pl')],[{...record(),relatedIds:['missing']},record('pl')]])expect(()=>validateRecords(list)).toThrow();expect(translationState([record()],'home','pl')).toEqual({available:false,explanation:'Tłumaczenie jest niedostępne.'});});
test('0,1,many,reordered project records retain stable independent identity',()=>{expect(projectEntries([])).toEqual([]);expect(projectEntries([{id:'x'}])).toHaveLength(1);expect(projectEntries([{id:'c',order:2},{id:'a',order:0},{id:'b',order:1}]).map(x=>x.id)).toEqual(['a','b','c']);});
test('private projection, assets and publication metadata',()=>{const view=publicView(record());expect(JSON.stringify(view)).not.toContain('PRIVATE_SENTINEL');expect(JSON.stringify(view)).not.toContain('sourceReferences');expect(metadata(view,'https://example.test','published').alternates).toHaveLength(3);expect(safeAsset('javascript:alert(1)')).toBe(false);expect(safeAsset('//external')).toBe(false);expect(sitemap([record()],'https://example.test','preview')).toEqual([]);expect(()=>assertPublication([record()],{})).toThrow();const approved={...record(),editorialState:'published' as const};const stamp=fingerprint(approved);approved.reviews={facts:stamp,language:stamp,assets:stamp};expect(eligible(approved)).toBe(true);expect(sitemap([approved],'https://example.test','published')).toEqual(['https://example.test/en/']);});
test('edits invalidate appropriate reviews, repeated seed preserves authored edits, restore matches',()=>{const pair=[record(),record('pl')].map(r=>({...r,reviews:{facts:fingerprint(r),language:fingerprint(r),assets:fingerprint(r)}}));const changed=editPair(pair,'home','en',{lead:'A changed factual introduction requiring both translations to be reviewed.'},'facts');expect(changed.every(r=>Object.values(r.reviews).every(v=>v===null))).toBe(true);const wording=editPair(pair,'home','pl',{title:'Nowy tytuł'},'language');expect(wording[0].reviews).toEqual(pair[0].reviews);expect(wording[1].reviews.language).toBeNull();const media=editPair(pair,'home','en',{visual:'field'},'media');expect(media[0].reviews.assets).toBeNull();const dir=mkdtempSync(`${tmpdir()}/af-content-`);const file=`${dir}/record.json`;expect(seed(file,record())).toBe(true);const old=readFileSync(file,'utf8');expect(seed(file,{...record(),title:'Overwrite'})).toBe(false);expect(readFileSync(file,'utf8')).toBe(old);expect(fingerprint(JSON.parse(old))).toBe(fingerprint(record()));rmSync(dir,{recursive:true});});

test('complete authored contract, every page edit and asset inventory',()=>{
 const records=validateRecords(readRecords(),true);
 expect(records).toHaveLength(34);
 for(const record of records){
  expect(record.reviews).toEqual({facts:null,language:null,assets:null});
  expect(record.editorialState).toBe('draft');
  const other=records.find(r=>r.id===record.id&&r.locale!==record.locale)!;
  expect(record.sections.map(s=>s.id)).toEqual(other.sections.map(s=>s.id));
  const changed=editPair(records,record.id,record.locale,{lead:record.lead+' A synthetic edit.'},'facts');
  expect(changed.filter(r=>r.id===record.id).every(r=>Object.values(r.reviews).every(v=>v===null))).toBe(true);
  expect(changed.filter(r=>r.id!==record.id)).toEqual(records.filter(r=>r.id!==record.id));
  expect(fingerprint(changed.find(r=>r.id===record.id&&r.locale===record.locale)!)).not.toBe(fingerprint(record));
  const missing=structuredClone(records);missing.find(r=>r.id===record.id&&r.locale===record.locale)!.sections.pop();
  expect(()=>validateRecords(missing,true)).toThrow();
 }
 for(const route of routes)for(const path of Object.values(route.paths))expect(path).toMatch(/^\/(en|pl)\/(?:[a-z0-9-]+\/)*$/);
 const assets=JSON.parse(readFileSync('content/assets/registry.json','utf8'));
 for(const asset of assets){expect(readFileSync(asset.file).length).toBeGreaterThan(0);expect(asset.publication).toBe('unreviewed');expect(asset.evidence).toBe(false);expect(asset.file).not.toMatch(/inputs|compiled|knowledge/);}
});
test('isolated approved publication fixture passes while actual drafts cannot',()=>{
 const actual=validateRecords(readRecords(),true);
 const approved=actual.map(r=>{const copy={...r,editorialState:'published' as const};const hash=fingerprint(copy);return {...copy,reviews:{facts:hash,language:hash,assets:hash}};});
 const config={origin:'https://example.test',privacyApproved:true,receiverApproved:true,assetsApproved:true};
 expect(()=>assertPublication(approved,config)).not.toThrow();
 expect(()=>assertPublication(actual,config)).toThrow();
 expect(()=>assertPublication(approved,{...config,origin:'https://example.test/path'})).toThrow();
 expect(sitemap(approved,config.origin,'published')).toHaveLength(34);
 for(const r of approved){const m=metadata(publicView(r),config.origin,'published');expect(m.canonical).toBe(config.origin+routeFor(r.id as any,r.locale));expect(m.alternates.find(a=>a.lang==='x-default')?.href).toBe(config.origin+routeFor(r.id as any,'en'));}
});
