import type { APIRoute } from 'astro';
import { getPages } from '../content/index';
import { sitemap } from '../metadata/index';
import { publicConfig } from '../config/public';
export const GET:APIRoute=()=>new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap(getPages(),publicConfig.origin,publicConfig.profile).map(url=>`<url><loc>${url.replaceAll('&','&amp;')}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml'}});
