import { redirects, routes } from './index';
export function legacyDestination(pathname: string): string | null {
  return Object.hasOwn(redirects, pathname) ? redirects[pathname] : null;
}
export function canonicalDestination(pathname: string): string | null {
  const target = `${pathname}/`;
  return !pathname.endsWith('/') && routes.some(r => Object.values(r.paths).includes(target)) ? target : null;
}
