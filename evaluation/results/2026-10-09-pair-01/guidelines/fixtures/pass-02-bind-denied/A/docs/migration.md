# URL recovery

The navigation legacy resolver uses the exact five-path map in content/shared/routes.json. Middleware returns a single 308 with the original query; fragments are retained by the browser. The four Polish ArtiSense aliases have useful summaries. Known editorial paths without a trailing slash redirect to their registered slash form. Matching is case-sensitive; unverified legacy slash/case variants and unknown paths return 404. The API receives no editorial slash redirect.

The localized 404 uses PL for /pl and /pl/*, EN otherwise; it omits the untrusted requested path, canonical and alternates. It keeps the real status and shared shell. Extend only from a verified inventory; the domain operator must supply broader historic URLs and production hostname/protocol rules before migration. No DNS, public migration or production configuration was changed.
