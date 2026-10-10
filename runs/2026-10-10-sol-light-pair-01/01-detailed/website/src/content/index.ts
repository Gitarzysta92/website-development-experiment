import type { Locale, PageId } from '../navigation';
export type Section = { id: string; title: string; paragraphs: string[] };
export type PageView = { id: PageId; locale: Locale; title: string; description: string; eyebrow: string; lead: string; sections: Section[]; related: PageId[]; stage?: string };
export const pageViews: PageView[] = [];
export function register(view: PageView) { if (pageViews.some(p => p.id === view.id && p.locale === view.locale)) throw Error('Duplicate localized page'); pageViews.push(view); }
export function getPageView(id: PageId, locale: Locale): PageView | undefined { return pageViews.find(p => p.id === id && p.locale === locale); }
