# AF-D1 local acceptance report

Project: Artifactory local website experiment. Package/plan: AF-D1 revision 1.1; units revision 1.0; checks AF-CHECK-1.1; policy AF-EP-1.0. Initial state of every check was `not checked`. This is the 10 October 2026 local execution result, not evidence of production acceptance.

Implementation fingerprint: `0976b5356ea89e01c403d48669cbb5fa2a40f458eb3ccc1c4cddb107192c8f11` (method in [execution-record.md](execution-record.md)). Package-lock SHA-256: `fb401f3877a2d3b7f1bbc1cab2c834f1b6f14392af80220129163b40cf324fe5`. Verified on macOS 26.6.2 arm64, Node 24.21.0, npm 11.19.0, Astro 7.3.8, Lighthouse 13.5.0, local built host `http://127.0.0.1:4321`, AF_PROFILE=preview, AF_RECEIVER=fixture. Browser builds: Playwright Chromium 156.0.8078.4, Firefox 157.0, WebKit 27.2. The host initially had Node 22.17.1/npm 10.9.2; exact versions were used for the accepted install/build. Individual defects, repairs and retained failed attempts are in the execution record and artifacts.

Planning coverage remains in `compiled/rule-coverage.csv`; the full check definitions and unit applicability are in `compiled/verification.md` and `compiled/unit-manifest.json`. Paths below are relative to `website/` unless linked. The table records observed subcases and gaps. A batch test across all routes does not imply that every manual or fixture condition passed for every unit. `not checked` conditions remain local verification gaps.

## Requirement evidence

| Check | Observed result | Unchecked or limited condition | Evidence / owner |
| --- | --- | --- | --- |
| C-01 | pass: package/source locks matched; exact pinned `npm ci`, `npm run build`, fresh local start | No deployed runtime | `artifacts/build-final.log`, package lock; IU-RUNTIME |
| C-02 | pass: 17 IDs/34 EN-PL records, required structure and source-limited draft copy inspected locally | not checked: human factual/legal/company and Polish-language approval | `artifacts/output-check.json`, `docs/pages/`; content owners |
| C-03 | pass: all 34 route hrefs checked, locale switching with section anchor and sampled journeys | not checked: zero/one/many/reordered project fixtures and missing-translation fixture; no claim about an unknown historic URL inventory | `artifacts/browser-smoke.json`, `artifacts/journeys.json`; navigation owners |
| C-04 | pass: actual Home, project, technical and Contact renders visually inspected at wide/narrow sizes; sampled screenshots and contact sheets retained | Full visual judgment of every long page/interaction state was not performed | `artifacts/home-wide.png`, `artifacts/contact-mobile.png`, `artifacts/en-contact-sheet.png`, `artifacts/pl-contact-sheet.png`; frame/page owners |
| C-05 | pass: 34-route Chromium axe had zero serious/critical findings; sampled keyboard, touch, skip link, focus/menu/Escape and form states | not checked: exhaustive manual accessibility audit and all hover/focus/disabled states on every route | `artifacts/browser-smoke.json`, `artifacts/browser-extended.json`, `artifacts/form-failures.json`; UI owners |
| C-06 | pass: 68 route/viewport checks (EN 1440x900; PL 390x844, 320x568, 844x390), 320 px representative reflow, 200% text enlargement, short menu, reduced motion and no-JS email fallback | not checked: native 400% browser zoom at 1280 px. Playwright and in-app native shortcuts did not change `innerWidth`, so equivalent narrow reflow is not mislabeled as this test | `artifacts/visual-matrix.json`, `artifacts/browser-extended.json`, `artifacts/short-menu.png`; UI owners |
| C-07 | pass: domain/handler and 49 HTTP checks cover schema, unknown keys, Unicode boundary, CRLF, method/media, malformed JSON, streamed oversize, Origin, rate limiting and safe error mapping | No production distributed limiter test | Vitest 12 cases, `artifacts/http-smoke.json`; IU-ENQUIRY |
| C-08 | pass: controlled fixture receipt inspected independently; duplicate/conflict, concurrent pending, identical uncertain retry bytes, 23-hour cutoff, expiry/restart, malformed provider response, disabled mode and fake-transport Resend schema | not checked: real provider acceptance and operator mailbox receipt | `tests/enquiry.test.ts`, `tests/http-handler.test.ts`, `artifacts/final-receipt-headers.txt`, `artifacts/disabled-response.json`; IU-ENQUIRY |
| C-09 | pass: Chromium investor, PL technical, partner and AIFIELD/demo journeys; editable context and browser validation/unavailable/uncertain/success states, retained values and late response protection | Other browsers received route samples, not every complete journey; no real external send | `artifacts/journeys.json`, `artifacts/form-failures.json`, `artifacts/browser-smoke.json`; page/enquiry owners |
| C-10 | pass: 34 preview locale/canonical/alternate/noindex/private-output checks, published-build gate, preview sitemap, 404 and known 308/fragment arrivals | not checked: isolated approved published fixtures, since no approved records/origin exist; unknown former-site URL inventory requires domain owner | `artifacts/output-check.json`, `artifacts/http-smoke.json`, `artifacts/published-gate.log`, `artifacts/browser-extended.json`; content/recovery owners |
| C-11 | pass: local HTML/static/API headers, noindex/no-store/CSP, loopback guard, fixture public-host refusal, no real send, local-only receipt and disabled 503 | No production host, storage or retention audit | `artifacts/final-receipt-headers.txt`, `artifacts/public-host-rejection.log`, `artifacts/published-start-rejection.log`, `artifacts/disabled-headers.txt`; runtime/enquiry owners |
| C-12 | pass: all 34 budget rows; max JS 2,304 B gzip, CSS 5,490 B gzip, initial resources 36,902 B. Three cold mobile Lighthouse runs per sampled page: median score 100, LCP 901 ms, CLS 0 | not checked: warm-load, failed-font/media and separate slow-network form profile | `artifacts/budgets.json`, `artifacts/lighthouse-summary.json`, six `artifacts/lh-accepted-*.json`; runtime/page owners |
| C-13 | pass: pure enquiry domain/use case, receiver port with swappable fixture/disabled/controlled Resend adapter, server-only configuration and bounded form state verified by source/tests | not checked: automated dependency-cycle/import-boundary enforcement across all modules | `src/features/enquiry/`, `tests/enquiry.test.ts`, `artifacts/output-check.json`; all structural owners |
| C-14 | pass: record and asset-caption edit/restore changed preview and restored identical output hashes; review invalidation tests and publication gate passed; seed script only fills missing records | No real human review or approved publication restore | `artifacts/edit-before.sha`, `artifacts/edit-after.sha`, `artifacts/asset-before.sha`, `artifacts/asset-after.sha`, `artifacts/published-gate.log`, `tests/review.test.ts`; content/runtime owners |
| C-15 | pass: commands and local recovery documented, build/start reproduced, no secrets in examples, artifact and extension guidance present | Human launch blockers remain open; no release/monitoring operation performed | `README.md`, `docs/components.md`, `docs/enquiry.md`, `docs/migration.md`, `docs/pages/`, `artifacts/build-final.log`; all owners |

The route-wide browser/output/budget batches apply to the 17 page identities mapped to their owner units in the manifest; shared components were present on those renders. The scoped result shown above does not certify all concern-matrix conditions per unit. No broad rule is promoted to passed solely because a batch has zero findings.

## Combined checkpoints

| Checkpoint | Result and combined evidence |
| --- | --- |
| CP-COMPONENTS | pass for local composition and synthetic one-receipt path: `artifacts/browser-smoke.json`, `artifacts/final-receipt-headers.txt`, Vitest |
| CP-ARTISENSE | pass for rendered EN/PL project route and sampled Contact journeys: `artifacts/journeys.json`, `artifacts/visual-matrix.json` |
| CP-AIFIELD | pass for actual overview/design/validation/demo path and route links: `artifacts/journeys.json`, `artifacts/browser-smoke.json` |
| CP-COMPANY | pass for 34 built routes and sampled investor/partner journeys: `artifacts/http-smoke.json`, `artifacts/journeys.json` |
| CP-SITE | local integration passed in observed conditions; whole-contract verification is incomplete because C-02, C-03, C-05, C-06, C-10, C-12 and C-13 retain stated unchecked conditions. No launch sign-off. |

## Representative state coverage

Chromium checked all 34 routes for status, `lang`, one H1, internal route hrefs and serious/critical axe findings. Firefox/WebKit checked EN/PL Home, ArtiSense technology and Contact route samples. Chromium also exercised keyboard skip link, menu/Escape, emulated touch menu/navigation, no-JS Contact email fallback and reduced motion. These are browser emulations, not physical-device tests. All 17 EN pages were checked at 1440x900; all 17 PL pages at 390x844, 320x568 and 844x390 for page overflow. A representative PL detail had 200% text enlargement; native 400% browser zoom remains not checked. Screenshots inspected include `artifacts/home-wide.png`, `artifacts/home-mobile.png`, `artifacts/technology-wide.png`, `artifacts/neural-mobile.png`, `artifacts/contact-mobile.png`, `artifacts/contact-small.png` and the EN/PL contact sheets. The initial two contrast defects were fixed; no serious/critical axe issue remained. This is not an accessibility certification.

The browser form checks cover invalid, unavailable, uncertain and accepted fixture states. The controlled browser timeout was about 14.2 seconds including test overhead, retained values and identical retry bytes; a late response did not replace newer state (`artifacts/form-failures.json`). Browser journeys cover direct PL technical arrival, language switch with section anchor, investor evidence, partnership evidence, AIFIELD demo Contact and editable intent. Known 308 and legacy fragment arrivals were checked. Project-count/missing-translation and failed media/font fixtures remain untested; the absent former-site URL inventory belongs to the domain operator.

## Architecture and operation

The form POSTs same-origin JSON to `/api/enquiries`; the use case calls a receiver port selected server-side. The fixture holds bounded process-local receipts and is cleared on restart. The disabled adapter returns unavailable. The Resend adapter was inspected through fake transport only; its request schema, fixed recipient/sender mapping, reply-to and idempotency key were asserted in Vitest. The local host rejects public binding, published profile and live-send activation. Build output inspection found no selected private provenance or secret strings; preview sitemap contains no URLs; preview HTML has noindex. `artifacts/output-check.json`, `artifacts/public-host-rejection.log`, `artifacts/published-start-rejection.log`, `artifacts/published-gate.log` and `artifacts/final-receipt-headers.txt` record these boundaries. This is local behavior, not a production security review.

The accepted `npm run build` is in `artifacts/build-final.log`; 12 Vitest cases passed; fresh-server `npm run test:http` passed 49/49; `npm run e2e` produced zero findings in its five reports; `npm run verify:output` passed 34/34 routes and budgets. Representative record/caption edits updated preview and after restore produced matching route HTML hashes. `artifacts/edit-before.sha`, `artifacts/edit-after.sha`, `artifacts/asset-before.sha`, `artifacts/asset-after.sha` retain the restore comparison. Human review was not simulated by those tests.

Lighthouse conditions: macOS 26.6.2 arm64, Node 24.21.0, Lighthouse 13.5.0, Playwright Chromium 156.0.8078.4, default simulated mobile profile, built loopback server. EN Home runs scored 100/100/100, median LCP 901.1 ms and CLS 0. Longest sampled PL technical page (`/pl/projekty/aifield/przyklady-walidacja/`) scored 100/100/100, median LCP 901.4 ms and CLS 0. Individual measurements and benchmark indices are in `artifacts/lighthouse-summary.json` and its six referenced JSON files. The sampled source HTML SHA-256 is `185bacd1bfd8d623791d66cacaab2e5fa8aea1bafab733f2303dd395ea4b4f2f`. The last changes before this report were test/docs only; no published performance claim follows from local lab scores.

## Live and release status

| Outcome | Actual state / next owner |
| --- | --- |
| Local website build/start | pass at loopback; executor; [README.md](../README.md) |
| Synthetic local receiver receipt | pass, process-local fixture only; executor |
| Resend adapter protocol tests | pass with fake transport; executor |
| Real provider acceptance | not checked; approved provider configuration and sending authority required |
| Real operator mailbox receipt | not checked; named operator/mailbox and authorized live test required |
| Human factual / Polish translation review | pending; company assigns reviewers; all content remains draft |
| Published content and asset permissions | pending; content/rights owners |
| Production data/retention arrangements | pending; privacy/data and enquiry operator |
| Production hosting / DNS / release | not performed; no publication authority supplied |
| Monitoring / recurring jobs | not selected or activated |

Local implementation is produced and the listed local test scope passed. Full AF-CHECK-1.1 verification is incomplete in the stated representative and human-review conditions; CP-SITE is not a launch approval. The exact implementation fingerprint, runbook and remaining owners are above. A passed local build or synthetic receipt does not alter any live status.
