import {it,expect} from 'vitest';
import {reviewCurrent,translationCurrent} from '../src/content/review';
import {readFileSync,readdirSync} from 'node:fs';import {createHash} from 'node:crypto';
const hash=(value:string)=>createHash('sha256').update(value).digest('hex');
it('invalidates fact, asset and localized language review on changes',()=>{
 expect(reviewCurrent('reviewed','before','after')).toBe('pending');
 expect(reviewCurrent('reviewed','same','same')).toBe('reviewed');
 expect(translationCurrent('reviewed','same','same','old-fact','new-fact')).toBe('pending');
 expect(translationCurrent('reviewed','old-pl','new-pl','same','same')).toBe('pending');
});
it('every page candidate invalidates its own review when edited',()=>{
 for(const locale of ['en','pl'])for(const file of readdirSync(`content/pages/${locale}`)){
  const raw=readFileSync(`content/pages/${locale}/${file}`,'utf8'),record=JSON.parse(raw);
  const edited=JSON.stringify({...record,lead:record.lead+' Editorial candidate change.'});
  expect(reviewCurrent('reviewed',hash(raw),hash(edited))).toBe('pending');
  expect(translationCurrent('reviewed',hash(raw),hash(edited),'same-fact','same-fact')).toBe('pending');
 }
 const media=readFileSync('content/assets/registry.json','utf8');expect(reviewCurrent('reviewed',hash(media),hash(media+'caption change'))).toBe('pending');
});
