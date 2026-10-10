import register from '../../../compiled/routes.json';
export type Locale = 'en' | 'pl';
export type PageId = typeof register.routes[number]['id'];
export const routes = register.routes;
export function route(id: string, locale: Locale): string {
  const found = routes.find(r => r.id === id);
  if (!found) throw new Error(`Unknown page ${id}`);
  return found.paths[locale];
}
export function resolve(path: string) { return routes.find(r => r.paths.en === path || r.paths.pl === path); }
export function localeOf(path: string): Locale { return path.startsWith('/pl/') ? 'pl' : 'en'; }
export function ancestors(id: string) {
  const items=[] as typeof routes;
  let item=routes.find(r=>r.id===id);
  while(item?.parent){item=routes.find(r=>r.id===item?.parent); if(item)items.unshift(item);}
  return items;
}
export function enquiryHref(locale: Locale, intent: 'investment'|'partnership'|'demo'|'general', project?: 'artisense'|'aifield') {
  const q=new URLSearchParams({intent}); if(project)q.set('project',project);
  return `${route('contact',locale)}?${q}`;
}
