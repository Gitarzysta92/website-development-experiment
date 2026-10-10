import { readFileSync } from 'node:fs';
import { z } from 'zod';
const activation=z.object({externalSendAuthority:z.string().min(10),operator:z.string().min(3),dataPolicyEvidence:z.string().min(10),retentionProcedure:z.string().min(10),trustedTopology:z.literal('single-process-loopback'),verifiedSender:z.email(),approvedRecipient:z.email(),approvedOrigin:z.url(),approvedAt:z.iso.datetime()}).strict();
export function liveConfiguration(env:NodeJS.ProcessEnv){
 if(!env.RESEND_API_KEY||!env.ENQUIRY_FROM||!env.ENQUIRY_TO||!env.AF_LIVE_ACTIVATION_RECORD)return null;
 try{const approval=activation.parse(JSON.parse(readFileSync(env.AF_LIVE_ACTIVATION_RECORD,'utf8')));if(approval.verifiedSender!==env.ENQUIRY_FROM||approval.approvedRecipient!==env.ENQUIRY_TO||approval.approvedOrigin!==env.SITE_ORIGIN)return null;return {key:env.RESEND_API_KEY,from:approval.verifiedSender,to:approval.approvedRecipient};}catch{return null;}
}
