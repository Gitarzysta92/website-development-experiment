import {type Enquiry,type Receiver} from '../domain';
export async function submitEnquiry(receiver:Receiver,value:Enquiry,bytes:string){return receiver(value,bytes)}
