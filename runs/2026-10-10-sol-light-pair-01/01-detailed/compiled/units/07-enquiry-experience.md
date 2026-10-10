# IU-ENQUIRY: Contact and privacy enquiry experience

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **Contact and privacy enquiry experience** as a usable component with the complete concern contract below. Page identities: `contact`, `privacy`. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-01, OBJ-02, OBJ-03, OBJ-04, OBJ-05, OBJ-06, OBJ-07, OBJ-08, OBJ-09, OBJ-10. Structural elements: E-01, E-02, E-03, E-04, E-05, E-06, E-07, E-08, E-09, E-10, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/content/pages/en/contact.*`
- `website/content/pages/pl/contact.*`
- `website/content/pages/en/privacy.*`
- `website/content/pages/pl/privacy.*`
- `website/src/templates/ContactPage.astro`
- `website/src/templates/PrivacyPage.astro`
- `website/src/features/enquiry/`
- `website/src/pages/api/enquiries.ts`
- `website/docs/enquiry.md`

## Inputs and dependencies

Runtime/config host, content/route API, shared UI/header/footer, source enquiry contract and ENQ-1.0. No live key, verified sender, approved data policy, operator or external-send authority is supplied.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| IU-RUNTIME.O1 | [Website runtime and build host](01-runtime-host.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-CONTENT.O1 | [Bilingual content repository and route catalogue](02-content-repository.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FRAME.O1 | [Page frame and shared presentation components](03-page-frame.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-HEADER.O1 | [Global header and language navigation](04-site-header.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FOOTER.O1 | [Global footer and company contact links](05-site-footer.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Deliver Contact and the accompanying truthful Privacy page in both languages, the public email alternative, complete validation/error/receipt copy and data notice. Investment is at company level; demo/partnership/general intent stays editable. |
| Functional behavior and state | Implement UI→same-origin endpoint→pure use case→receiver port→fixture/disabled/Resend adapter in this one unit. Required intent/email/message/locale/submissionId; optional project/name/organization; empty honeypot. Enforce 20–5000 message code points, 254 email chars, 100/150 name/org limits, exact enum/UUID and CRLF rejection. |
| Visual design and responsive layout | Compose an inviting complete Contact page using the supplied palette and shared controls, with clear action hierarchy and always-visible email. Error/pending/accepted/unavailable/uncertain states fit mobile/short screens; Privacy stays readable 68ch prose with useful links. |
| Interaction and accessibility | Visible labels, associated hints/errors, focusable error summary, status announcement, meaningful buttons, keyboard/touch and no-JS email fallback. Progress prevents accidental duplicate clicks; errors retain input. EN/PL notices describe the actual result. |
| Architecture and implementation | Keep validation/domain pure, orchestration on the port, provider protocol in server adapters and selection at one composition root. Form/ID live in page memory, menu remains header-owned; cancel/ignore late results. No framework dependency in pure contracts and no server import in the browser. |
| Performance | Bound upstream wait to 10 seconds and browser wait to 12. Retain original request bytes/ID for uncertain retry within 23 hours; no automatic resend afterward. Avoid artificial loading delays and respect route JS/CSS/media budgets. |
| Visibility and discovery | Produce localized Contact/Privacy titles/descriptions, language pairs/share data and preview noindex through the public view. Context URL allowlist is intent/project only; inline success creates no indexable route. Privacy must never be replaced with generic invented legal copy. |
| Data and security | POST JSON only, actual streamed body cap 32 KiB, trusted-origin validation, safe method/media/field errors, no arbitrary forwarding trust, 5 attempts/minute per direct peer in this local process. No payloads in logs/storage/URLs. Fixture is loopback-only/synthetic and in-memory, expires in 24h and clears on restart; real send cannot activate without explicit prerequisites. |
| Editing and operation | Fixture uses atomic ID/payload acceptance and inspectable test receipts; duplicate same payload returns one receipt, changed payload conflicts. Implement disabled unavailable and Resend fixed-destination/idempotency/validated-reply mapping with controlled transport. Confirmation distinguishes local receipt, provider acceptance and mailbox delivery. Document actual cleanup, modes, data flow and live activation gaps now. |
| Verification and evidence | Run pure/schema/endpoint/adapter and actual browser checks for valid/invalid input, duplicate concurrent click, uncertainty/retry/cutoff, bad upstream success, timeout/outage/throttle, config rejection and no payload leakage. Independently inspect the local receipt and test all UI states in EN/PL. Verify both pages’ copy, metadata, keyboard, responsive layout, resource limits and edit/review behavior in this same unit. |

Selected rule references at the pinned guidelines revision: `ARC-02`, `ARC-03`, `ARC-04`, `ARC-05`, `ARC-06`, `ARC-07`, `ARC-08`, `ARC-10`, `ARC-12`, `ARC-13`, `ARC-15`, `CMS-01`, `CMS-02`, `CMS-04`, `CMS-06`, `FORM-01`, `FORM-02`, `FORM-03`, `FORM-04`, `FORM-05`, `FORM-06`, `FORM-07`, `FORM-08`, `LANG-01`, `LANG-02`, `LANG-03`, `LANG-04`, `LANG-05`, `LANG-06`, `DATA-01`, `DATA-06`, `DATA-07`, `DATA-08`, `SEC-01`, `SEC-03`, `SEC-04`, `SEC-05`, `SEC-06`, `SEC-07`, `SEC-08`, `RWD-01`, `RWD-02`, `RWD-03`, `RWD-04`, `RWD-06`, `RWD-08`, `RWD-09`, `RWD-10`, `NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`, `NAV-05`, `NAV-07`, `NAV-08`, `NAV-09`, `NAV-10`, `NAV-11`, `NAV-12`, `A11Y-01`, `A11Y-02`, `A11Y-03`, `A11Y-04`, `A11Y-05`, `A11Y-07`, `A11Y-11`, `OBS-01`, `OBS-09`, `REL-01`, `REL-03`, `REL-08`, `REL-11`, `PERF-01`, `PERF-02`, `PERF-04`, `PERF-05`, `PERF-06`, `PERF-07`, `PERF-08`, `PERF-09`, `PERF-10`, `PERF-11`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-06`, `STR-08`, `STR-09`, `PUR-01`, `PUR-02`, `PUR-03`, `PUR-05`, `PUR-06`, `PUR-07`, `PUR-08`, `TECH-01`, `TECH-02`, `TECH-03`, `TECH-04`, `TECH-05`, `TECH-06`, `TECH-07`, `TECH-08`, `TECH-09`, `TECH-10`, `TECH-11`, `TECH-12`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-01`, `VIS-02`, `VIS-03`, `VIS-04`, `VIS-07`, `VIS-08`, `VIS-09`, `VIS-10`, `LAY-01`, `LAY-02`, `LAY-03`, `LAY-04`, `LAY-05`, `LAY-06`, `LAY-07`, `LAY-08`, `LAY-09`, `LAY-10`, `LAY-11`, `LAY-12`, `DES-01`, `DES-02`, `DES-03`, `DES-04`, `DES-05`, `DES-07`, `DES-08`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-ENQUIRY.A1** — Author the EN/PL Contact/Privacy content and data notice, implement their page composition/metadata, and register the four routes.
2. **IU-ENQUIRY.A2** — Implement the pure ENQ-1.0 domain/use case/port, server endpoint and fixture/disabled/Resend adapters with validation, idempotency, bounded waits and data boundaries.
3. **IU-ENQUIRY.A3** — Implement the actual form controller, all localized outcome states, editable contextual input and email alternative; wire it end-to-end to the receiver without real mail.
4. **IU-ENQUIRY.A4** — Run the full meaningful domain/HTTP/browser/failure matrix and inspect receipt separately from UI success; fix both front and back within this unit.
5. **IU-ENQUIRY.A5** — Verify the four page outputs’ visual/accessibility/metadata/performance/privacy concerns, then document operation/configuration/cleanup and save evidence before completion.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-ENQUIRY.O1** is the implemented `Contact and privacy enquiry experience` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- A synthetic browser submission is independently received exactly once; UI truthfully says no email was sent.
- Invalid/uncertain/failed requests retain input and support safe bounded recovery; duplicate and late responses cannot corrupt state.
- Both Contact and Privacy are complete bilingual page implementations, with matching actual data behavior and metadata.
- Provider protocol tests pass without external sending; live mailbox delivery and owner policy approval remain explicitly not checked.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-01 / IU-ENQUIRY | Install/build/start or reproduce this runtime contract; do not claim future website behavior. |
| C-02 / IU-ENQUIRY | Read this piece’s actual EN/PL copy/data and prove its factual, schema and source limits. |
| C-03 / IU-ENQUIRY | Verify this piece’s identities/links/locale/hierarchy and applicable collection edge cases. |
| C-04 / IU-ENQUIRY | Inspect actual rendered output and states, including screenshots against the supplied visual direction. |
| C-05 / IU-ENQUIRY | Verify this piece’s keyboard/touch/focus/semantics/contrast and scoped axe findings. |
| C-06 / IU-ENQUIRY | Exercise narrow/short/long-Polish/zoom/motion/resize states of this component. |
| C-07 / IU-ENQUIRY | Enquiry-owned schema and trusted HTTP boundary rejection/limit tests; no page-only mock substitute. |
| C-08 / IU-ENQUIRY | Enquiry-owned receiver, idempotency, uncertainty/timeout and isolated provider protocol checks. |
| C-09 / IU-ENQUIRY | Run available visitor interactions now; run named combined journeys when counterpart outputs exist. |
| C-10 / IU-ENQUIRY | Check this piece’s actual public projection/metadata/technical route and relevant approval gates. |
| C-11 / IU-ENQUIRY | Inspect this piece’s relevant safe output, data/headers/configuration and privacy boundaries. |
| C-12 / IU-ENQUIRY | Measure this piece’s actual resource costs/fallbacks; Home and representative longest PL page own Lighthouse samples. |
| C-13 / IU-ENQUIRY | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-14 / IU-ENQUIRY | Verify the relevant record edit/review invalidation/restore or host candidate isolation locally. |
| C-15 / IU-ENQUIRY | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
