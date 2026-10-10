# IU-CONTENT: Bilingual content repository and route catalogue

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **Bilingual content repository and route catalogue** as a usable component with the complete concern contract below. This is a concrete shared/runtime component; it does not author the website’s other pages. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-01, OBJ-02, OBJ-03, OBJ-06, OBJ-07, OBJ-08, OBJ-09, OBJ-10. Structural elements: E-01, E-02, E-03, E-09, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/src/content/`
- `website/src/navigation/`
- `website/src/metadata/`
- `website/src/pages/[...path].astro`
- `website/src/pages/sitemap.xml.ts`
- `website/src/pages/robots.txt.ts`
- `website/content/shared/`
- `website/content/schemas/`
- `website/docs/content.md`

## Inputs and dependencies

Runtime host, selected routes.json, source facts and editorial/publication policy. Inputs identify all 17 identities; this unit does not draft or implement all pages.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| IU-RUNTIME.O1 | [Website runtime and build host](01-runtime-host.md) | Implemented public contract and its scoped checks; no hidden dependency on a later discipline phase |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Implement the reusable data component: typed page/shared fact/evidence/media records with EN/PL, stable identity, dated source, maturity and review state. Seed only shared company/project facts actually supported by the context. |
| Functional behavior and state | Expose getPageView, routeFor, equivalentRoute, ancestors, projectPages and contactHref. Track selected identity separately from implemented availability and public eligibility. Register pages incrementally through one API; no false placeholder content or duplicated slug authority. |
| Visual design and responsive layout | No site-wide content-writing or design phase. The data views preserve semantic sections, captions, alternatives, status labels and related links for actual page owners to compose. |
| Interaction and accessibility | Provide localized labels, heading/section identity and missing-translation state as data. Never return English text as a Polish translation. Rendering and keyboard behavior are verified in consuming components. |
| Architecture and implementation | Use strict TypeScript/Zod schemas, pure navigation helpers, build-time projection, and thin Astro route wrappers. Shared contracts never import page internals or provider adapters. Source/provenance and public views have different types. |
| Performance | Compute immutable public projections per build; avoid client-side fetching of source records or eager delivery of all language/page data. Invalidate derived metadata/sitemap when authoritative content changes. |
| Visibility and discovery | Implement metadata serializer, reciprocal alternates/x-default and published-only sitemap from the record catalogue. Preview catalogue can expose local draft routes, while public sitemap stays empty for unapproved drafts. Unknown identity remains an actual missing result. |
| Data and security | Escape metadata; allowlist safe URLs/assets; private source/review fields, materials and secrets cannot pass the public projection. Fail public export when factual/language/asset/data/config prerequisites are absent. |
| Editing and operation | Repository editing is selected. Review invalidates on affected factual/translation/media change. Seeding/import never overwrites authored edits or creates human approval. Explain adding a record, localized route and asset and restoring a prior version. |
| Verification and evidence | Use controlled records to test valid/invalid schemas, route pairs, zero/one/many projects, missing translation, collisions/reserved routes, metadata escaping, public export refusal, private-field absence and edit/import/restore behavior. Record all C-02/C-03/C-10/C-11/C-13/C-14/C-15 scoped results now. |

Selected rule references at the pinned guidelines revision: `ARC-02`, `ARC-03`, `ARC-05`, `ARC-09`, `ARC-12`, `ARC-13`, `ARC-14`, `CMS-01`, `CMS-02`, `CMS-03`, `CMS-04`, `CMS-05`, `CMS-06`, `CMS-07`, `COL-01`, `COL-03`, `COL-04`, `LANG-01`, `LANG-02`, `LANG-03`, `LANG-04`, `LANG-05`, `LANG-06`, `SEC-01`, `SEC-05`, `SEC-06`, `NAV-01`, `NAV-02`, `NAV-03`, `NAV-04`, `NAV-05`, `NAV-07`, `NAV-08`, `NAV-09`, `NAV-10`, `NAV-11`, `NAV-12`, `REL-01`, `REL-02`, `REL-03`, `REL-04`, `REL-06`, `REL-11`, `REL-12`, `PERF-04`, `PERF-05`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-06`, `STR-08`, `STR-09`, `PUR-01`, `PUR-03`, `PUR-04`, `PUR-05`, `PUR-06`, `PUR-07`, `PUR-08`, `TECH-01`, `TECH-03`, `TECH-05`, `TECH-07`, `TECH-08`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-01`, `VIS-02`, `VIS-03`, `VIS-04`, `VIS-05`, `VIS-07`, `VIS-08`, `VIS-09`, `VIS-10`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-CONTENT.A1** — Implement the content schemas, explicit private/public projection and canonical route/navigation API from the supplied registry.
2. **IU-CONTENT.A2** — Implement actual page registration and metadata/sitemap/publication gates, including implemented-versus-selected availability. Do not author the separate pages here.
3. **IU-CONTENT.A3** — Create isolated test records to verify translation fallback, collisions, wrong links, review invalidation and privacy/export behavior, including 0/1/many records.
4. **IU-CONTENT.A4** — Run component tests and document editing/public API contracts; hand stable functions and schemas to every component/page unit.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-CONTENT.O1** is the implemented `Bilingual content repository and route catalogue` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- All selected IDs and EN/PL paths resolve without authoring their pages prematurely.
- Unapproved or incomplete public records fail closed; a preview view contains no private provenance.
- Adding/editing/restoring one record updates its own derived route/metadata without manual changes to unrelated pages.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-02 / IU-CONTENT | Read this piece’s actual EN/PL copy/data and prove its factual, schema and source limits. |
| C-03 / IU-CONTENT | Verify this piece’s identities/links/locale/hierarchy and applicable collection edge cases. |
| C-10 / IU-CONTENT | Check this piece’s actual public projection/metadata/technical route and relevant approval gates. |
| C-11 / IU-CONTENT | Inspect this piece’s relevant safe output, data/headers/configuration and privacy boundaries. |
| C-13 / IU-CONTENT | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-14 / IU-CONTENT | Verify the relevant record edit/review invalidation/restore or host candidate isolation locally. |
| C-15 / IU-CONTENT | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
