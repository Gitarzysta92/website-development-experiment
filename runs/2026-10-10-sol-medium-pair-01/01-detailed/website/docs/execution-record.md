# AF-D1 execution record

Run: `2026-10-10-sol-medium-pair-01/01-detailed`; package/plan AF-D1 revision 1.1; policy AF-EP-1.0. Local execution: 10 October 2026, Europe/Warsaw. Per-unit timestamps and experiment token/cost telemetry were not recorded and are not inferred.

## Baseline and version

- Work directory: `website/` in this detailed run. The other experiment run was not used. Package integrity check found 113 package files and 19 locked inputs with no hash mismatches. `compiled/unit-manifest.json` SHA-256: `8c7d9e78e2822d8438f47fb42f6b79e4b7b652378c93ae6406a66b8d608e275a`; `compiled/source-lock.json` SHA-256: `c9448c4d40e4943fbb900a697bece4f59250e36e25659c402168069ead2d5c1b`.
- Initial host runtime: Node 22.17.1/npm 10.9.2. Verified install/build: Node 24.21.0/npm 11.19.0. Lockfile SHA-256: `fb401f3877a2d3b7f1bbc1cab2c834f1b6f14392af80220129163b40cf324fe5`.
- Implementation fingerprint: `0976b5356ea89e01c403d48669cbb5fa2a40f458eb3ccc1c4cddb107192c8f11`. Algorithm: SHA-256 over sorted relative path, NUL, file SHA-256 hex and newline for 86 files in `src/`, `content/`, `scripts/`, `tests/`, `public/`, plus `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `.env.example`. Reports, artifacts and generated output are excluded.
- Astro 7.3.8 standalone Node preview; 17 identities, 34 EN/PL routes. All records remain unreviewed drafts. The fixture receiver stores only synthetic local enquiries in process memory and sends no email. `info@artifactory.tech` is an unverified candidate address.

## Unit outputs

All 23 planned units at revision 1.0 produced local output. This table is an implementation inventory, not a claim that every applicable unit check passed. The manifest retains exact action/check ownership; observed outcomes and gaps are in [acceptance-report.md](acceptance-report.md). Shared records use one validated page template and distinct EN/PL content. The actual file organization differs from some suggested `owned_paths` but preserves their responsibilities.

| Unit | Output and consumer handoff |
| --- | --- |
| IU-RUNTIME | `astro.config.mjs`, pinned package files, `scripts/serve.mjs`, build/preview commands |
| IU-CONTENT | `content/pages/{en,pl}/`, catalogue, record loader, review/publication mechanisms |
| IU-FRAME | `src/layouts/Shell.astro`, `src/templates/Page.astro`, `src/styles/global.css`, concept visuals |
| IU-HEADER | `src/partials/Header.astro`; bilingual primary navigation and mobile menu |
| IU-FOOTER | `src/partials/Footer.astro`; company, contact and privacy links |
| IU-PROJECT-NAV | `src/partials/ProjectNav.astro`; project reading/navigation states |
| IU-ENQUIRY | `src/features/enquiry/`, `/api/enquiries`, EN/PL Contact and Privacy; fixture/disabled/controlled Resend paths |
| IU-HOME | EN/PL `home.json` and rendered Home |
| IU-PROJECTS | EN/PL `projects.json` and rendered project index |
| IU-AS-OVERVIEW | EN/PL `artisense.json` and rendered overview |
| IU-AS-TECHNOLOGY | EN/PL `artisense-technology.json` and rendered technology page |
| IU-AS-APPLICATIONS | EN/PL `artisense-applications.json` and rendered applications page |
| IU-AS-VALIDATION | EN/PL `artisense-validation.json` and rendered validation page |
| IU-AF-OVERVIEW | EN/PL `aifield.json` and rendered overview |
| IU-AF-DESIGN | EN/PL `aifield-design.json` and rendered design page |
| IU-AF-AI | EN/PL `aifield-ai.json` and rendered AI page |
| IU-AF-NEURAL | EN/PL `aifield-neural.json` and rendered neural field page |
| IU-AF-VALIDATION | EN/PL `aifield-validation.json` and rendered validation page |
| IU-INVESTORS | EN/PL `investors.json` and rendered company-level investment page |
| IU-APPROACH | EN/PL `approach.json` and rendered approach page |
| IU-ABOUT | EN/PL `about.json` and rendered company page |
| IU-PARTNERSHIPS | EN/PL `partnerships.json` and rendered partnership page |
| IU-RECOVERY | `src/pages/404.astro`, redirect/fragment handling and `docs/migration.md` |

Each content owner has instructions in `docs/pages/`; shared contracts are in `docs/components.md` and `docs/enquiry.md`.

## Combined checkpoints

| Checkpoint | Observed local combination |
| --- | --- |
| CP-COMPONENTS | Frame/header/footer compose with bilingual Contact/Privacy. A synthetic fixture submission returned a receipt; an independent module inspection found one receipt. `artifacts/final-receipt-headers.txt`, `artifacts/browser-smoke.json`, Vitest. |
| CP-ARTISENSE | Home/Projects/ArtiSense pages and Contact context render in both languages; investor and partner routes traverse evidence pages. `artifacts/journeys.json`, `artifacts/visual-matrix.json`. |
| CP-AIFIELD | Overview/design/validation/demo Contact path and language/local navigation render. Cross-project links are included in route/link checks. `artifacts/journeys.json`, `artifacts/browser-smoke.json`. |
| CP-COMPANY | All 34 routes return 200 with valid route links; investor/partner journeys reach editable Contact intent. `artifacts/http-smoke.json`, `artifacts/journeys.json`, `artifacts/output-check.json`. |
| CP-SITE | Fresh build/start, 34-route output, three-browser samples, local API/security boundaries and budgets passed. Native 400% zoom and human review remain unverified; see acceptance report. |

## Attempts and repairs

The first build exposed TypeScript errors and missing security/cache headers on static HTML. The host now applies headers to prerendered files and hashes bundled inline scripts for CSP. Initial recovery had incorrect 404 metadata/status, and the API no-slash path redirected. Wrong-media rejection returned 403 instead of 415. Two mist-background contrast failures, a lost language-switch section anchor and asynchronous browser-test locator/race issues were corrected and rechecked. These were agent self-corrections, not operator interventions. Earlier attempts remain under `artifacts/`; accepted results include `build-final.log`, `browser-smoke.json`, `journeys.json`, `visual-matrix.json`, `browser-extended.json`, `form-failures.json`, `http-smoke.json`, `output-check.json`, `budgets.json` and `lighthouse-summary.json`.

The final build completed with Astro warnings that `Astro.request.headers` is unavailable during prerendering. The local host supplies the tested response headers; the warning is retained in `artifacts/build-final.log`. Native browser zoom shortcuts did not change the observed CSS viewport. The 400% condition is not checked, while 320 px reflow and 200% text enlargement have separate evidence.

## Operator intervention log

No user/operator intervention occurred. Initial network installation and loopback binding met sandbox restrictions; reviewed escalations succeeded. Content, language, rights, mailbox and release approvals were neither requested nor inferred.

## Final local assessment

`npm ci`, build, 12 Vitest cases, 49 HTTP checks, browser suites and 34-route output/budget checks passed under the conditions in the acceptance report. Local fixture receipt was observed; disabled mode returned unavailable. The Resend adapter was tested with a fake transport only. No real provider call, mailbox receipt, human content/language approval or production publication occurred. Published build/start and public-host preview activation were rejected by the local gates.

Run/recovery: [README.md](../README.md). Acceptance and limitations: [acceptance-report.md](acceptance-report.md). Raw evidence: `artifacts/`. Future owners: company content and language reviewers, asset/rights owner, privacy/data and enquiry operator, and release/hosting operator.
