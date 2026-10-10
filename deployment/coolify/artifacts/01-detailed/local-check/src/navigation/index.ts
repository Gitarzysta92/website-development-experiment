import registry from '../../content/shared/routes.json' with { type: 'json' };
export type Locale = 'en' | 'pl';
export type PageId = 'home'|'projects'|'artisense'|'artisense-technology'|'artisense-applications'|'artisense-validation'|'aifield'|'aifield-design'|'aifield-ai'|'aifield-neural'|'aifield-validation'|'investors'|'approach'|'about'|'partnerships'|'contact'|'privacy';
export type ProjectId = 'artisense' | 'aifield';
export type Intent = 'investment'|'partnership'|'demo'|'general';
export const routes = registry.routes as {id:PageId;parent:PageId|null;labels:Record<Locale,string>;paths:Record<Locale,string>;project:ProjectId|null}[];
export const redirects: Record<string,string> = registry.redirects;
export const legacyAnchors = registry.legacy_artisense_fragments;
export function routeFor(id:PageId,locale:Locale) {const r=routes.find(r=>r.id===id);if(!r)throw new Error('Unknown page identity');return r.paths[locale];}
export function equivalentRoute(id:PageId,locale:Locale,sectionId?:string) {return routeFor(id,locale)+(sectionId&&/^[a-z0-9-]+$/.test(sectionId)?`#${sectionId}`:'');}
export function ancestors(id:PageId):PageId[]{const parent=routes.find(r=>r.id===id)?.parent;return parent?[...ancestors(parent),parent]:[];}
export function projectPages(project:ProjectId,locale:Locale){return routes.filter(r=>r.project===project).map(r=>({...r,href:routeFor(r.id,locale),label:r.id===project?(locale==='en'?'Overview':'Przegląd'):r.labels[locale]}));}
export function projectEntries<T extends {id:string;order?:number}>(entries:T[]){return [...entries].sort((a,b)=>(a.order??0)-(b.order??0)||a.id.localeCompare(b.id));}
export function contactHref(locale:Locale,intent:Intent='general',project?:ProjectId){const params=new URLSearchParams();if(['investment','partnership','demo','general'].includes(intent))params.set('intent',intent);if(project&&['artisense','aifield'].includes(project))params.set('project',project);return `${routeFor('contact',locale)}?${params}`;}
export function labelFor(id:PageId,locale:Locale){return routes.find(r=>r.id===id)!.labels[locale];}
