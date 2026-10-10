# IU-RECOVERY: Legacy URL redirects and missing-page recovery

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **Legacy URL redirects and missing-page recovery** as a usable component with the complete concern contract below. This is a concrete shared/runtime component; it does not author the website’s other pages. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-01, OBJ-02, OBJ-03, OBJ-04, OBJ-06, OBJ-07, OBJ-08, OBJ-09, OBJ-10. Structural elements: E-01, E-02, E-03, E-04, E-05, E-06, E-09, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/src/pages/404.astro`
- `website/src/navigation/legacy.ts`
- `website/src/middleware.ts (redirect/recovery branch)`
- `website/content/shared/recovery/`
- `website/docs/migration.md`

## Inputs and dependencies

Actual destination components for all known legacy links plus source five-path/four-fragment map; the authoritative route catalogue and shared shell.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| IU-RUNTIME.O1 | [Website runtime and build host](01-runtime-host.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-CONTENT.O1 | [Bilingual content repository and route catalogue](02-content-repository.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FRAME.O1 | [Page frame and shared presentation components](03-page-frame.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-HEADER.O1 | [Global header and language navigation](04-site-header.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FOOTER.O1 | [Global footer and company contact links](05-site-footer.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-AS-OVERVIEW.O1 | [ArtiSense overview page](10-artisense.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-ABOUT.O1 | [About page](21-about.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-PARTNERSHIPS.O1 | [Partnerships page](22-partnerships.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-ENQUIRY.O1 | [Contact and privacy enquiry experience](07-enquiry-experience.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Deliver meaningful English/Polish missing-page copy with Home/Projects/Contact recovery paths and the known incoming-link migration behavior. Do not invent additional editorial scope. |
| Functional behavior and state | Single-hop 308 mapping: /→/en/, /artisense-module/→/pl/projekty/artisense/, /about/→/pl/o-nas/, /partners/→/pl/wspolpraca/, /contact/→/pl/kontakt/. Unknown routes return genuine 404, with PL copy for PL prefix. Do not blanket-redirect misses to Home. |
| Visual design and responsive layout | Use the actual shared frame/header/footer and an uncluttered recovery message; preserve long-URL wrapping, useful actions and narrow/short-screen fit. |
| Interaction and accessibility | Meaningful page heading/title and landmark hierarchy, keyboard-readable recovery links, visible focus and correct lang. Legacy fragment arrival clears sticky header and reaches the intended summary. |
| Architecture and implementation | Own the legacy resolver/error component, keeping repeated paths in the navigation API. Coordinate middleware changes with runtime header/cache guards; pages are not allowed to choose redirects independently. |
| Performance | No redirect chains, client-script-only redirects or blocking dependencies. Error output fits the same resource budgets and contains no unnecessary hydration. |
| Visibility and discovery | Preserve supplied legacy fragments o-module/fotonika/elektronika/technologie on the Polish ArtiSense destination. Unknown content is not canonicalized to Home or added to sitemap. Document that the known map is not a complete historic inventory. |
| Data and security | Escape untrusted path display or omit it. Reject open redirect inputs and do not infer origin from attacker-controlled headers. No domain/DNS/email configuration is modified. |
| Editing and operation | Document exact mapping, fragment behavior, status/case/slash choices and how to extend it from a verified inventory. Domain operator owns later historical evidence; no production migration is claimed. |
| Verification and evidence | Request all mappings and unknown routes on the built host, inspect real status/headers and browser fragment position in EN/PL contexts. Check recovery rendering/keyboard/mobile/metadata and existing middleware consumers now. Final plan-wide checkpoints follow as combined checks, not a separate verification unit. |

Selected rule references at the pinned guidelines revision: `ARC-02`, `ARC-05`, `ARC-07`, `LANG-01`, `LANG-02`, `LANG-03`, `LANG-04`, `LANG-05`, `SEC-05`, `RWD-01`, `RWD-02`, `RWD-03`, `RWD-04`, `RWD-06`, `RWD-08`, `RWD-09`, `RWD-10`, `NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`, `NAV-05`, `NAV-07`, `NAV-08`, `NAV-09`, `NAV-10`, `NAV-11`, `NAV-12`, `A11Y-01`, `A11Y-02`, `A11Y-03`, `A11Y-04`, `A11Y-05`, `A11Y-07`, `A11Y-11`, `REL-11`, `PERF-01`, `PERF-02`, `PERF-06`, `PERF-07`, `PERF-08`, `PERF-10`, `PERF-11`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-08`, `STR-09`, `PUR-02`, `PUR-03`, `TECH-03`, `TECH-05`, `TECH-08`, `TECH-09`, `TECH-10`, `TECH-11`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-01`, `VIS-02`, `VIS-03`, `VIS-04`, `VIS-05`, `VIS-07`, `VIS-08`, `VIS-09`, `VIS-10`, `LAY-01`, `LAY-02`, `LAY-03`, `LAY-04`, `LAY-05`, `LAY-06`, `LAY-07`, `LAY-08`, `LAY-09`, `LAY-10`, `LAY-11`, `LAY-12`, `DES-01`, `DES-02`, `DES-03`, `DES-04`, `DES-05`, `DES-07`, `DES-08`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-RECOVERY.A1** — Implement the legacy mapping and localized 404 component using the already implemented actual destination pages.
2. **IU-RECOVERY.A2** — Bind the resolver to the runtime/navigation boundary without changing unrelated configuration or exposing private data.
3. **IU-RECOVERY.A3** — Test actual 308/404 responses, no chains/open redirects and all four legacy browser fragment arrivals; inspect recovery visual/accessibility/resource behavior.
4. **IU-RECOVERY.A4** — Record exact migration limitations and component evidence, then evaluate all due combined checkpoints and whole-plan completion.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-RECOVERY.O1** is the implemented `Legacy URL redirects and missing-page recovery` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- Every known old path reaches its intended actual localized destination in one redirect.
- Unknown routes retain a real 404 and useful localized recovery without leaking raw untrusted input.
- Legacy fragments land visibly on the Polish overview, and existing headers/cache/privacy contracts still hold.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-02 / IU-RECOVERY | Read this piece’s actual EN/PL copy/data and prove its factual, schema and source limits. |
| C-03 / IU-RECOVERY | Verify this piece’s identities/links/locale/hierarchy and applicable collection edge cases. |
| C-04 / IU-RECOVERY | Inspect actual rendered output and states, including screenshots against the supplied visual direction. |
| C-05 / IU-RECOVERY | Verify this piece’s keyboard/touch/focus/semantics/contrast and scoped axe findings. |
| C-06 / IU-RECOVERY | Exercise narrow/short/long-Polish/zoom/motion/resize states of this component. |
| C-10 / IU-RECOVERY | Check this piece’s actual public projection/metadata/technical route and relevant approval gates. |
| C-11 / IU-RECOVERY | Inspect this piece’s relevant safe output, data/headers/configuration and privacy boundaries. |
| C-12 / IU-RECOVERY | Measure this piece’s actual resource costs/fallbacks; Home and representative longest PL page own Lighthouse samples. |
| C-13 / IU-RECOVERY | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-15 / IU-RECOVERY | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
