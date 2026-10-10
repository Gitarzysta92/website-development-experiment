import { routeFor, type PageId } from '../navigation/index';
import { eligible, type PageRecord, type PageView } from '../content/index';
export function metadata(page:PageView,origin:string,profile:string){return {title:`${page.title} | Artifactory`,description:page.description,canonical:new URL(routeFor(page.id,page.locale),origin).href,alternates:['en','pl','x-default'].map(lang=>({lang,href:new URL(routeFor(page.id,lang==='pl'?'pl':'en'),origin).href})),robots:profile==='preview'?'noindex, nofollow':'index, follow',image:new URL('/brand/share-v1.svg',origin).href};}
export function sitemap(records:PageRecord[],origin:string,profile:string){return profile==='published'?records.filter(eligible).map(r=>new URL(routeFor(r.id as PageId,r.locale),origin).href):[];}
export function safeAsset(value:string){return /^\/(?!\/)[\w/.-]+$/.test(value)||/^https:\/\/[^\s<>"']+$/.test(value);}
