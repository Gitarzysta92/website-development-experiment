import type {APIRoute} from 'astro';
import {selectedReceiver} from '../../features/enquiry/server';
import {createEnquiryHandler} from '../../features/enquiry/server/http';
export const prerender=false;
const handle=createEnquiryHandler(selectedReceiver);
export const ALL:APIRoute=({request,clientAddress})=>handle(request,clientAddress||'local');
