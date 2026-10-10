# Implementation plan AF-D1

Revision `1.1`, 9 October 2026. **Complete component-based package, autonomously accepted under AF-EP-1.0 after compilation checks.** Website implementation has not started. This revision supersedes the phase-oriented 1.0 package, preserved in [the archive](../revisions/AF-D1-1.0.zip).

## Unit partition and scope

A unit implements one named website component, capability or page, including all applicable concerns: content/language, behavior/state, visual/responsive design, accessibility, architecture, performance, discovery, data/security, editing/operation and verification. A shared runtime/data/presentation component is a legitimate structural target with a concrete public contract. “Write all content”, “design”, “backend”, “integration”, “QA” and “handover” are not standalone implementation units.

All 23 unit contracts exist upfront. Every piece has concrete paths, producer outputs, local actions, full concern matrix and checks. Shared rules/values remain centrally authoritative, while each unit binds how they apply to its own implementation. Cross-component journeys are checkpoints in this plan; they cannot substitute for a unit implementing and verifying its own piece.

The website scope, 17 identities/34 EN/PL routes, supplied palette, tools and local/live boundaries remain those of [AF-SPEC-1.1](specification.md) and [AF-DEC-1.1 / AF-EP-1.0](decisions.md). Live sending, deployment, domain changes, spending, business/asset approval and human translation review remain separately constrained. This revision corrects decomposition, not website scope.

Sources: unchanged HP-1.1 / PREP-1.0 / SM-0.3 / DR-1.0; pinned guidelines `f8cb8faf680bde5d194258387543d1e5ebd544dc`; updated AF-STRUCT-1.1 and AF-CHECK-1.1. [Source lock](source-lock.json), [package manifest](../package-manifest.json), [rule coverage](rule-coverage.csv) and [compilation validation](compilation-validation.json) bind exact records.

## Complete unit manifest and order

The [machine-readable manifest](unit-manifest.json) is a component of this plan. It binds the following new descriptive unit identities, each at unit revision `1.0`, to plan revision `1.1`. Previous numeric phase unit IDs are retired; their evidence is not inherited. All owners are the execution agent.

| Order | Implemented piece / unit prompt | Owned page identities | Required producer outputs |
| --- | --- | --- | --- |
| 1 | [IU-RUNTIME: Website runtime and build host](units/01-runtime-host.md) | Shared / technical component | Compiled inputs and runtime access |
| 2 | [IU-CONTENT: Bilingual content repository and route catalogue](units/02-content-repository.md) | Shared / technical component | IU-RUNTIME.O1 |
| 3 | [IU-FRAME: Page frame and shared presentation components](units/03-page-frame.md) | Shared / technical component | IU-RUNTIME.O1, IU-CONTENT.O1 |
| 4 | [IU-HEADER: Global header and language navigation](units/04-site-header.md) | Shared / technical component | IU-CONTENT.O1, IU-FRAME.O1 |
| 5 | [IU-FOOTER: Global footer and company contact links](units/05-site-footer.md) | Shared / technical component | IU-CONTENT.O1, IU-FRAME.O1 |
| 6 | [IU-PROJECT-NAV: Project reading frame and local navigation](units/06-project-navigation.md) | Shared / technical component | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1 |
| 7 | [IU-ENQUIRY: Contact and privacy enquiry experience](units/07-enquiry-experience.md) | `contact`, `privacy` | IU-RUNTIME.O1, IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1 |
| 8 | [IU-HOME: Home page](units/08-home.md) | `home` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-ENQUIRY.O1 |
| 9 | [IU-PROJECTS: Projects index page](units/09-projects.md) | `projects` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-HOME.O1 |
| 10 | [IU-AS-OVERVIEW: ArtiSense overview page](units/10-artisense.md) | `artisense` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-PROJECTS.O1 |
| 11 | [IU-AS-TECHNOLOGY: ArtiSense technology page](units/11-artisense-technology.md) | `artisense-technology` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-AS-OVERVIEW.O1 |
| 12 | [IU-AS-APPLICATIONS: ArtiSense applications page](units/12-artisense-applications.md) | `artisense-applications` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-AS-OVERVIEW.O1 |
| 13 | [IU-AS-VALIDATION: ArtiSense research and validation page](units/13-artisense-validation.md) | `artisense-validation` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-AS-TECHNOLOGY.O1, IU-AS-APPLICATIONS.O1 |
| 14 | [IU-AF-OVERVIEW: AIFIELD overview page](units/14-aifield.md) | `aifield` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-PROJECTS.O1 |
| 15 | [IU-AF-DESIGN: AIFIELD design and simulation page](units/15-aifield-design.md) | `aifield-design` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-AF-OVERVIEW.O1 |
| 16 | [IU-AF-AI: AIFIELD AI workflows page](units/16-aifield-ai.md) | `aifield-ai` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-AF-OVERVIEW.O1 |
| 17 | [IU-AF-NEURAL: AIFIELD neural field research page](units/17-aifield-neural.md) | `aifield-neural` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-AF-OVERVIEW.O1 |
| 18 | [IU-AF-VALIDATION: AIFIELD examples and validation page](units/18-aifield-validation.md) | `aifield-validation` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-PROJECT-NAV.O1, IU-AF-DESIGN.O1, IU-AF-AI.O1, IU-AF-NEURAL.O1 |
| 19 | [IU-INVESTORS: Investors page](units/19-investors.md) | `investors` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-HOME.O1, IU-AS-VALIDATION.O1, IU-AF-VALIDATION.O1 |
| 20 | [IU-APPROACH: Our Approach page](units/20-approach.md) | `approach` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-AS-VALIDATION.O1, IU-AF-VALIDATION.O1 |
| 21 | [IU-ABOUT: About page](units/21-about.md) | `about` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-HOME.O1, IU-AS-OVERVIEW.O1, IU-AF-OVERVIEW.O1 |
| 22 | [IU-PARTNERSHIPS: Partnerships page](units/22-partnerships.md) | `partnerships` | IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-AS-VALIDATION.O1, IU-AF-VALIDATION.O1, IU-ENQUIRY.O1 |
| 23 | [IU-RECOVERY: Legacy URL redirects and missing-page recovery](units/23-route-recovery.md) | Shared / technical component | IU-RUNTIME.O1, IU-CONTENT.O1, IU-FRAME.O1, IU-HEADER.O1, IU-FOOTER.O1, IU-AS-OVERVIEW.O1, IU-ABOUT.O1, IU-PARTNERSHIPS.O1, IU-ENQUIRY.O1 |

Each `.O1` contains the named piece's implementation, relevant content/assets/configuration, documentation and passing scoped checks at a recorded implementation version. Consume public contracts rather than duplicating another component's ownership. All module paths in a unit identify the implementation of that piece, not permission to rewrite unrelated consumers.

Follow the manifest order. No parallel-agent work is prescribed. Shared changes are made at their owner, documented and rechecked in affected existing consumers. Units can cross layers when required to deliver the piece: ENQUIRY owns presentation, pure validation/use case, server endpoint, adapters, privacy content and receipt/failure tests together.

## Dependencies and partial site availability

RUNTIME produces actual host/tooling, CONTENT the validated record/route/publication API, FRAME reusable presentation, HEADER/FOOTER/PROJECT-NAV their complete UI components. Page owners then produce their own content/assets/rendering/metadata/checks. No earlier unit drafts all later pages or leaves later units to perform its basic accessibility/security/verification work.

Component fixtures may use synthetic contract data to check a component before all its real consumers exist. They must render the real implementation, remain private, and cannot masquerade as completed editorial pages. The selected route catalogue is fixed upfront; implementation availability and publication eligibility are separate fields.

Pages can link to selected counterpart identities whose implementations occur later. Their unit verifies correct native href/locale/context behavior against the catalogue now; the checkpoint below observes the actual destination once available. This avoids artificial dependency cycles among mutually linking pages without creating stub pages or claiming unobserved journeys passed. Unit-local completion and whole-site integration completion are recorded separately.

Required runtime/package/browser access is provided by the experiment environment/operator. Missing access blocks the dependent action honestly; no key or human fact approval is needed for local implementation. The decisions record names future live prerequisites and their providers; they are not silently treated as supplied.

## Objective coverage

| Source objective | Ownership across concrete pieces |
| --- | --- |
| OBJ-01 | Each page owns its complete qualified EN/PL copy, source/maturity limits and private review state; CONTENT supplies schemas/shared facts. |
| OBJ-02 | HEADER/FOOTER/PROJECT-NAV own navigation components; each page owns its links/sections; CONTENT owns typed identities; RECOVERY owns legacy/error behavior. |
| OBJ-03 | Each rendered piece owns localized copy/labels/states and language behavior; CONTENT owns the shared equivalence contract. |
| OBJ-04 | FRAME owns reusable presentation; each concrete component/page implements and verifies its own design and responsive states. |
| OBJ-05 | ENQUIRY owns the entire browser-to-receiver experience and email alternative; no split service/UI/integration units. |
| OBJ-06 | CONTENT owns publication/metadata/sitemap mechanisms; each page owns its actual metadata; RECOVERY owns actual redirects/404. |
| OBJ-07 | RUNTIME owns executable tooling/configuration; every component owns its module/API, editing/extension instructions and scoped checks. |
| OBJ-08 | RUNTIME owns shared exposure boundaries, CONTENT owns private/public data views, ENQUIRY owns actual data handling, and consumers check safe output. |
| OBJ-09 | Every unit owns its verification and repairs. Plan checkpoints combine available pieces and retain per-owner evidence. |
| OBJ-10 | Each component documents and verifies its own operation/recovery/extension where relevant; final plan closure assembles evidence without a handover phase unit. |

Exact unit/objective/element/rule/check mappings are in the manifest and coverage CSV. Each applicable rule maps to all relevant component owners, rather than a final verification unit. Each evidence outcome must state its rule/check, component unit, implementation revision and actual conditions. Passing one component does not pass the rule for every consumer.

## Combined checkpoints

These are plan checks on combinations of already implemented pieces, not extra implementation units. Evaluate autonomously as soon as the listed producer outputs exist. Do not request routine operator acceptance.

| Checkpoint | After / required outputs | New combined observation | Evidence |
| --- | --- | --- | --- |
| CP-COMPONENTS | After IU-ENQUIRY; exact output set in manifest checkpoints | Actual header/footer/frame/content/runtime and bilingual Contact/Privacy compose correctly; a real synthetic submission is independently received once. Representative component fixtures are private, not placeholder launch pages. | C-01, C-03, C-04, C-05, C-06, C-07, C-08, C-10, C-11, C-13, C-14, C-15; scoped acceptance entries |
| CP-ARTISENSE | After IU-AS-VALIDATION; exact output set in manifest checkpoints | Home→Projects→ArtiSense overview/children→editable Contact works in EN/PL; incoming technical links retain project/company context and source limitations. | C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-12; scoped acceptance entries |
| CP-AIFIELD | After IU-AF-VALIDATION; exact output set in manifest checkpoints | AIFIELD overview→design/AI/neural/examples→demo Contact works; both glucose cross-project links and local nav/language behavior are observed on actual pages. | C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-12; scoped acceptance entries |
| CP-COMPANY | After IU-PARTNERSHIPS; exact output set in manifest checkpoints | All 17 identities/34 local routes and previously pending forward links exist. Run the complete investor and partner journeys using Home/Investors/About/Partnerships, project evidence and actual enquiry receipt; no page unit is replaced by a content outline. | C-02, C-03, C-04, C-05, C-06, C-09, C-10, C-11, C-12; scoped acceptance entries |
| CP-SITE | After IU-RECOVERY; exact output set in manifest checkpoints | Whole-site integration: known 308/legacy-fragment arrivals, true 404, all links/assets/locale metadata, preview/privacy/public-export boundaries, representative browsers and quality budgets hold on the final revision. Collect/reuse valid scoped evidence, recheck changed combinations, reproduce local startup/restore and evaluate completion. | C-01, C-02, C-03, C-04, C-05, C-06, C-07, C-08, C-09, C-10, C-11, C-12, C-13, C-14, C-15; scoped acceptance entries |

The executor runs the new combination and repairs findings in the owning piece. Preserve the failed observation and invalidate/recheck affected earlier evidence. Do not defer the first keyboard test, copy review, metadata check, server boundary test or resource measurement to CP-SITE. That checkpoint confirms final combinations and evidence coverage after the last pieces become available.

## Workflow binding

The compilation workflow has combined inputs, rules and selected workflows into the complete structure and all unit contracts upfront. Creation workflow stages 3–7 are specialized as design/implementation/verification/operating responsibilities **inside each applicable unit**. They do not define unit boundaries. Release work is local preparation and explicit not-published documentation only. The pinned [execution workflow](../knowledge/website-creation-guidelines/implementation/execute-implementation-plan.md) governs eligibility, actions, evidence, defects and accepted material revisions.

## Completion and evidence ownership

Copy the [execution](execution-record.md) and [acceptance](acceptance-report.md) seeds to `website/docs/` when running the entry prompt. Progress belongs to the execution record, check results to acceptance, inventory/order to this plan. Store raw reports/screenshots under `website/artifacts/` and bind evidence to an actual source/content/config fingerprint or available Git revision.

A unit completes when its own implementation and complete concern contract pass its scoped checks. Whole-plan completion requires every selected piece, all 34 routes, all five combined checkpoints, actual quality evidence and reproducible local startup/recovery. Pending counterpart observations or required unavailable checks prevent whole-plan verified completion. No standalone QA unit is allowed to excuse unfinished concern work in a component.

Each owner writes its own editing/usage/operation documentation as part of implementation. At final closure assemble the existing results and report exact start commands, achieved local verification, isolated provider tests versus synthetic receipt versus live delivery, review status, and publication status. This closure does not invent new implementation scope or postpone required documentation to another unit.

## Completeness and acceptance

The compiler reviewed all 23 concrete contracts, ten concern categories per unit, complete 17-page identity ownership, all 219 guideline rule applicability decisions, producer/dependency order, structural paths, source authority and local/live limits. Automated compilation checks verify the manifest, links/anchors, rule-owner references, hashes and protected inputs. These checks verify package consistency only, not website behavior.

Revision 1.1 is accepted autonomously within AF-EP-1.0 when those checks pass. At execution start, inspect the actual baseline and verify package identity; routine environment setup and declared producer outputs are not reasons to ask for redundant approval. A consequential contradiction requires revising the affected contracts before execution.

## Revision control

| Revision | Status / reason | Effect |
| --- | --- | --- |
| 1.0 | Superseded: lifecycle/discipline units did not match the required piece-based decomposition | Exact prior package retained in the archive; no website run or result existed |
| 1.1 | User correction: concrete components/pages with all concerns inside each unit | Retires IU-01 through IU-10; introduces descriptive identities, remaps rule ownership and uses combined checkpoints instead of global QA/handover units |

Preserve prior packages and evidence. Material changes revise affected units and the complete plan/coverage/manifest, reassess consumers and earlier outputs, validate the whole replacement and record acceptance within the delegated policy before affected execution resumes. Ordinary defects stay within their component contract. Do not weaken checks, add permission, or silently reduce scope.
