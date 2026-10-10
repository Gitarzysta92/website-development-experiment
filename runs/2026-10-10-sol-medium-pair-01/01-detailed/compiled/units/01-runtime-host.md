# IU-RUNTIME: Website runtime and build host

Component contract revision `1.0`; plan [AF-D1 revision 1.1](../implementation-plan.md). Owner: execution agent. Contract state: complete; implementation and all checks: not started / not checked.

## Implemented piece and scope

Implement **Website runtime and build host** as a usable component with the complete concern contract below. This is a concrete shared/runtime component; it does not author the website’s other pages. Its result is implemented behavior and verified outputs, not a content/design/backend/QA phase handed to another unit.

Objectives: OBJ-06, OBJ-07, OBJ-08, OBJ-09, OBJ-10. Structural elements: E-01, E-08, E-09, E-11, E-12; concrete locations below specialize [AF-STRUCT-1.1](../solution-structure.md). All paths are inside the future `website/` project.

- `website/astro.config.mjs`
- `website/package.json`
- `website/package-lock.json`
- `website/scripts/runtime/`
- `website/src/config/`
- `website/src/middleware.ts`
- `website/docs/runtime.md`

## Inputs and dependencies

Pinned toolchain and complete package. Runtime/package/browser access is an environment prerequisite; no business/provider account is needed.

| Required input | Producer | Availability / boundary |
| --- | --- | --- |
| Source package / runtime access | Experiment operator and supplied inputs | Actual environment and exact package available |

Shared records: [AF-SPEC-1.1](../specification.md), [AF-DEC-1.1 / AF-EP-1.0](../decisions.md), [routes](../routes.json), [toolchain](../toolchain.json), [source context](../../inputs/content/project-context.md), [sitemap](../../inputs/docs/sitemap.md), [palette](../../inputs/design-system/palette.json), [visual references](../../inputs/references/mockup-references.md). These bind values and source permissions; they do not delegate this piece’s content/design/security/testing work elsewhere.

## Complete concern contract

| Concern | Concrete responsibility of this piece |
| --- | --- |
| Purpose and content | Deliver the actual local host/build component for the investor website. It serves authored pages and the enquiry endpoint without exposing the preparation workspace. No visitor copy is owned here. |
| Functional behavior and state | Install exact direct pins, generate the lockfile, implement loopback dev/start and validated preview/published profiles. Build a candidate artifact separately; a failed build must not replace the usable artifact. A free local port may be selected and recorded. |
| Visual design and responsive layout | No public visual component. Preserve authored CSS/assets without rewriting presentation. A private synthetic HTML fixture is allowed for testing host behavior; it is not an editorial page. |
| Interaction and accessibility | Verify transport and server response integrity; visual/keyboard behavior belongs to consuming components. Do not claim accessibility certification for this infrastructure. |
| Architecture and implementation | Astro static editorial output plus standalone Node adapter; explicit bootstrap, private/public config and one server composition boundary. Implement real command discovery and check runners, with no unconditional success placeholders or empty architectural layers. |
| Performance | Content-hashed assets can be immutable; preview HTML/API responses are no-store. No optional tracking/font/runtime service dependency. Supply resource-measurement and pinned browser/Lighthouse command support; each component runs its own checks. |
| Visibility and discovery | Loopback preview and noindex/robots policy are enforced as actual responses. Public profile requires explicit verified origin and the content gate supplied by IU-CONTENT. No hosting, DNS or publication is performed. |
| Data and security | Keep environment secrets outside browser output and source control; validate Host/origin config, body-limit plumbing and required response headers/CSP. Reject fixture/public-host or published-fixture combinations once the enquiry adapter is bound. |
| Editing and operation | Document exact install/dev/check/build/start commands and generated locations; prove npm ci and candidate failure isolation using synthetic artifacts. Document local source/build restore and environment blockers here, not in a later handover unit. |
| Verification and evidence | Run C-01/C-11/C-12 infrastructure portions/C-13/C-14/C-15 now against the actual host and controlled fixtures. Save command output, response headers and source/config identity; later consumer checkpoints recheck host behavior with real pages. |

Selected rule references at the pinned guidelines revision: `ARC-01`, `ARC-02`, `ARC-05`, `ARC-06`, `ARC-15`, `DATA-06`, `SEC-01`, `SEC-04`, `SEC-06`, `SEC-07`, `OBS-09`, `REL-01`, `REL-02`, `REL-04`, `REL-06`, `REL-08`, `REL-11`, `PERF-01`, `PERF-02`, `PERF-04`, `PERF-05`, `PERF-06`, `PERF-07`, `PERF-08`, `PERF-10`, `PERF-11`, `STR-01`, `STR-02`, `STR-03`, `STR-04`, `STR-05`, `STR-06`, `STR-07`, `STR-08`, `STR-09`, `TECH-07`, `TECH-13`, `TECH-14`, `TECH-15`, `QA-01`, `QA-02`, `QA-03`, `QA-04`, `QA-05`, `VIS-01`, `VIS-03`. [Rule coverage](../rule-coverage.csv) links authoritative definitions and participating components. Apply each rule to this component’s actual responsibility; do not add absent capabilities merely to make a rule apply.

## Compiled implementation actions

1. **IU-RUNTIME.A1** — Implement the pinned project runtime, installation lock, configuration guards, candidate build/select mechanism and safe static/endpoint host.
2. **IU-RUNTIME.A2** — Implement command entrypoints and actual error propagation for content, import, browser, accessibility, resource and performance checks; expose scoped execution so each owner verifies its component.
3. **IU-RUNTIME.A3** — Use private synthetic content to exercise startup, unknown-route status, safe headers, cache behavior, config rejection, failed candidate isolation and restore. Do not create stub launch pages.
4. **IU-RUNTIME.A4** — Run the runtime checks and document usable commands, limits and evidence before handing the host to its consumers.

These actions specialize the pinned create-website design/implementation/verification/operating obligations and add-page-or-feature composition/check steps **within this component**. The workflow describes concerns in the unit; it is not the unit partition. Use the execution workflow for records, eligibility and defects.

## Outputs and acceptance checks

**IU-RUNTIME.O1** is the implemented `Website runtime and build host` at its named paths, including its owned content/assets/configuration where applicable, full concern behavior, scoped tests and actual evidence, and its contributor/operating documentation. Consumers use this output through the declared public contract.

- Pinned install and npm ci produce a runnable actual host; failed commands fail visibly.
- Unsafe public/fixture configuration is refused and private workspace content is never served.
- A failed candidate leaves the prior local artifact usable; restore instructions reproduce its source/content identity.

| Scoped check | Execute before this unit is complete |
| --- | --- |
| C-01 / IU-RUNTIME | Install/build/start or reproduce this runtime contract; do not claim future website behavior. |
| C-11 / IU-RUNTIME | Inspect this piece’s relevant safe output, data/headers/configuration and privacy boundaries. |
| C-12 / IU-RUNTIME | Measure this piece’s actual resource costs/fallbacks; Home and representative longest PL page own Lighthouse samples. |
| C-13 / IU-RUNTIME | Verify actual imports, component public API, state/runtime ownership and affected consumers. |
| C-14 / IU-RUNTIME | Verify the relevant record edit/review invalidation/restore or host candidate isolation locally. |
| C-15 / IU-RUNTIME | Verify this component’s actual usage/extension/operation instructions and record its remaining prerequisites. |

Use the [verification procedures and conditions](../verification.md) with each check scoped to this piece. Run the relevant real commands from `website/`; component/browser fixtures use actual implementation, not a separate mock presentation. A local check passes only from observed results, not from a named test file or a plan.

For a link to a selected page not implemented yet, verify the exact registered destination now and record its real-destination observation at the plan checkpoint when both pieces exist. No placeholder page or fake receipt satisfies that observation. This is an explicit cross-component dependency; it does not postpone this piece’s own content, styling, behavior or checks.

Record output paths/version, actions and attempts in `website/docs/execution-record.md`. Record scoped rule/check outcomes and actual conditions in `website/docs/acceptance-report.md`; save raw evidence in `website/artifacts/`. Document the component now rather than waiting for a global handover phase. Shared defects are repaired at their owner and affected consumers rechecked.

## Completion and revisions

Complete this unit only when its own complete concern contract, outputs and scoped checks pass. Pending combined observations remain visible in the plan and prevent whole-site completion until resolved. Missing environment prerequisites block affected checks honestly; continue independent authorized actions.

Routine repairs stay in this contract. Material changes to structure/public contracts/dependencies/acceptance revise affected units and the whole plan, preserve prior revisions/evidence, validate the complete replacement and record autonomous acceptance within AF-EP-1.0 before affected work. No live sending/publication, business approval, scope reduction or fabricated pass is authorized here. Continue to the next eligible predefined unit without routine operator approval.
