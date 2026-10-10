import type { APIRoute } from 'astro';
import { publicConfig } from '../config/public';
export const GET:APIRoute=()=>new Response(publicConfig.profile==='preview'?'User-agent: *\nDisallow: /\n':`User-agent: *\nAllow: /\nSitemap: ${publicConfig.origin}/sitemap.xml\n`,{headers:{'Content-Type':'text/plain'}});
