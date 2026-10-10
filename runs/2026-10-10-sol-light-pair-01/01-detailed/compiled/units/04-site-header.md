# IU-HEADER: Global header and language navigation

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **Global header and language navigation** as a usable component with the complete concern contract below. This is a concrete shared/runtime component; it does not author the website’s other pages. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-02, OBJ-03, OBJ-04, OBJ-06, OBJ-07, OBJ-09, OBJ-10. Structural elements: E-03, E-04, E-05, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/src/partials/SiteHeader.astro`
- `website/src/partials/site-header.ts`
- `website/content/shared/navigation/`
- `website/docs/header.md`

## Inputs and dependencies

Typed route and locale APIs, PageFrame and generic controls. Header receives current page/locale and implemented navigation availability, not page internals.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| IU-CONTENT.O1 | [Bilingual content repository and route catalogue](02-content-repository.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FRAME.O1 | [Page frame and shared presentation components](03-page-frame.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Company wordmark, Projects/Investors/Approach/About, primary investment action, EN/Polski switch and mobile utility destinations have complete localized labels. |
| Functional behavior and state | Use real links and a disclosure button. Selected/expanded state, Escape close/focus return and resize reconciliation live in the header. Language switch targets the equivalent content identity and optional matching section; explicit language choice is never overridden. |
| Visual design and responsive layout | Compose strong, restrained white/mist header with purple CTA, stable geometry and shared widths. Long Polish labels wrap or collapse at actual fit; a short-screen menu stays reachable without covering essential content. |
| Interaction and accessibility | Keyboard/touch/mouse access, visible focus, meaningful names, current-page semantics and no hover-only paths. Disclosure has correct control relationship and no modal focus trap. Single destination wordmark is one link. |
| Architecture and implementation | Application-aware partial consumes the public navigation API and generic UI; only transient menu state is owned here. No page imports, duplicated path building or external services. |
| Performance | One small DOM controller, cleaned listeners and no animation/layout thrashing. No preference persistence, remote assets or unnecessary prefetch; record actual script contribution to budgets. |
| Visibility and discovery | Links are crawlable native anchors with correct locale paths; all destination identities are validated even before the corresponding page is implemented. |
| Data and security | No collected data, local-storage identity or personal URL values. CTA context uses only the allowed intent/project enums. Safe URI construction comes from the route API. |
| Editing and operation | Document menu and locale-switch state/props, how a new registered destination appears, and which existing pages require rechecks after header changes. |
| Verification and evidence | Render the actual header on an EN and long-label PL fixture; test keyboard/Escape/focus/resize/touch/direct-link/new-tab behavior and language pairing, plus bundle cost. Later available-route checkpoints verify navigation into actual completed pages without deferring header tests. |

Selected rule references at the pinned guidelines revision: `ARC-02`, `ARC-05`, `ARC-10`, `LANG-01`, `LANG-02`, `LANG-03`, `LANG-04`, `LANG-05`, `RWD-01`, `RWD-02`, `RWD-03`, `RWD-04`, `RWD-06`, `RWD-08`, `RWD-09`, `RWD-10`, `NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`, `NAV-05`, `NAV-07`, `NAV-08`, `NAV-09`, `NAV-10`, `NAV-11`, `NAV-12`, `A11Y-01`, `A11Y-02`, `A11Y-03`, `A11Y-04`, `A11Y-05`, `A11Y-07`, `A11Y-11`, `REL-11`, `REL-12`, `PERF-01`, `PERF-02`, `PERF-06`, `PERF-07`, `PERF-08`, `PERF-09`, `PERF-10`, `PERF-11`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-08`, `STR-09`, `PUR-03`, `TECH-04`, `TECH-05`, `TECH-06`, `TECH-08`, `TECH-09`, `TECH-10`, `TECH-11`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-09`, `LAY-01`, `LAY-02`, `LAY-03`, `LAY-04`, `LAY-05`, `LAY-06`, `LAY-07`, `LAY-08`, `LAY-09`, `LAY-10`, `LAY-11`, `LAY-12`, `DES-01`, `DES-02`, `DES-03`, `DES-04`, `DES-05`, `DES-07`, `DES-08`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-HEADER.A1** — Implement localized header markup, route-derived links and disclosure controller with complete state transitions.
2. **IU-HEADER.A2** — Bind it to the PageFrame header slot and locale/page inputs; keep its state within the partial.
3. **IU-HEADER.A3** — Verify expanded/collapsed/focus/resize states, exact destinations and EN↔PL identity mapping at wide/narrow/short sizes.
4. **IU-HEADER.A4** — Save evidence and update header consumer documentation before declaring this component complete.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-HEADER.O1** is the implemented `Global header and language navigation` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- The header is a usable component in both languages with no hover dependency.
- Switching a technical-page identity selects its technical equivalent, never Home.
- Open-menu resize and Escape recover focus/state, and unknown CTA values cannot enter URLs.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-03 / IU-HEADER | Verify this piece’s identities/links/locale/hierarchy and applicable collection edge cases. |
| C-04 / IU-HEADER | Inspect actual rendered output and states, including screenshots against the supplied visual direction. |
| C-05 / IU-HEADER | Verify this piece’s keyboard/touch/focus/semantics/contrast and scoped axe findings. |
| C-06 / IU-HEADER | Exercise narrow/short/long-Polish/zoom/motion/resize states of this component. |
| C-12 / IU-HEADER | Measure this piece’s actual resource costs/fallbacks; Home and representative longest PL page own Lighthouse samples. |
| C-13 / IU-HEADER | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-15 / IU-HEADER | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
