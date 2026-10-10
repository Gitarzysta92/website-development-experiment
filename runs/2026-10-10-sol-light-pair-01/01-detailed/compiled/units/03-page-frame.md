# IU-FRAME: Page frame and shared presentation components

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **Page frame and shared presentation components** as a usable component with the complete concern contract below. This is a concrete shared/runtime component; it does not author the website’s other pages. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-01, OBJ-02, OBJ-03, OBJ-04, OBJ-06, OBJ-07, OBJ-08, OBJ-09, OBJ-10. Structural elements: E-04, E-05, E-06, E-09, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/src/layouts/PageFrame.astro`
- `website/src/components/ui/`
- `website/src/styles/`
- `website/public/brand/`
- `website/docs/presentation.md`

## Inputs and dependencies

Runtime/content contracts, supplied palette/CSS, reference board and screenshots. Header/footer are named slots whose components are supplied by their own units.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| IU-RUNTIME.O1 | [Website runtime and build host](01-runtime-host.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-CONTENT.O1 | [Bilingual content repository and route catalogue](02-content-repository.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Deliver the reusable page frame, text wordmark/share fallback and small generic presentation API that actual pages consume. Do not write all page copy or postpone implementation to a later design phase. |
| Functional behavior and state | Frame takes locale, page identity/metadata and semantic header/lead/body/aside/footer slots. UI includes buttons/links, cards, evidence labels, figure/caption, table and labeled form controls. Props/events own local interactions; no product fetching. |
| Visual design and responsive layout | Implement the exact palette, system fonts, 18px/1.6 body, 68ch prose, 1200/1440px containers, 20–48px gutters, spacing/radii and 48/72rem starting breakpoints. Strong readable type and substantial visuals follow the supplied references. Record bounded fit changes centrally. |
| Interaction and accessibility | Skip link, semantic landmarks, one page-supplied H1, 44px standalone controls, focus ring 2px/3px offset, 4.5:1 normal and 3:1 large/control contrast in actual states. Accessible diagram slots, deliberate table scroll, reduced motion and no decorative pointer interception. |
| Architecture and implementation | Generic UI uses explicit inputs/events and scoped CSS. PageFrame owns the outer geometry and regions; pages cannot mutate shell internals. Metadata is rendered from the content API. Header/footer own their behavior separately. |
| Performance | No UI framework hydration or remote font requests. Reserve media dimensions, avoid avoidable shifts, use content-hashed authored assets. Measure component bundle costs and layout stability; preserve the page budgets. |
| Visibility and discovery | Render locale/lang/title/canonical/alternates/share fields supplied by the metadata serializer, with preview noindex. Share fallback is original and versioned, with explicit dimensions and descriptive alternatives where informative. |
| Data and security | Render escaped structured content; no raw arbitrary HTML or untrusted style/URL injection. Assets are original labeled concepts/text, not copied WorkOS/THREESIXTY screenshots or claimed approved product evidence. |
| Editing and operation | Maintain a private rendered reference of real component states and document its inputs/variants. Asset provenance stays private. Update generic owner and affected consumers together; generated output is never hand-edited. |
| Verification and evidence | Render real private component fixtures in EN/PL, including long labels/missing media/error/disabled/empty states. Inspect screenshots, keyboard, contrast, small/short/zoom/reduced motion and metadata. Run C-03/04/05/06/10/12/13/15 before completing this component. |

Selected rule references at the pinned guidelines revision: `ARC-02`, `ARC-05`, `ARC-08`, `ARC-10`, `LANG-01`, `LANG-02`, `LANG-03`, `LANG-04`, `LANG-05`, `SEC-05`, `RWD-01`, `RWD-02`, `RWD-03`, `RWD-04`, `RWD-06`, `RWD-08`, `RWD-09`, `RWD-10`, `NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`, `NAV-05`, `NAV-07`, `NAV-08`, `NAV-09`, `NAV-10`, `NAV-11`, `NAV-12`, `A11Y-01`, `A11Y-02`, `A11Y-03`, `A11Y-04`, `A11Y-05`, `A11Y-07`, `A11Y-11`, `REL-11`, `REL-12`, `PERF-01`, `PERF-02`, `PERF-03`, `PERF-04`, `PERF-06`, `PERF-07`, `PERF-08`, `PERF-10`, `PERF-11`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-08`, `STR-09`, `PUR-03`, `PUR-07`, `TECH-05`, `TECH-08`, `TECH-09`, `TECH-10`, `TECH-11`, `TECH-12`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-01`, `VIS-02`, `VIS-03`, `VIS-04`, `VIS-07`, `VIS-08`, `VIS-09`, `VIS-10`, `LAY-01`, `LAY-02`, `LAY-03`, `LAY-04`, `LAY-05`, `LAY-06`, `LAY-07`, `LAY-08`, `LAY-09`, `LAY-10`, `LAY-11`, `LAY-12`, `DES-01`, `DES-02`, `DES-03`, `DES-04`, `DES-05`, `DES-07`, `DES-08`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-FRAME.A1** — Implement PageFrame and the small set of generic controls, all shared values and semantic region contracts.
2. **IU-FRAME.A2** — Create original text branding and concept-ready figure treatments with private provenance; integrate the public metadata view into the frame.
3. **IU-FRAME.A3** — Build a private fixture using the actual components, including long Polish content and interaction/error states; verify rendered behavior and resource cost.
4. **IU-FRAME.A4** — Document the supported public props/slots/variants and actual checks, then make the frame available to header/footer and page owners.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-FRAME.O1** is the implemented `Page frame and shared presentation components` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- Real reusable components render their stated states without needing future page-specific fixes.
- Keyboard, contrast, long Polish text and 320px/short-screen/zoom layouts work in actual rendered fixtures.
- The component library and frame preserve page semantics, supplied colors, metadata and bundle/privacy boundaries.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-03 / IU-FRAME | Verify this piece’s identities/links/locale/hierarchy and applicable collection edge cases. |
| C-04 / IU-FRAME | Inspect actual rendered output and states, including screenshots against the supplied visual direction. |
| C-05 / IU-FRAME | Verify this piece’s keyboard/touch/focus/semantics/contrast and scoped axe findings. |
| C-06 / IU-FRAME | Exercise narrow/short/long-Polish/zoom/motion/resize states of this component. |
| C-10 / IU-FRAME | Check this piece’s actual public projection/metadata/technical route and relevant approval gates. |
| C-11 / IU-FRAME | Inspect escaped content/metadata, approved asset inputs and exclusion of private fields in the actual rendered frame. |
| C-12 / IU-FRAME | Measure this piece’s actual resource costs/fallbacks; Home and representative longest PL page own Lighthouse samples. |
| C-13 / IU-FRAME | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-15 / IU-FRAME | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
