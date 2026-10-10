import { z } from 'zod';
const plain=(max:number)=>z.string().trim().refine(s=>Array.from(s).length<=max&& !/[<>\r\n]/.test(s));
export const requestSchema=z.strictObject({intent:z.enum(['investment','partnership','demo','general']),email:z.email().max(254).refine(s=>!/[\r\n]/.test(s)),message:z.string().trim().refine(s=>Array.from(s).length>=20&&Array.from(s).length<=5000),project:z.enum(['artisense','aifield']).optional(),name:plain(100).optional(),organization:plain(150).optional(),locale:z.enum(['en','pl']),submissionId:z.uuid(),website:z.literal('')});
export type Enquiry=z.infer<typeof requestSchema>;
export type Receipt={status:'accepted';receiptId:string;mode:'fixture'|'resend'};
export type Receiver={accept:(enquiry:Enquiry,signal:AbortSignal)=>Promise<Receipt>};
export function validateRequest(value:unknown){return requestSchema.safeParse(value)}
