import type { APIRoute } from 'astro';
import { handleEnquiry } from '../../features/enquiry/server/index';
export const prerender=false;
export const ALL:APIRoute=({request,clientAddress})=>handleEnquiry(request,clientAddress);
