# Verification contract

Record `AF-CHECK-1.1`. Every check is initially **not checked**. Record implementation fingerprint, plan/unit revision, command or manual procedure, tool/browser versions, URL, conditions, result and evidence path in the run's acceptance report. Preserve failed attempts and explain repairs. This is a selected local test scope, not a full accessibility audit or proof of deployed behavior.

## Check ownership and scope

Checks are executed within the component/page unit that owns the behavior. Each evidence row is keyed by check ID plus unit ID and implementation revision. One component’s pass is not a pass for every component. The unit’s concrete concern matrix and check table identify its scope; an inapplicable subcase needs a reason, not a blanket fabricated pass.

The procedures below are reusable check definitions, not a separate QA phase. Each piece verifies its own content, rendered states, architecture, security, metadata and performance before local completion. Plan checkpoints observe new combinations when all required pieces exist and reopen defects at their owning component. Future route targets are validated against the compiled route contract until the named counterpart checkpoint can observe the actual destination.

## Checks

| ID | Concrete procedure and pass condition | Owner / outputs |
| --- | --- | --- |
| C-01 | Compare initial files and source locks, inspect runtime, install exact pins without forced peers, generate lock, execute real check/build/start. Later reproduce with `npm ci` and fresh build. Log any baseline differences and package revision. | IU-RUNTIME; relevant consumer/checkpoint rechecks |
| C-02 | Validate all 17 IDs / 34 locale pairs and required sections against routes.json and sitemap. Review EN/PL factual claims, research dates/limits, company-level investment scope and absence of invented numeric/clinical/customer/team claims. Check each child answers its own reader question with distinct useful text. | Each content-bearing component/page; IU-CONTENT owns schema/source mechanisms |
| C-03 | Generate navigation from identity. Test every route's incoming/outgoing links, EN↔PL equivalence, breadcrumbs, project siblings and context CTAs. Exercise zero/one/many/reordered project fixtures and missing translation behavior without changing actual two-project launch content. | IU-CONTENT/HEADER/FOOTER/PROJECT-NAV plus each page’s local destinations |
| C-04 | Inspect actual rendered Home, project overview, technical detail and Contact beside supplied visual references at wide/narrow sizes. Confirm palette, hierarchy, substantial original concept visuals, consistent widths/tokens/states, readable prose, no repeated filler-card layout, reserved media space and no overlapping fixed elements. Save representative screenshots. | IU-FRAME and every rendered component/page, scoped to its actual output |
| C-05 | Keyboard and touch walkthrough of header/menu/project navigation/form; focus visibility/order/return, Escape, current/expanded states, labels, headings, skip link, captions/alternatives, contrast in default/hover/focus/disabled/error states. Axe on all templates in EN/PL: no unresolved serious/critical violations; manually assess remaining findings. Do not call this certification. | Every rendered component/page before local completion |
| C-06 | Narrow/short/long-content/zoom matrix below: no unintended page overflow, hidden actions, clipped labels, sidebar traps or focus loss. Resize menu open from narrow to wide and back. Check reduced motion and no-JS browsing/email fallback. | Every rendered component/page before local completion |
| C-07 | Vitest/domain plus HTTP integration: required/enumerated/Unicode-boundary fields, malformed JSON, unknown keys, CRLF, wrong method/media, actual streamed oversize input, missing/foreign Origin, forged forwarding headers, rate limit and timeout. Rejections never invoke receiver; response/logs never leak payloads/private diagnostics. | IU-ENQUIRY, within the complete enquiry piece |
| C-08 | Controlled receiver/clock/transport: successful synthetic receipt inspected independently, double-click/concurrent same-ID gives one receipt, changed payload conflicts, pending and uncertain retry preserve ID/bytes, 23-hour retry cutoff, expiry/restart semantics, outage/rate-limit/malformed-provider response, disabled/missing config. Verify Resend request schema/headers against documented contract using controlled transport; assert no real provider calls. | IU-ENQUIRY, within the complete enquiry piece |
| C-09 | Browser: investor Home→Investors→project evidence→investment Contact; direct PL technical arrival→project/company context; partner technical→validation→Partnerships→Contact; AIFIELD→design→examples→demo Contact. Verify editable context, errors preserve input, progress blocks duplicates, fixture success says local-only, unavailable/uncertain states keep email fallback, and late response cannot overwrite a newer state. | Each piece checks available interactions; plan checkpoints combine producer outputs |
| C-10 | Inspect rendered metadata for all 34 preview routes and isolated approved publication fixtures. Verify locale titles/lang/alternates/canonical/share identity, escaping, allowed assets, English x-default, published-only sitemap. Real unreviewed drafts fail published build. Private provenance/inputs/test material/keys absent from public output. Check 404 status and all known 308 path/legacy-fragment arrivals in a browser. | IU-CONTENT mechanisms, page owners’ actual metadata, IU-RECOVERY statuses |
| C-11 | Inspect actual response headers/cache behavior on built HTML/static/API routes. Assert preview loopback guard and noindex, fixture/public-host rejection, configuration secret separation, no PII logs/storage/tracking requests, no external send, fixture expiration/restart deletion and notice matches observed behavior. Do not equate robots/noindex with private access. | IU-RUNTIME/CONTENT/ENQUIRY boundaries and each consuming piece’s actual safe output |
| C-12 | Measure JS/CSS/initial resources against specification budgets; run 3 cold mobile Lighthouse samples each for EN Home and longest PL technical page on built server using default simulated mobile profile. Record median score/LCP/CLS, all individual runs, hardware/runtime/browser profile. Check warm load, font/media failure fallback and slow-network form behavior separately. | Each piece’s resource cost; IU-HOME and longest PL technical-page owner for Lighthouse; CP-SITE final combined result |
| C-13 | Trace page→use case→port→adapter and replace the adapter without page changes. Review/enforce public imports and cycles, domain framework independence, UI props/events, route API usage, single composition root, scoped form/menu state, canceled stale work and private configuration exclusion in actual bundles. | Every unit’s actual structural/public contract; no later architecture audit unit |
| C-14 | Edit a representative record and media caption, confirm review invalidation, local preview update and failed unapproved public export. Repeat seed/import without overwriting edited content. Restore the previous source copy and rebuild; confirm matching route/content identity. Generated output remains disposable; local running output isn't changed by a failed build. | IU-RUNTIME/CONTENT mechanisms plus every content owner’s edit/review evidence |
| C-15 | Execute handover commands from the documented project directory; confirm reproducible local start and recovery, content/feature/adapter extension instructions, environment examples without secrets, artifact locations, factual launch blockers/owners and no claim of actual release/monitoring/live mailbox receipt. | Every component owns its usage/operation documentation; final closure assembles existing records |

Checks C-02/C-04 include content/design judgment and require an actual reading/rendered inspection, not merely a passing schema or screenshot file existing. C-08 provider-contract tests are isolated protocol tests; C-09 with the fixture is local integration. Neither is evidence of real mailbox delivery.

## Representative conditions

| Dimension | Required representative combinations |
| --- | --- |
| All routes | HTTP/render smoke and link/metadata checks for all 34 localized pages |
| Wide | 1440×900: EN Home, Projects, Investors, both overviews, both validation pages, Contact, Privacy |
| Narrow | 390×844: same template coverage in PL; touch; open project/global menus; long Polish labels |
| Small | 320×568: PL Home, longest technical page and invalid Contact form; no unintended horizontal page scrolling |
| Short landscape | 844×390: open navigation, sticky technical contents and form error/success; resize/orient without reload |
| Text/zoom | 200% text/zoom on representative company/detail/form; 400% browser zoom/reflow check at 1280px wide; diagrams retain equivalent readable explanations |
| Browsers | Playwright-pinned Chromium, Firefox and WebKit: one critical journey in each; broader 34-route/axe suite in Chromium; versions saved in report |
| Input | Mouse, emulated touch, full keyboard; no hover-only detail; focus state survives close/resize |
| Navigation | Direct deep link, refresh, Back/Forward, modified/new-tab links, language switch, supplied historic fragments |
| Content robustness | Zero/one/many/reordered projects, long URLs/titles, missing optional imagery/facts, missing translation fixture, invalid/reserved slug |
| Dependencies | Slow or failed image, no remote fonts, no JavaScript, receiver unavailable, timeout after dispatch, malformed upstream JSON, duplicate pending request |
| Motion | Reduced-motion enabled; no essential information depends on transition or animation |
| Data/visibility | Synthetic preview data only; public-host fixture refusal; payload omitted from logs, metadata, cache and browser persistent storage |

## Completion and non-passing results

All required local checks must pass for a verified local completion. An unavailable browser/download/environment condition remains `not checked` with a reason, blocked action, owner and resumption instruction. Do not remove a check or report whole-plan verification complete just to avoid intervention. Continue independent implementation and repairs first.

Report separately: implementation produced, local verification complete/incomplete, provider adapter protocol tested/untested, real delivery not checked, owner content/language review pending, production not published. The run's evidence describes exactly the achieved level.

Keep screenshots, logs and machine reports under `website/artifacts/`; keep the authoritative summarized outcomes under `website/docs/acceptance-report.md`. The execution log links evidence rather than maintaining a competing pass/fail table. Never place synthetic form bodies or credentials in user-facing final reports.
