import { defineMiddleware } from 'astro:middleware';
import register from '../../compiled/routes.json';
export const onRequest=defineMiddleware(async(context,next)=>{
 const path=context.url.pathname;
 const target=register.redirects[path as keyof typeof register.redirects];
 if(target)return context.redirect(target,308);
 if(process.env.AF_PROFILE==='published')return new Response('Publication prerequisites not met',{status:503});
 const host=context.request.headers.get('host')?.split(':')[0];
 if(host && !['localhost','127.0.0.1','[::1]'].includes(host))return new Response('Preview is loopback only',{status:403});
 const response=await next();if(!response)return new Response(null,{status:204});const h=new Headers(response.headers);h.set('X-Content-Type-Options','nosniff');h.set('Referrer-Policy','strict-origin-when-cross-origin');h.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');h.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'");if(response.headers.get('content-type')?.includes('text/html')){h.set('Cache-Control','no-store');h.set('X-Robots-Tag','noindex, nofollow');}return new Response(response.body,{status:response.status,statusText:response.statusText,headers:h});
});
