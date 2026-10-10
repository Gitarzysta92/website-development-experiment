# IU-PROJECT-NAV: Project reading frame and local navigation

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **Project reading frame and local navigation** as a usable component with the complete concern contract below. This is a concrete shared/runtime component; it does not author the website’s other pages. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-02, OBJ-03, OBJ-04, OBJ-06, OBJ-07, OBJ-09, OBJ-10. Structural elements: E-02, E-03, E-04, E-05, E-06, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/src/layouts/ProjectFrame.astro`
- `website/src/partials/ProjectNavigation.astro`
- `website/src/partials/Breadcrumbs.astro`
- `website/src/partials/ContentsNavigation.astro`
- `website/docs/project-navigation.md`

## Inputs and dependencies

Shared frame/header/footer, typed hierarchy/sibling/section APIs. The unit owns reusable navigation/reading components, not the copy of every project page.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| IU-CONTENT.O1 | [Bilingual content repository and route catalogue](02-content-repository.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FRAME.O1 | [Page frame and shared presentation components](03-page-frame.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-HEADER.O1 | [Global header and language navigation](04-site-header.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FOOTER.O1 | [Global footer and company contact links](05-site-footer.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Expose project identity, Overview/Przegląd, sibling labels, breadcrumbs and section titles in EN/PL. Support distinct ArtiSense and AIFIELD child sets without imposing symmetry. |
| Functional behavior and state | Generate ancestors/siblings/active selection from stable IDs; provide a mobile disclosure and optional section links. Keep native navigation behavior; no automatic previous/next wrapping or gallery. |
| Visual design and responsive layout | 68ch prose with declared aside width inside the shared shell; local navigation stacks on narrow screens, sticky aside returns to normal flow when vertically constrained. Reserve header/anchor offsets. |
| Interaction and accessibility | Labeled navigation/current state, meaningful breadcrumb ancestry, keyboard disclosure/focus recovery, large controls and retained reading order. Scroll containers only where explicitly needed and tested. |
| Architecture and implementation | ProjectFrame consumes named page regions and content/navigation views; page-owned bodies remain local. Shell/layout selects the aside without pages rewriting unrelated state. |
| Performance | Static links with minimal disclosure code; avoid synchronous scroll polling. No navigation jump on initialization or hidden offscreen animation work. |
| Visibility and discovery | Deep-link arrival always exposes project and company context; exact locale/section identity drives links. Current page title is not duplicated as an extra H1. |
| Data and security | No collection, persistent preference or external provider access. Render escaped labels/section IDs only, not arbitrary fragment markup. |
| Editing and operation | Document adding a sibling or section through registered content and behavior for zero/one/many/long entries. Existing page consumers reuse the same contract. |
| Verification and evidence | Test the actual reading frame with both project hierarchies and long Polish synthetic copy, short screens, anchors, resize, keyboard and touch. Inspect render/metadata/heading composition with the shared shell before handing it to project pages. |

Selected rule references at the pinned guidelines revision: `ARC-02`, `ARC-05`, `ARC-08`, `ARC-10`, `COL-03`, `COL-07`, `LANG-01`, `LANG-02`, `LANG-03`, `LANG-04`, `LANG-05`, `RWD-01`, `RWD-02`, `RWD-03`, `RWD-04`, `RWD-06`, `RWD-08`, `RWD-09`, `RWD-10`, `NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`, `NAV-05`, `NAV-07`, `NAV-08`, `NAV-09`, `NAV-10`, `NAV-11`, `NAV-12`, `A11Y-01`, `A11Y-02`, `A11Y-03`, `A11Y-04`, `A11Y-05`, `A11Y-07`, `A11Y-11`, `REL-11`, `REL-12`, `PERF-01`, `PERF-02`, `PERF-06`, `PERF-07`, `PERF-08`, `PERF-09`, `PERF-10`, `PERF-11`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-08`, `STR-09`, `PUR-03`, `TECH-04`, `TECH-05`, `TECH-06`, `TECH-08`, `TECH-09`, `TECH-10`, `TECH-11`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-09`, `LAY-01`, `LAY-02`, `LAY-03`, `LAY-04`, `LAY-05`, `LAY-06`, `LAY-07`, `LAY-08`, `LAY-09`, `LAY-10`, `LAY-11`, `LAY-12`, `DES-01`, `DES-02`, `DES-03`, `DES-04`, `DES-05`, `DES-07`, `DES-08`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-PROJECT-NAV.A1** — Implement ProjectFrame, breadcrumbs, sibling navigation and table-of-contents using declared identity APIs.
2. **IU-PROJECT-NAV.A2** — Integrate the real header/footer/frame and implement responsive/short-height/anchor behavior in their shared owners.
3. **IU-PROJECT-NAV.A3** — Test zero/one/many siblings, direct technical identity, long Polish text and reading order using private component fixtures.
4. **IU-PROJECT-NAV.A4** — Record focused rendered/keyboard/navigation/performance checks and the extension contract.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-PROJECT-NAV.O1** is the implemented `Project reading frame and local navigation` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- All project pages can consume a complete, accessible reading/navigation component.
- Short landscape never traps the contents list or obscures the final control.
- Ancestor/sibling/section links stay consistent with the canonical hierarchy and EN/PL equivalents.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-03 / IU-PROJECT-NAV | Verify this piece’s identities/links/locale/hierarchy and applicable collection edge cases. |
| C-04 / IU-PROJECT-NAV | Inspect actual rendered output and states, including screenshots against the supplied visual direction. |
| C-05 / IU-PROJECT-NAV | Verify this piece’s keyboard/touch/focus/semantics/contrast and scoped axe findings. |
| C-06 / IU-PROJECT-NAV | Exercise narrow/short/long-Polish/zoom/motion/resize states of this component. |
| C-12 / IU-PROJECT-NAV | Measure this piece’s actual resource costs/fallbacks; Home and representative longest PL page own Lighthouse samples. |
| C-13 / IU-PROJECT-NAV | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-15 / IU-PROJECT-NAV | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
