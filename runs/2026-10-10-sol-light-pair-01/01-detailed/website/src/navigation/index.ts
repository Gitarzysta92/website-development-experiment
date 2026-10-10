import registry from '../../content-routes.json';
export type Locale = 'en' | 'pl';
export type PageId = typeof registry.routes[number]['id'];
export const routes = registry.routes;
export function routeFor(id: PageId, locale: Locale): string { const route = routes.find(r => r.id === id); if (!route) throw Error(`Unknown page: ${id}`); return route.paths[locale]; }
export function equivalentRoute(id: PageId, locale: Locale, section = ''): string { return routeFor(id, locale) + (section ? `#${encodeURIComponent(section)}` : ''); }
export function ancestors(id: PageId): typeof routes { const found = routes.find(r => r.id === id); if (!found?.parent) return []; return [...ancestors(found.parent), routes.find(r => r.id === found.parent)!]; }
export function projectPages(project: string) { return routes.filter(r => r.project === project); }
export function contactHref(locale: Locale, intent: 'investment' | 'partnership' | 'demo' | 'general' = 'investment', project?: 'artisense' | 'aifield') { return routeFor('contact',locale) + `?intent=${intent}` + (project ? `&project=${project}` : ''); }
export const routeAt = (path: string) => routes.find(r => r.paths.en === path || r.paths.pl === path);
