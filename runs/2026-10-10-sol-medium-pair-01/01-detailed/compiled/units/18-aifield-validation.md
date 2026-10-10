# IU-AF-VALIDATION: AIFIELD examples and validation page

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **AIFIELD examples and validation page** as a usable component with the complete concern contract below. Page identities: `aifield-validation`. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-01, OBJ-02, OBJ-03, OBJ-04, OBJ-06, OBJ-07, OBJ-08, OBJ-09, OBJ-10. Structural elements: E-02, E-03, E-04, E-05, E-06, E-09, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/content/pages/en/aifield-validation.*`
- `website/content/pages/pl/aifield-validation.*`
- `website/src/templates/aifield-validation/`
- `website/public/media/aifield-validation/`
- `website/docs/pages/aifield-validation.md`

## Inputs and dependencies

Actual shared components and registered content/route contracts; source sitemap brief for AIFIELD examples and validation; written project context and supplied palette/reference visuals. Own local copy/assets are outputs of this unit, not a prerequisite from an earlier content phase.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| IU-CONTENT.O1 | [Bilingual content repository and route catalogue](02-content-repository.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FRAME.O1 | [Page frame and shared presentation components](03-page-frame.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-HEADER.O1 | [Global header and language navigation](04-site-header.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FOOTER.O1 | [Global footer and company contact links](05-site-footer.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-PROJECT-NAV.O1 | [Project reading frame and local navigation](06-project-navigation.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-AF-DESIGN.O1 | [AIFIELD design and simulation page](15-aifield-design.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-AF-AI.O1 | [AIFIELD AI workflows page](16-aifield-ai.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-AF-NEURAL.O1 | [AIFIELD neural field research page](17-aifield-neural.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Author full English and Polish copy for this particular page, including title, description, headings, captions, alternatives and onward labels. Required sections: internal photonic glucose design example; design workflow and outputs; simulation comparison method/conditions available in summary; successes/misses and missing numerical evidence; fabrication/measurement distinction; next validation milestone. Internal design work is not a customer case study or clinical validation. Do not fabricate benchmark figures, external customers or fabricated-chip measurements. |
| Functional behavior and state | Implement native links to aifield-design, aifield-neural, artisense-validation, investors, contact. Use typed route/locale helpers; context CTAs preselect only editable allowlisted intent/project. Own local section anchors and any evidence disclosure; route owns locale/page. No unrelated widgets, galleries, search or account behavior. |
| Visual design and responsive layout | Substantial qualitative worked-example sequence and evidence/limits table, with conceptual output illustration explicitly labeled. Use shared white/mist/ink/purple/teal tokens, declared containers/68ch prose and responsive transformations. Reserve image/diagram space and provide deliberate missing-asset treatment. |
| Interaction and accessibility | One semantic H1, logical headings/reading order, informative accessible diagrams/captions, visible keyboard focus and descriptive links. Render long Polish copy at 390px/320px and short landscape/zoom. Tables scroll only in intentional labeled containers; no hidden primary actions or reduced-motion dependency. |
| Architecture and implementation | Create the page-owned content records/template/assets in the named paths. Register both locale variants through the content API and compose shared frame/header/footer/project navigation. Keep source facts shared by ID and page-specific mappings local; no transport/persistence/provider code in this page. |
| Performance | Pre-render readable content, use no unnecessary page script or remote font. Check this route against 60 KiB gzip JS, 100 KiB gzip CSS, 1 MiB initial resources and 350 KiB hero raster limits. Load visible media deliberately and lazy-load appropriate below-fold media. If this becomes the longest PL technical page, run/recheck the specified three cold mobile Lighthouse samples; otherwise record the selected representative and this page’s actual resource/fallback results. |
| Visibility and discovery | Own routes /en/projects/aifield/examples-validation/ and /pl/projekty/aifield/przyklady-walidacja/. Produce real localized titles/descriptions/share data and correct self/alternate identity from the record, with EN x-default under published serialization and preview noindex now. Validate incoming hierarchy, related hrefs and assets; source/review notes stay private. |
| Data and security | Only safe public projection renders. Do not copy external reference screenshots, fabricate evidence or embed unavailable documents. Record new concept-asset authorship/status privately; text/media escaping, safe links and absence of private fields are part of this page’s check. This editorial page collects no personal data. |
| Editing and operation | Record source date and factual limits; new copy and translations remain unreviewed. Demonstrate editing/approval invalidation on this record, without changing unrelated pages. Document its template/asset ownership and regeneration; no operator fact approval or public publication is fabricated. |
| Verification and evidence | Run C-02/03/04/05/06/09/10/11/12/13/14/15 as applicable to this piece before completion: read actual EN/PL content, inspect desktop/mobile screenshots, keyboard/contrast/zoom, locale/section links, metadata/public projection, assets/failure states, bundle boundary and edit behavior. Verify available onward pages immediately; future destinations use their exact registered contract until the specified combined checkpoint. All checks retain this unit’s scope. |

Selected rule references at the pinned guidelines revision: `ARC-02`, `ARC-05`, `ARC-07`, `ARC-08`, `CMS-01`, `CMS-02`, `CMS-04`, `CMS-06`, `COL-07`, `LANG-01`, `LANG-02`, `LANG-03`, `LANG-04`, `LANG-05`, `LANG-06`, `SEC-05`, `SEC-06`, `RWD-01`, `RWD-02`, `RWD-03`, `RWD-04`, `RWD-06`, `RWD-08`, `RWD-09`, `RWD-10`, `NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`, `NAV-05`, `NAV-07`, `NAV-08`, `NAV-09`, `NAV-10`, `NAV-11`, `NAV-12`, `A11Y-01`, `A11Y-02`, `A11Y-03`, `A11Y-04`, `A11Y-05`, `A11Y-07`, `A11Y-11`, `REL-01`, `REL-03`, `REL-11`, `PERF-01`, `PERF-02`, `PERF-04`, `PERF-06`, `PERF-07`, `PERF-08`, `PERF-10`, `PERF-11`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-08`, `STR-09`, `PUR-01`, `PUR-02`, `PUR-03`, `PUR-05`, `PUR-06`, `PUR-07`, `PUR-08`, `TECH-05`, `TECH-08`, `TECH-09`, `TECH-10`, `TECH-11`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-01`, `VIS-02`, `VIS-03`, `VIS-04`, `VIS-07`, `VIS-08`, `VIS-09`, `VIS-10`, `LAY-01`, `LAY-02`, `LAY-03`, `LAY-04`, `LAY-05`, `LAY-06`, `LAY-07`, `LAY-08`, `LAY-09`, `LAY-10`, `LAY-11`, `LAY-12`, `DES-01`, `DES-02`, `DES-03`, `DES-04`, `DES-05`, `DES-07`, `DES-08`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-AF-VALIDATION.A1** — Read this page’s supplied brief/context and the exact source bounds above; author substantive EN/PL records and original permitted/labeled visuals within this unit.
2. **IU-AF-VALIDATION.A2** — Implement the page template and route registration using the already delivered shared components; add its own metadata, section identity, context links and responsive/accessibility behavior.
3. **IU-AF-VALIDATION.A3** — Run the local content/render/keyboard/responsive/metadata/data/resource/architecture checks on both routes and actual assets; inspect screenshots and repair this piece and affected shared consumers.
4. **IU-AF-VALIDATION.A4** — Exercise the page’s available visitor journey and edit/review invalidation; record named future-target checks only at their defined availability checkpoint, never by making fake destination pages.
5. **IU-AF-VALIDATION.A5** — Save page-specific implementation/evidence and update its contributor/asset documentation. Complete only after its own implementation and scoped checks pass.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-AF-VALIDATION.O1** is the implemented `AIFIELD examples and validation page` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- Both /en/projects/aifield/examples-validation/ and /pl/projekty/aifield/przyklady-walidacja/ render the complete distinct AIFIELD examples and validation content, not filler or source outlines.
- Content preserves the specified factual limits and all required page sections without inventing missing evidence.
- Actual narrow/wide/short/keyboard/zoom behavior, metadata/language links, safe output and resource limits pass for this piece.
- Own docs and record edit/review behavior are verified now; later global checkpoints only exercise combinations with newly available pieces.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-02 / IU-AF-VALIDATION | Read this piece’s actual EN/PL copy/data and prove its factual, schema and source limits. |
| C-03 / IU-AF-VALIDATION | Verify this piece’s identities/links/locale/hierarchy and applicable collection edge cases. |
| C-04 / IU-AF-VALIDATION | Inspect actual rendered output and states, including screenshots against the supplied visual direction. |
| C-05 / IU-AF-VALIDATION | Verify this piece’s keyboard/touch/focus/semantics/contrast and scoped axe findings. |
| C-06 / IU-AF-VALIDATION | Exercise narrow/short/long-Polish/zoom/motion/resize states of this component. |
| C-09 / IU-AF-VALIDATION | Run available visitor interactions now; run named combined journeys when counterpart outputs exist. |
| C-10 / IU-AF-VALIDATION | Check this piece’s actual public projection/metadata/technical route and relevant approval gates. |
| C-11 / IU-AF-VALIDATION | Inspect this piece’s relevant safe output, data/headers/configuration and privacy boundaries. |
| C-12 / IU-AF-VALIDATION | Measure this piece’s actual resource costs/fallbacks; Home and representative longest PL page own Lighthouse samples. |
| C-13 / IU-AF-VALIDATION | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-14 / IU-AF-VALIDATION | Verify the relevant record edit/review invalidation/restore or host candidate isolation locally. |
| C-15 / IU-AF-VALIDATION | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
