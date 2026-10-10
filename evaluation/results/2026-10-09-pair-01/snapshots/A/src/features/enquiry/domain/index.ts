import { z } from 'zod';
const length=(s:string)=>Array.from(s).length;
const plain=(max:number)=>z.string().trim().refine(s=>length(s)<=max,'too_long').refine(s=>!/[\r\n]/.test(s),'invalid');
export const enquirySchema=z.object({intent:z.enum(['investment','partnership','demo','general']),email:z.string().refine(s=>!/[\r\n]/.test(s),'invalid').transform(s=>s.trim()).pipe(z.email().max(254)),message:z.string().trim().refine(s=>length(s)>=20&&length(s)<=5000,'length'),project:z.enum(['artisense','aifield']).optional(),name:plain(100).optional(),organization:plain(150).optional(),locale:z.enum(['en','pl']),submissionId:z.uuid(),website:z.literal('')}).strict();
export type Enquiry=z.infer<typeof enquirySchema>;
export type Field=keyof Enquiry;
export type Outcome={status:'accepted';receiptId:string;mode:'fixture'|'resend'}|{status:'rejected';errors?:Partial<Record<Field,string>>}|{status:'pending'|'conflict'|'unavailable'|'uncertain'|'throttled';retryAfter?:number};
export interface EnquiryReceiver{accept(request:Enquiry,submissionId:string,signal:AbortSignal):Promise<Outcome>;}
export function validateEnquiry(value:unknown):{ok:true;value:Enquiry}|{ok:false;errors:Partial<Record<Field,string>>}{const r=enquirySchema.safeParse(value);if(r.success)return {ok:true,value:r.data};const errors:Partial<Record<Field,string>>={};for(const issue of r.error.issues){const key=issue.path[0] as Field;if(['intent','email','message','project','name','organization','locale','submissionId','website'].includes(key))errors[key]='invalid';}return {ok:false,errors};}
export const retryWindowMs=23*60*60*1000;
