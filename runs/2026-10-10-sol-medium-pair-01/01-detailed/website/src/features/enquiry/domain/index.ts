import {z} from 'zod';
const plain=(max:number)=>z.string().trim().max(max).refine(v=>!/[<>\r\n]/u.test(v),'plain_text');
export const enquirySchema=z.strictObject({
 intent:z.enum(['investment','partnership','demo','general']),
 email:z.string().trim().max(254).email().refine(v=>!/[\r\n]/.test(v),'email'),
 message:z.string().trim().refine(v=>[...v].length>=20&&[...v].length<=5000,'message_length'),
 project:z.enum(['artisense','aifield']).optional(),
 name:plain(100).optional(),organization:plain(150).optional(),
 locale:z.enum(['en','pl']),submissionId:z.uuid(),website:z.literal('')
});
export type Enquiry=z.infer<typeof enquirySchema>;
export type Receipt={status:'accepted';receiptId:string;mode:'fixture'|'resend'};
export type Receiver=(value:Enquiry,bytes:string)=>Promise<Receipt>;
export function parseEnquiry(value:unknown){return enquirySchema.safeParse(value)}
