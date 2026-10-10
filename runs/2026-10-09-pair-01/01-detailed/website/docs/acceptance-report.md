# Artifactory acceptance report

AF-D1 revision 1.1; unit contracts 1.0; AF-EP-1.0 autonomous local scope. Verifier: execution agent. Run spans 9-10 October 2026, Europe/Warsaw. All 23 units and five combined checkpoints are locally complete. This is a local implementation result, not a release or human factual approval.

Implementation SHA-256: `eb82324d42e3b6eef2f403456d296910710d342227c4624032bfb454a30ef584`.
Selected artifact SHA-256: `16115f68ccecb964ecb7b9747682b6c77f931537790631c5d04a4389621a87e7`.

The implementation fingerprint covers package/lock/config, source, content, public assets, scripts and tests. Docs and generated evidence are excluded to avoid circular hashes. `artifacts/final-identity.json` binds the selected artifact and browser versions. Earlier attempt hashes used the earlier narrower source-only protocol and are retained as history.

## Environment and measured scope

Node 24.21.0 / npm 11.19.0; Astro 7.3.8; Vitest 5.0.3; Playwright 1.64.0; axe 4.13.0; Lighthouse 13.5.0. Host: Apple M4 Pro, 14 logical CPUs, 48 GiB, Darwin 25.6.0 / arm64. Built origin: http://127.0.0.1:4321; upstream loopback 4322.

Chromium 156.0.8078.4, Firefox 157.0 and WebKit 27.2 each complete a native demo-to-local-receipt journey. Chromium covers every route at 1440x900, 390x844, 320x568 and 844x390. Representative company/detail/form tests double text and emulate 400% reflow with a 320x225 viewport from 1280px. Touch is emulated. Native browser chrome zoom, physical devices, screen-reader certification and field performance are not claimed.

## Observed checks

| Check | Local outcome and evidence |
| --- | --- |
| C-01 | Pass: Pinned Node/npm and exact npm ci; check/test/build/start; all 113 supplied file hashes retained. Evidence: `artifacts/package-integrity-final.json`. |
| C-02 | Pass: Read actual EN/PL drafts against source limits; 17 IDs/34 pairs and required sections validated. Human factual/language approval remains pending. Evidence: `docs/content-review.md`. |
| C-03 | Pass: All native route/asset destinations and incoming links; equivalent locale/section, breadcrumbs, project navigation, editable intent; collection and missing-translation fixtures. Evidence: `artifacts/link-check.json`. |
| C-04 | Pass: Agent inspected actual wide/narrow rendered screenshots and source-bounded content; original labeled concepts and established palette. Evidence: `docs/visual-review.md`. |
| C-05 | Pass: All 34 EN/PL routes at four sizes: final axe findings empty; keyboard/skip/menu/Escape/focus and emulated touch on shared components and form. Evidence: `artifacts/axe/`. |
| C-06 | Pass: 1440x900, 390x844, 320x568, 844x390; representative company/detail/form doubled text and 320x225 reflow; no-JS, reduced motion and resize. Evidence: `artifacts/screenshots/`. |
| C-07 | Pass: Actual domain and Request/Response endpoint: field/enumeration/Unicode, JSON, unknown keys, method/media/origin, streamed 32769 bytes, forwarding and rate limit; built API receipt/method boundary. Evidence: `tests/enquiry.test.ts`. |
| C-08 | Pass: Independent synthetic fixture receipt observation, idempotency/conflict/concurrency, timeout/expiry/restart and disabled modes; isolated Resend transport/schema/key/error tests; no real provider call. Evidence: `tests/enquiry.test.ts`. |
| C-09 | Pass: Actual EN/PL ArtiSense/AIFIELD/investor/partner journeys and receipts; demo receipt in Chromium/Firefox/WebKit; controlled failure/retry/pagehide-stale cases. Evidence: `artifacts/runs/`. |
| C-10 | Pass: All 34 built titles/descriptions/share/canonical/alternates/lang; empty preview sitemap and noindex; isolated approved fixture; actual drafts fail publication; exact 308/404 and four fragments. Evidence: `artifacts/built-metadata.json`. |
| C-11 | Pass: Loopback/profile/origin guards, actual HTML/static/API headers and private-path refusals; no browser PII persistence or external site resources; bounded expiring in-memory fixture. Evidence: `tests/runtime.test.ts`. |
| C-12 | Pass: Every route within 60KiB JS/100KiB CSS gzip and 1MiB initial resource budgets; six cold mobile samples; warm resources, optional-media fallback and delayed-script/slow form checks. Evidence: `artifacts/resources/`. |
| C-13 | Pass: Source import/cycle and built private-field scan; pure domain and interchangeable receiver; single server composition and local controller state reviewed. Evidence: `artifacts/final-check.log`. |
| C-14 | Pass: Every record edit invalidates review in isolated tests; seed refuses overwrite; actual Home/caption edit, blocked export, failed candidate isolation and source/artifact restore/start observed. Evidence: `artifacts/recovery/results.json`. |
| C-15 | Pass: Runbook commands executed; per-component/page docs, extension boundaries, exact start and recovery instructions, and external owner prerequisites retained. Evidence: `README.md`. |

`docs/scoped-evidence.csv` contains 249 separate check+unit+revision rows, including relevant rule/objective/output mappings from the protected coverage register. These rows describe the tested local subcases; they do not convert pending live or owner reviews into passes.

## Component completion

| Unit | Produced piece | Owned pages / evidence |
| --- | --- | --- |
| IU-RUNTIME | Complete locally: Website runtime and build host | Shared component; scoped evidence rows for C-01, C-11, C-12, C-13, C-14, C-15 |
| IU-CONTENT | Complete locally: Bilingual content repository and route catalogue | Shared component; scoped evidence rows for C-02, C-03, C-10, C-11, C-13, C-14, C-15 |
| IU-FRAME | Complete locally: Page frame and shared presentation components | Shared component; scoped evidence rows for C-03, C-04, C-05, C-06, C-10, C-11, C-12, C-13, C-15 |
| IU-HEADER | Complete locally: Global header and language navigation | Shared component; scoped evidence rows for C-03, C-04, C-05, C-06, C-12, C-13, C-15 |
| IU-FOOTER | Complete locally: Global footer and company contact links | Shared component; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-12, C-13, C-15 |
| IU-PROJECT-NAV | Complete locally: Project reading frame and local navigation | Shared component; scoped evidence rows for C-03, C-04, C-05, C-06, C-12, C-13, C-15 |
| IU-ENQUIRY | Complete locally: Contact and privacy enquiry experience | contact, privacy; scoped evidence rows for C-01, C-02, C-03, C-04, C-05, C-06, C-07, C-08, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-HOME | Complete locally: Home page | home; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-PROJECTS | Complete locally: Projects index page | projects; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AS-OVERVIEW | Complete locally: ArtiSense overview page | artisense; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AS-TECHNOLOGY | Complete locally: ArtiSense technology page | artisense-technology; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AS-APPLICATIONS | Complete locally: ArtiSense applications page | artisense-applications; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AS-VALIDATION | Complete locally: ArtiSense research and validation page | artisense-validation; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AF-OVERVIEW | Complete locally: AIFIELD overview page | aifield; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AF-DESIGN | Complete locally: AIFIELD design and simulation page | aifield-design; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AF-AI | Complete locally: AIFIELD AI workflows page | aifield-ai; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AF-NEURAL | Complete locally: AIFIELD neural field research page | aifield-neural; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-AF-VALIDATION | Complete locally: AIFIELD examples and validation page | aifield-validation; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-INVESTORS | Complete locally: Investors page | investors; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-APPROACH | Complete locally: Our Approach page | approach; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-ABOUT | Complete locally: About page | about; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-PARTNERSHIPS | Complete locally: Partnerships page | partnerships; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12, C-13, C-14, C-15 |
| IU-RECOVERY | Complete locally: Legacy URL redirects and missing-page recovery | Shared component; scoped evidence rows for C-02, C-03, C-04, C-05, C-06, C-10, C-11, C-12, C-13, C-15 |

## Combined checkpoints

| Checkpoint | Observed result |
| --- | --- |
| CP-COMPONENTS | Pass: real EN/PL shell/header/footer/project navigation and Contact/Privacy; independent local receipt; opt-in fixtures absent from final output. |
| CP-ARTISENSE | Pass: native Home → Projects → ArtiSense → Technology/language → Validation → editable Contact; all actual child pages and evidence links. |
| CP-AIFIELD | Pass: overview → design/AI/neural/examples → demo Contact; both glucose cross-project links and equivalent section navigation. |
| CP-COMPANY | Pass: all 34 actual routes; investor and partner paths produce EN/PL synthetic receipts; About, company and project context present in the complete link graph. |
| CP-SITE | Pass: final recovery/metadata/link/header/privacy/export boundaries, browser journeys, budgets, source/artifact restore and reproducible start. |

## Browser and accessibility evidence

The final Chromium suite has 51 active passing tests; four fixture-only tests are skipped in normal builds and separately pass against a fixture build. Firefox and WebKit add two passing critical journeys. Fifteen Vitest tests pass. The final type check reports zero errors, warnings or hints. The retained axe directory contains 136 reports (34 routes x four viewports), with zero final violations. This is the selected automated/manual scope, not a full accessibility audit.

Keyboard, focus, touch, error, uncertain/pending/conflict/throttled/unavailable, no-JS, reduced-motion and stale-response states have observed tests. New-tab navigation uses native middle click; Back/refresh and same-section language switching are exercised. Independent receipt files contain IDs/counts only. Browser storage/cookie checks are empty.

## Resource and performance results

Largest measured per-route gzip payload: JS 3,873 bytes; CSS 5,937 bytes. All 34 route tests pass the 1MiB initial document/resources bound. Figures are inline SVG or semantic HTML/CSS; there are no hero rasters or remote fonts. Gzip values are normalized measurements, not a claim that the local server enables wire compression. Warm-load entries and failed-image/font/optional-media conditions are separately recorded.

Longest PL technical page is selected by authored visible text length (title, lead, headings, paragraphs, lists and tables), not SVG markup size: ArtiSense Research and Validation, 2,980 characters. Three cold Lighthouse default simulated-mobile samples each run against that page and EN Home.

| Page | Scores | Median score | Median LCP | Median CLS |
| --- | --- | --- | --- | --- |
| /en/ | 100, 100, 100 | 100 | 1203.9 ms | 0.00000 |
| /pl/projekty/artisense/badania-walidacja/ | 100, 100, 100 | 100 | 1202.2 ms | 0.00000 |

Individual reports, profile/hardware conditions and medians: `artifacts/performance/`. These are local lab results, not deployed or field metrics.

## Failures and repairs

| Finding | Repair and recheck |
| --- | --- |
| Initial runtime/loopback/browser sandbox restrictions | Exact runtime and browser access used approved tool escalation; no operator interruption or external send. |
| Astro CLI and ignored underscore fixture route | Runner uses installed Astro bin; opt-in route uses checks-components; build/render verified. |
| Inline menu script blocked by self-only CSP | External script/style assets enforced; CSP preserved; real menus rechecked. |
| Trailing-slash redirect changed enquiry POST method | Global slash mode ignores API; explicit known editorial redirects; real local submissions pass. |
| Teal 16px text on mist measured 4.38:1 | Supplied purple used for that combination; palette unchanged; axe rerun. |
| Test-only failures: JSON imports, AbortSignal identity, route mock cleanup, noscript selector, absolute language URL and native new-tab event | Assertions/runners corrected to observed platform behavior; raw failures retained and subsequent runs pass. |
| In-flight request could leave a cached form disabled | pagehide preserves an uncertain retryable state and cancels stale work; delayed response test passes. |
| Preview notice outside landmarks (moderate axe region finding) | Added a localized labeled region; all 136 final route/viewport reports empty. Previous reports retained in axe-before-region-fix. |
| Cold mobile menu collapse: score 81, CLS 0.40833 | Initial mobile menu state set with scripting media feature; no-JS navigation remains visible; delayed-script position test and six new Lighthouse samples pass. Previous samples retained in performance-before-menu-fix. |

Initial failure evidence includes header-first-failure.json, enquiry-first-failure.json, site-first-failure.json, link-newtab-first-failure.json and the timestamped browser runs. No remaining known local test failure is hidden by a changed threshold.

## Boundaries and remaining prerequisites

| Status | Result / responsible provider |
| --- | --- |
| Local implementation and verification | Complete within AF-CHECK-1.1 local scope; runbook in README.md. |
| Synthetic fixture receipt | Verified independently in EN/PL and all three browsers; no email sent. |
| Resend adapter protocol | Tested only with injected transports, including errors/timeouts/malformed responses. |
| Real provider acceptance / mailbox delivery | Not checked. Requires approved sender/recipient, credentials, explicit send authority and named enquiry operator. |
| Factual/scientific/Polish language review | Pending. Company representative, project leads and Polish reviewer must be assigned. All 34 records remain draft; review stamps are null. |
| Asset/publication rights | Pending responsible owner review. Original concepts registered; reference screenshots remain private. |
| Company/legal/investment/relationship facts | Current company ownership, public funding, operator identity and any relationship permissions require company-owner confirmation. Unsupported specifics are omitted or qualified. |
| Production privacy/retention/topology | Pending data/operator owners; local in-memory behavior is not a production retention arrangement. |
| Hosting/DNS/release and historical URL inventory | Not performed. Domain/release owner must approve configuration and supply broader historic evidence. |
| Monitoring / recurring jobs | Not selected or activated. |

No source package revision, scope reduction, publication or live notification occurred. The protected package retains all 113 hashes. The optional fsevents install-script warning from npm ci did not block installation or any required check; no blanket script approval was added.

## Immutable browser run index

| Run | Arguments | Exit | Source fingerprint |
| --- | --- | --- | --- |
| `artifacts/runs/2026-10-09T22-22-54.264Z` | --project=firefox --project=webkit --grep critical demo receipt | 0 | `4fc6fed61ce7fac8c13469e9ae732721d9d2241b6e949eaa9cb5155b366e8356` |
| `artifacts/runs/2026-10-09T22-24-21.916Z` | --project=chromium | 0 | `3d8ba9855a847493555dbee4054071eb300a554d419dc2a986a67a9f3c06482a` |
| `artifacts/runs/2026-10-09T22-29-42.615Z` | --project=chromium tests/browser/components.spec.ts | 0 | `e3452f496fe502f717fa0e1e8b1d06df626aff5757fb532a6e4131afa58fdf24` |
| `artifacts/runs/2026-10-09T22-31-56.158Z` | --project=chromium | 0 | `eb82324d42e3b6eef2f403456d296910710d342227c4624032bfb454a30ef584` |
| `artifacts/runs/2026-10-09T22-34-58.219Z` | --project=firefox --project=webkit --grep critical demo receipt | 0 | `eb82324d42e3b6eef2f403456d296910710d342227c4624032bfb454a30ef584` |
