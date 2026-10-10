# IU-FOOTER: Global footer and company contact links

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **Global footer and company contact links** as a usable component with the complete concern contract below. This is a concrete shared/runtime component; it does not author the website’s other pages. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-01, OBJ-02, OBJ-03, OBJ-04, OBJ-06, OBJ-07, OBJ-09, OBJ-10. Structural elements: E-02, E-03, E-04, E-05, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/src/partials/SiteFooter.astro`
- `website/content/shared/footer/`
- `website/docs/footer.md`

## Inputs and dependencies

Shared company facts, route/locale catalogue and PageFrame. No confirmed legal identity, public team roster or verified mailbox operator is supplied.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| IU-CONTENT.O1 | [Bilingual content repository and route catalogue](02-content-repository.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |
| IU-FRAME.O1 | [Page frame and shared presentation components](03-page-frame.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Provide complete EN/PL footer labels and concise factual company/project context. Group the ten core destinations, two project overviews, Contact, Privacy and the supplied candidate public email. Omit unsupported address/legal/team/partner facts. |
| Functional behavior and state | Native localized links and mailto; no redundant nested card actions. New eligible core content is included from the catalogue, with stable project order. |
| Visual design and responsive layout | Use the selected ink footer/white text, aligned shared container and deliberate column-to-stack responsive behavior. Long Polish labels/email wrap without clipping. |
| Interaction and accessibility | A labeled navigation landmark, visible inverse focus, readable contrast and coherent keyboard order. Email has an understandable name; color alone conveys no state. |
| Architecture and implementation | Application-aware footer consumes shared facts/navigation; no copies of company details in individual pages and no external data fetching. |
| Performance | Static markup/CSS and no browser controller, third-party embeds or remote font request. Contribute within shared style/media budgets. |
| Visibility and discovery | Correct locale destinations, meaningful crawlable anchor text and selected core-page coverage; Privacy is a utility link without a forced conversion CTA. |
| Data and security | Only intended public-view fields render. Candidate email remains an unverified operator input; do not test by sending a message or expose private source records. |
| Editing and operation | Document shared fact/location ownership and destination registration, including zero/one/many project robustness fixtures and unsupported detail omission. |
| Verification and evidence | Check actual EN/PL rendered footer at narrow/short/zoom sizes, all href identities, keyboard/contrast, long email wrapping and private-data absence. The owning unit records content/render/layout checks now. |

Selected rule references at the pinned guidelines revision: `ARC-02`, `ARC-05`, `ARC-10`, `LANG-01`, `LANG-02`, `LANG-03`, `LANG-04`, `LANG-05`, `RWD-01`, `RWD-02`, `RWD-03`, `RWD-04`, `RWD-06`, `RWD-08`, `RWD-09`, `RWD-10`, `NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`, `NAV-05`, `NAV-07`, `NAV-08`, `NAV-09`, `NAV-10`, `NAV-11`, `NAV-12`, `A11Y-01`, `A11Y-02`, `A11Y-03`, `A11Y-04`, `A11Y-05`, `A11Y-07`, `A11Y-11`, `REL-11`, `REL-12`, `PERF-01`, `PERF-02`, `PERF-06`, `PERF-07`, `PERF-08`, `PERF-10`, `PERF-11`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-08`, `STR-09`, `PUR-01`, `PUR-03`, `PUR-05`, `PUR-06`, `PUR-08`, `TECH-05`, `TECH-08`, `TECH-09`, `TECH-10`, `TECH-11`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-09`, `LAY-01`, `LAY-02`, `LAY-03`, `LAY-04`, `LAY-05`, `LAY-06`, `LAY-07`, `LAY-08`, `LAY-09`, `LAY-10`, `LAY-11`, `LAY-12`, `DES-01`, `DES-02`, `DES-03`, `DES-04`, `DES-05`, `DES-07`, `DES-08`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-FOOTER.A1** — Implement the data-driven localized footer and deliberately limited company contact information.
2. **IU-FOOTER.A2** — Bind it to the frame footer slot, with responsive grouping and inverse focus states.
3. **IU-FOOTER.A3** — Render/test long and incomplete optional facts plus project-count fixtures, ensuring no guessed data or broken controls.
4. **IU-FOOTER.A4** — Record actual visual/accessibility/link checks and document the single shared fact owner.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-FOOTER.O1** is the implemented `Global footer and company contact links` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- Footer displays only supplied supportable facts and properly localized navigation.
- All core destinations and email/Privacy are reachable with keyboard and narrow layouts.
- Missing company/legal/portrait information produces deliberate omission, not invented placeholders.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-02 / IU-FOOTER | Read this piece’s actual EN/PL copy/data and prove its factual, schema and source limits. |
| C-03 / IU-FOOTER | Verify this piece’s identities/links/locale/hierarchy and applicable collection edge cases. |
| C-04 / IU-FOOTER | Inspect actual rendered output and states, including screenshots against the supplied visual direction. |
| C-05 / IU-FOOTER | Verify this piece’s keyboard/touch/focus/semantics/contrast and scoped axe findings. |
| C-06 / IU-FOOTER | Exercise narrow/short/long-Polish/zoom/motion/resize states of this component. |
| C-12 / IU-FOOTER | Measure this piece’s actual resource costs/fallbacks; Home and representative longest PL page own Lighthouse samples. |
| C-13 / IU-FOOTER | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-15 / IU-FOOTER | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
