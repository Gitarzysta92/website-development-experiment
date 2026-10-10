import {z} from 'zod';
import {register} from './index';
const section=z.object({id:z.string(),title:z.string(),paragraphs:z.array(z.string()).min(1)});
const record=z.object({id:z.string(),locale:z.enum(['en','pl']),title:z.string().min(1),description:z.string().min(1),eyebrow:z.string(),lead:z.string().min(1),sections:z.array(section).min(3),related:z.array(z.string()),stage:z.string(),pageType:z.enum(['project','company']),sourceReferences:z.array(z.string()).min(1),sourceRevision:z.string(),editorialState:z.enum(['draft','reviewed','published']),modifiedAt:z.string()});
const files=import.meta.glob('../../content/pages/*/*.json',{eager:true,import:'default'});
for(const value of Object.values(files)){
  const parsed=record.parse(value);
  register({id:parsed.id,locale:parsed.locale,title:parsed.title,description:parsed.description,eyebrow:parsed.eyebrow,lead:parsed.lead,sections:parsed.sections,related:parsed.related,stage:parsed.stage});
}
