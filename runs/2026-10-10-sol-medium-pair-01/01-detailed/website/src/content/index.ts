import { z } from 'zod';
import { routes, type Locale } from '../navigation';
const section=z.object({id:z.string().regex(/^[a-z0-9-]+$/),heading:z.string().min(2),body:z.array(z.string().min(40)).min(1)});
const schema=z.object({id:z.string(),locale:z.enum(['en','pl']),title:z.string().min(2),description:z.string().min(30),eyebrow:z.string(),lead:z.string().min(50),sections:z.array(section).min(2),related:z.array(z.string()),editorialState:z.literal('draft'),sourceRevision:z.string(),sourceRefs:z.array(z.string()).min(1),modified:z.string()});
const files=import.meta.glob('../../content/pages/{en,pl}/*.json',{eager:true,import:'default'});
const records=Object.values(files).map(x=>schema.parse(x));
export function allContent(){
  if(process.env.AF_PROFILE==='published')throw new Error('Publication blocked: real content and translation reviews, asset permissions, privacy, receiver and origin are not approved.');
  for(const r of routes)for(const locale of ['en','pl'] as const){if(!records.find(x=>x.id===r.id&&x.locale===locale))throw new Error(`Missing ${r.id}/${locale}`);}
  if(records.length!==34)throw new Error('Expected 34 content records');
  for(const x of records)for(const id of x.related)if(!routes.some(r=>r.id===id))throw new Error(`Unknown related page ${id}`);
  return records;
}
export function publicPage(id:string,locale:Locale){const record=allContent().find(r=>r.id===id&&r.locale===locale);if(!record)throw new Error(`Missing ${id}/${locale}`);const {title,description,eyebrow,lead,sections,related}=record;return {title,description,eyebrow,lead,sections,related};}
