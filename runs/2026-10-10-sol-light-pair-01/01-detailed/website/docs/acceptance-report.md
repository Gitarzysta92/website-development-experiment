# Artifactory local acceptance report

**Scope:** AF-D1 revision 1.1, AF-EP-1.0 local preview. Observed 10 October 2026, Europe/Warsaw. This report describes the final built local artifact and retains the repair history in `execution-record.md`. It does not assert full completion of every unit concern or the entire AF-CHECK-1.1 matrix.

**Implementation fingerprint:** `41188cc691bf9711361c35e7f78516c06f76a4f21896c4b4fc6cd2ffa493b27c`. SHA-256 over 112 files, sorted by relative POSIX path: every file under `src/`, `content/`, `scripts/`, `public/`, `tests/`, plus existing `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `playwright.config.ts`, `vitest.config.ts`, and `content-routes.json`. For each file, the aggregate receives UTF-8 relative path, a NUL byte, and the raw 32-byte SHA-256 file digest. No Git commit was made in this run. The supplied package manifest was checked separately: 113/113 files matched their recorded hashes.

**Conditions:** macOS arm64; pinned Node 24.21.0 and npm 11.19.0; Astro 7.3.8, @astrojs/node 11.1.7, TypeScript 6.0.3, Vitest 5.0.3, Playwright 1.64.0, axe-core 4.13.0, Lighthouse 13.5.0. Built server `http://127.0.0.1:4321`, bound to loopback. Browser builds: Chromium 156.0.8078.4, Firefox 157.0, WebKit 27.2. Earlier Node 22.17.1 observations are superseded for final build/start/browser checks but remain in the execution history.

## Observed checks

| Check | Result within tested scope | Actual procedure and evidence | Unchecked or unresolved condition |
| --- | --- | --- | --- |
| C-01 | Pass for local runtime | `npm ci --offline` on pinned Node/npm installed 519 packages; `npm run check` zero diagnostics; `npm run build` produced all 34 routes; `npm run start` served loopback. A deliberately invalid frontmatter candidate failed while the prior built Home hash remained intact. | No deployed runtime was exercised. |
| C-02 | Partial | 17 identities, 34 EN/PL structured JSON records and distinct sections validated by `tests/content.test.ts`; copy was manually checked against the supplied context and avoids unsupported measurements, clinical, financial and team claims. | Named factual and Polish human reviews are absent. Detailed independent reader review for each unit is not recorded. |
| C-03 | Partial | `npm run check:links`: 34 routes and 1,136 local links. Browser checked all language equivalents, ancestry, project siblings, disclosure destinations, section anchor switching, and investor/partner/demo paths. | Missing-translation and zero/one/many/reordered-project fixtures remain untested. |
| C-04 | Partial | Rendered/inspected `artifacts/home-final-wide.png`, `artifacts/projects-final-mobile.png`, `artifacts/pl-neural-mobile.png`; selected purple/teal palette, clear typography and labeled concepts appear. The Home/Projects compositions use substantial project comparison panels. | Every representative page was not visually compared side-by-side with the private reference board at every required viewport. |
| C-05 | Partial | Chromium axe analysis of all 34 localized pages reported no serious/critical violations; menu Escape/focus, form labels/errors, section nav and no-JS fallback exercised in browser. | Manual keyboard/touch/contrast audit at all hover/focus/disabled/error states and physical-device assessment remain. This is not accessibility certification. |
| C-06 | Partial | All 34 pages had no horizontal overflow at 320, 390, 844 and 1440 CSS-pixel widths; 844×390 menu, 320px Polish form, and no-JS email path passed. Full technical demo path passed in Chromium, Firefox and WebKit. | Actual 200%/400% browser zoom, slow/failing media and device-specific touch checks remain. |
| C-07 | Partial | Domain and direct HTTP tests covered required fields, strict unknown-field rejection, honeypot, short content, malformed JSON, media/method errors, missing/foreign Origin, streamed >32 KiB body and 5/minute throttling. Actual server rejected forged Host with 421 despite forwarding headers. | Complete Unicode limits, CRLF variants, 10-second upstream timeout and log redaction matrix were not run. |
| C-08 | Partial | Fixture receipt inspected separately, same-ID coalescing/conflict, pending/uncertain retry, 23-hour cutoff, 24-hour fixture expiry/restart store, disabled and unconfigured modes, malformed provider success/refusal and controlled Resend request mapping passed in Vitest. Browser independently received a fixture-only receipt. | Full network-abort/ambiguous-provider matrix and real provider/mailbox delivery were not tested. |
| C-09 | Partial | Browser covered PL Home→Investors→ArtiSense validation→investment Contact, technical→Partnerships→Contact, AIFIELD→Design→Examples→demo Contact, context preselection/editability, duplicate-click prevention, 422 field focus, unavailable/uncertain response wording and late-response edit preservation. | Slow-network 12-second timeout and every prescribed navigation modifier/Back/Forward combination remain. |
| C-10 | Partial | All 34 routes checked `lang`, title, canonical, reciprocal EN/PL, x-default, `noindex`, and share fallback; preview sitemap is empty. Isolated synthetic publication preflight accepted matching approvals and rejected a stale Polish edit; actual `build:published` failed before modifying preview. Five known 308s, English/Polish 404s and four historic ArtiSense fragments passed. | Full historic migration inventory, approved actual content and an isolated fully rendered published fixture remain unavailable. |
| C-11 | Partial | Actual HTML/API headers include no-store, noindex, CSP with specific inline script hashes, nosniff, referrer and permissions policies. Loopback/fixture/public-Host guards, client-bundle private-marker scan and no external mail in fixture were observed. | Deployed HTTPS/proxy policy, complete PII/log audit and operator data policy remain. |
| C-12 | Pass for selected lab budgets | Built-route JS including inline: max 2,599 bytes gzip; CSS 2,896 bytes gzip; largest HTML 2,858 bytes gzip. Six final simulated-mobile Lighthouse runs below all met score ≥90, LCP ≤2.5s and CLS ≤0.1. Largest reported network payload was 20,601 bytes, below 1 MiB. No remote font or raster hero is used. | Warm-load, failed-font/media and field-performance behavior remain unmeasured. |
| C-13 | Partial | `check:boundaries` traversed 19 source modules without import cycles, disallowed browser→server imports, and found no listed private markers in client output. Page→domain→application→receiver structure and injectable controlled provider transport are implemented. | Full public-API/property/state audit is not recorded for every component. |
| C-14 | Partial | Pure review digests invalidate synthetic English facts, Polish wording and media captions. Private draft review manifest and asset register stay outside public output. `seed:content` preserved 34 existing records; a repeat seed retained an authored edit. Actual Home copy edit appeared in preview, then source and artifact restored to the original content hash. A failed candidate preserved the prior build. | Actual human review and asset-rights approval cannot be supplied by this local run. |
| C-15 | Pass for local operation | `README.md`, `runtime.md`, `content.md`, and `enquiry.md` document install/start/check, modules, editing, local recovery and activation prerequisites. Pinned-runtime `npm ci` and the full local command chain were executed. | Hosting/domain/receiver operators and production runbook details await an authorized destination. |

## Combined checkpoints

The 23 selected component/capability/page pieces are represented in the build, but the required per-unit concern/evidence matrix is not fully closed. CP-COMPONENTS, CP-ARTISENSE, CP-AIFIELD, CP-COMPANY and CP-SITE have observed journey and integration evidence in the checks above; they are **not marked fully passed** because the remaining AF-CHECK-1.1 subcases are not complete. The final local artifact is runnable and tested, while whole-plan acceptance remains incomplete.

## Final browser and performance evidence

`npm run test:e2e` passed **54/54** tests on the final built artifact. This includes 34 route/metadata checks, all-page axe, all-page four-width reflow, five known redirects, localized 404, legacy fragment arrivals, form success/failure, host/origin boundaries, two investor/partner paths, demo paths in three engines, and disclosure/keyboard behavior. Raw browser screenshots and machine outputs remain under ignored `artifacts/`; the final Playwright run's output is summarized here because the CLI does not persist its line reporter by default.

Lighthouse 13.5.0 used its default **simulated mobile** profile (412×823 CSS pixels, 1.75 device scale, simulated throttling) with local Chrome for Testing 156, pinned Node 24.21.0, and the built loopback server. Individual results are score / LCP ms / CLS / total network payload bytes:

| Route | Run 1 | Run 2 | Run 3 | Median score / LCP / CLS |
| --- | --- | --- | --- | --- |
| EN Home | 100 / 901.16 / 0 / 19,806 | 100 / 901.35 / 0 / 19,806 | 100 / 901.57 / 0 / 19,806 | 100 / 901.35 ms / 0 |
| PL neural research | 100 / 901.57 / 0 / 20,601 | 100 / 901.35 / 0 / 20,601 | 100 / 901.41 / 0 / 20,601 | 100 / 901.41 ms / 0 |

Raw JSON: `artifacts/final-24-lh-home-{1,2,3}.json` and `artifacts/final-24-lh-neural-{1,2,3}.json`. These are lab observations, not visitor field measurements. An earlier batch overlapped a rebuild and hit a Chrome interstitial; it was discarded and repeated on the stable final artifact.

## Delivery, review and release

| Outcome | State |
| --- | --- |
| Local runnable website | Built and served on loopback; 17 identities / 34 localized paths. |
| Local synthetic receipt | Observed in browser and server fixture; no email sent. |
| Resend adapter protocol | Tested only with controlled transport; no real provider call. |
| Real provider acceptance | Not checked; approved credentials, verified sender/recipient and external-send authority absent. |
| Operator mailbox receipt | Not checked; named operator and authorized inbox test absent. |
| Factual and Polish review | Pending named human reviewers and exact-revision approvals. |
| Asset rights and production privacy | Pending owner approval and live data/retention policy. |
| Publication | Not performed; actual published build intentionally blocked. |
