# Website creation guidelines

A reusable library for planning, designing, building, verifying and operating websites. Business purpose, content, domains, appearance and software are project choices. Technical guidance remains framework-agnostic and expresses responsibilities, contracts and verifiable behavior.

## Start here

1. Use [Prepare creation inputs](workflows/prepare-creation-inputs.md) to turn the request and available material into a [project brief](templates/project-brief.md), objective inventory, source references, candidate capabilities, selected workflows, execution policy, a [decision register](templates/decision-register.md) and a creation handoff. Reuse existing records and keep missing inputs explicit.
2. Select the relevant [capability contracts](capabilities/README.md) and applicable [baseline and technical rules](rules/README.md). Use the [coverage matrix](guides/requirements-matrix.md) to find material by subject, library role and implementation objective.
3. Use [guides](guides/README.md) to understand architecture, project structure and implementation patterns. Record concrete project choices in the brief or linked target-project documentation, with rationale and exceptions in the decision register.
4. Follow [Create a website](workflows/create-website.md), or [Add a page or feature](workflows/add-page-or-feature.md) for an existing implementation. During specification, [compile](compilation/compile-implementation-units.md) project inputs, knowledge and selected workflows into the chosen solution structure, all implementation units and the complete implementation plan for the agreed scope. Resolve consequential definition gaps and accept the whole package under the supplied policy before execution.
5. [Execute the accepted plan](implementation/execute-implementation-plan.md), selecting eligible units by dependency and authority, recording outputs and verifying combined checkpoints. Ordinary defects stay within contracts; material changes explicitly revise affected units and the plan under the policy.
6. Record actual verification and release status in the [acceptance report](templates/acceptance-report.md). Publication follows the project's authority and existing authorisation; expected deliverables do not establish completion.

Keep filled project records, client materials and deployment evidence in the target project. Reference secret stores or connections rather than copying credentials.

## Library abstractions

The top-level folders organise the library's source/support roles and its compilation and implementation stages:

| Role | Responsibility | Contents |
| --- | --- | --- |
| [Rules](rules/README.md) | Authoritative, verifiable requirements with stable IDs and applicability | Baseline subject rules, technical rules and conditional capability rules |
| [Capabilities](capabilities/README.md) | Selectable feature contracts | Applicability, inputs, rule references and verification cases |
| [Guides](guides/README.md) | Explanations, models and adaptable examples | Architecture, structure, implementation and the coverage matrix |
| [Compilation](compilation/README.md) | Combine project inputs, knowledge and workflows into the entire implementation package upfront | Compilation guide, workflow, unit and plan templates |
| [Implementation](implementation/README.md) | Execute the accepted package under the supplied policy | Execution model, workflow and execution record |
| [Workflows](workflows/README.md) | Procedures that consume inputs and produce explicit outputs | Input preparation, website creation and page/feature changes |
| [Templates](templates/README.md) | Formats for project-specific records | Brief, decision register and acceptance report |
| [Sources](sources/README.md) | Provenance and adaptation history | Retrospective origin, Wapps source map and library layout migration |

Every numbered rule is defined once under `rules/`. Capabilities select rule references; guides explain them; workflows apply them; project records state choices and evidence. Sources describe provenance and do not create requirements or certify implementation quality. `AGENTS.md` governs maintenance of this library.

Compilation keeps its guide, procedure and record formats together in `compilation/`; execution uses `implementation/`. Each workflow and named stage declares inputs and outputs. These stages reference authoritative rules and shared project records without duplicating their definitions.

| Project concept | Meaning |
| --- | --- |
| Website model | Pages, content, capabilities and visitor journeys |
| Implementation objective | What has to be implemented |
| Solution structure | Chosen modules, components, interfaces, integrations and other structural elements |
| Implementation unit | Bounded work that creates, changes, integrates or verifies elements of the solution structure |
| Implementation plan | The full unit manifest, dependencies, execution order, coordination, checkpoints and completion conditions |

Units target the solution structure. They are not website-model elements, and there is no separate task layer. Objectives map to structural targets, units, outputs and checks; the mapping can be many-to-many. All units are defined upfront, even when later units must wait for known outputs of earlier units.

## Subjects and coverage

The [requirements coverage matrix](guides/requirements-matrix.md) has three dimensions: subject, library role and implementation objective. Its ten subjects are business and audience; content and information architecture; functional behaviour; visual design and layout; interaction and accessibility; architecture and implementation; performance and delivery efficiency; visibility and discoverability; data, privacy and security; operations and lifecycle.

Subjects overlap. A form objective can concern functionality, accessibility, privacy and operations while keeping one definition for each rule. The library provides illustrative objective categories; the brief owns the concrete project objective inventory. Group related material where useful; no document or folder is required for every matrix intersection. Verification applies across all subjects, and provenance remains attached metadata.

## Project records and authority

- The brief records needs, objectives, website model, sources, scope, selected capabilities/workflows, execution policy and concise project-specific implementation notes. Its handoff distinguishes preparation gaps from a complete accepted package and actual execution prerequisites.
- The decision register distinguishes confirmed requirements, accepted defaults, proposals, assumptions, exceptions and superseded choices, with rationale and ownership.
- The target project's README or existing implementation documentation records actual modules, configuration, commands and operating procedures. Link to the authoritative location rather than maintaining duplicate descriptions.
- Implementation units and the plan live in the brief, existing project work records or linked documentation. The plan owns the exact unit manifest, ordering, coverage mappings and package acceptance. Separate files per unit or record are optional.
- Execution records capture actual unit actions, outputs, attempts, progress and blockers. The acceptance report owns rule/requirement coverage and actual check evidence, including versions, conditions, release status and open work.

A separate technical design document is optional for complex projects. The workflow does not require another template to restate the guidelines or the brief. Requests to recommend or use a default still need a concrete value and a project-specific basis before becoming recorded choices.

The supplied [execution policy](implementation/README.md#execution-policy) selects `human_review` or `autonomous`, states fixed outcomes/constraints and change authority, and defines acceptance conditions. Human-review mode requires human acceptance of the complete initial package and material revisions. Autonomous mode lets the executor evaluate and accept them within supplied authority. Both require full upfront compilation. Ordinary defects are repaired within contracts; material changes revise affected units and the plan, validate the whole replacement, and follow the selected mode before affected work resumes. Unaffected work may continue against the current accepted package.

Contract completeness, package acceptance, execution eligibility, progress and verification outcomes remain separate. No mode grants authority to silently discard required objectives or expand its own permissions.

## Rules and verification

Rule IDs such as `LAY-03`, `ARC-04` and `FORM-03` are stable references. Outcomes are `pass`, `fail`, `not checked` or `not applicable` with a reason. Exceptions reference the rule ID in the decision register; silence is not an exception. Capability rules apply only when the relevant feature is selected, and technical rules apply to implemented responsibilities.

Do not infer a universal stack, visual theme, numeric target or architecture from an example or a previous project. A website without accounts does not need account recovery; a private portal does not need public indexing. Accounts, commerce and booking require [dedicated extensions](capabilities/extensions.md) before implementation.

Approval means the authority defined for the project. Existing publication authorisation remains valid within its scope. A configured control, written operating plan, successful build or queued deployment does not independently establish verified behavior, activated recurring work or a completed release.

## Status

The initial baseline was extracted from a website creation retrospective on 9 October 2026. Architecture and technical guidance was adapted from Wapps documentation on the same date. The [source records](sources/README.md) describe available provenance, adaptations and the role-based layout migration.

This is a guidelines library with no live deployments, production credentials or project-specific quality certification. Refine its reusable lessons through use while keeping target-project facts in the target project.
