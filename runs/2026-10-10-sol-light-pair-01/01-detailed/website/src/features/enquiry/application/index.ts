import type {Enquiry,Receiver,Receipt} from '../domain';
type Entry={payload:string;first:number;state:'pending'|'uncertain'|'accepted';receipt?:Receipt};
const attempts=new Map<string,Entry>();
export async function submitEnquiry(request:Enquiry,receiver:Receiver,signal:AbortSignal,now=Date.now()):Promise<Receipt>{
  for(const [id,item] of attempts)if(now-item.first>86400000)attempts.delete(id);
  const payload=JSON.stringify(request);
  const entry=attempts.get(request.submissionId);
  if(entry){if(entry.payload!==payload)throw new Error('conflict');if(entry.state==='pending')throw new Error('pending');if(entry.state==='accepted')return entry.receipt!;if(now-entry.first>=23*3600000)throw new Error('unavailable')}
  const current:Entry=entry??{payload,first:now,state:'pending'};current.state='pending';attempts.set(request.submissionId,current);
  try{const receipt=await receiver.accept(request,signal);current.state='accepted';current.receipt=receipt;return receipt}catch(error){const reason=error instanceof Error?error.message:'uncertain';if(reason==='unavailable'||reason==='conflict'){attempts.delete(request.submissionId)}else current.state='uncertain';throw error}
}
