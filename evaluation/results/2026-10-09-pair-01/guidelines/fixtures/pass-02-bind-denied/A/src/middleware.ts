import { defineMiddleware } from 'astro:middleware';
import { legacyDestination, canonicalDestination } from './navigation/legacy';
export const onRequest = defineMiddleware((context, next) => {
  const target = legacyDestination(context.url.pathname) || canonicalDestination(context.url.pathname);
  if (target) return context.redirect(target + context.url.search, 308);
  return next();
});
