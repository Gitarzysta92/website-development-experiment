# Add a page or feature

Use this procedure when extending a website during implementation or maintenance. It is part of the broader [creation workflow](create-website.md). Compile the entire requested change and its integration impact before executing it. Work already defined in an accepted plan uses those unit contracts; a new request requires a complete change package or an explicit revision of the existing package.

## Inputs

- The requested addition or change, its implementation objectives, visitor purpose, expected behaviour and scope/exclusions, recorded in the [project brief](../templates/project-brief.md) or linked target-project record.
- The current brief and [decision register](../templates/decision-register.md), selected [capability contracts](../capabilities/README.md), applicable [baseline](../rules/README.md#baseline-rules) and technical rules, and project-specific quality targets.
- The existing implementation and revision/environment, its module map and contributor instructions, interpreted using the [project structure guidance](../guides/project-structure.md).
- Required content/assets and editing permissions; integration configuration and access arrangements when the change needs them. Reference secret stores rather than copying credentials.
- Existing [acceptance evidence](../templates/acceptance-report.md) and known failures or gaps relevant to the changed behaviour and affected shared patterns, when available.
- The supplied [execution policy](../implementation/README.md#execution-policy), including mode, fixed outcomes/constraints, change authority and acceptance checkpoints, plus selected workflow references/versions and steps.
- The existing plan, unit manifest, source revisions, execution records and coverage/dependency references, when available.

Record missing inputs and their impact in the brief or decision register. Resolve consequential definition gaps before package completion; future declared outputs need defined providers and conditions. Continue unaffected work under its accepted plan. Selecting accounts, commerce or booking requires the dedicated extension contract specified in the capability modules.

## Outputs

- The implemented page or feature, including applicable content, route/navigation registration, configuration and relevant checks in the target project.
- Updated project records: scope and selected capabilities in the brief, consequential choices or exceptions in the decision register, and current implementation notes/module map and contributor instructions where affected.
- A complete accepted plan and all unit contracts for the change and its integration impact, with objective/structural mappings, compilation coverage, dependencies and evidence references.
- Execution records identifying actual actions, outputs, versions, progress and any policy-controlled revisions.
- Acceptance evidence tied to the changed revision/environment, covering the requested behaviour and affected shared patterns, with applicable rule outcomes, actual conditions/results and unresolved failures or untested areas with owners.
- An explicit handoff to the [creation workflow's release stage](create-website.md#6-release) if publication is in scope. Implementation and local verification alone do not establish publication; record remaining release work in the acceptance report.

## 1. Define the complete change and affected structure

**Inputs:** Requested objectives and scope, current implementation/package, source records, applicable knowledge, selected workflow steps and execution policy.

1. Identify the visitor purpose and relevant capability rules; inspect existing modules before creating another abstraction. Record the actual implementation baseline.
2. Identify affected structural elements, shared contracts and consumers. Choose an owner and public contract for new behaviour; add an adapter only if an external implementation is needed.
3. Establish the complete requested change, integration and regression checks, and in-scope release/handover work. Resolve consequential choices within the supplied authority, retaining source/status distinctions in the brief and decision register.

**Outputs:** A defined objective inventory and change boundary, inspected structural targets/consumers, and resolved decisions or explicit compilation blockers.

## 2. Compile and accept the change package

**Inputs:** Defined change scope, structural targets, existing plan/contracts, workflow steps, applicable rules and policy.

1. [Compile all units and the plan](../compilation/compile-implementation-units.md) for the change, including affected consumers and integrated checks. Reference existing authoritative structure and evidence; unrelated scope does not need new units merely because a change is being added.
2. Bind the relevant implementation actions from stage 3 and verification actions from stage 4 into units. Define every dependency, output, check, ownership boundary and execution checkpoint upfront.
3. Link the change plan to the existing baseline and coordinate any still-active plans that share structural targets. If the change alters an active package's contracts, revise its affected units and plan explicitly. Check whole-package consistency and accept under `human_review` or `autonomous` before affected execution.

**Outputs:** The complete accepted change package, or a draft/pending package with blockers. No partial set of newly defined units is an implementation handoff.

## 3. Execute the defined implementation units

**Inputs:** Complete accepted package, eligible units, dependency outputs, authorised content/assets and required configuration/access.

Use [Execute an implementation plan](../implementation/execute-implementation-plan.md) to perform the compiled actions where applicable:

1. Register the feature and its configuration at the application's composition boundary.
2. Declare routes/layouts, navigation and data-loading input contracts; compose the page from feature and UI APIs.
3. Produce the contracted implementation, content and configuration changes, preserving structural ownership and shared-consumer contracts.
4. Record actual actions, outputs and versions. Repair ordinary defects within contracts; material changes revise affected units and the plan under the supplied policy before affected execution.

**Outputs:** Changed structural elements, current implementation documentation and execution records, plus declared blockers or revision records where needed.

## 4. Verify and hand off

**Inputs:** Changed implementation and versions, scheduled unit/integration checks, current package, prior evidence and policy checkpoints.

1. Check affected imports, states and the actual visitor journey using [technical conventions](../guides/technical-conventions.md). Include shared-pattern consumers and integration/regression conditions from the plan; identify isolated versus real integration results.
2. Update the brief, consequential decisions, module map and contributor commands where the change affects them. Record scope, actual results and remaining work in the [acceptance report](../templates/acceptance-report.md).
3. Follow the implementation workflow for defects, blockers and revisions, and rerun affected checks. Assess unit and whole-plan completion against the current accepted contracts and combined checkpoints.
4. Hand off to predefined release/handover units when in scope, applying existing publication authority. Otherwise record the implementation outcome and remaining release work explicitly.

**Outputs:** Scoped acceptance evidence, unit/plan progress and completion assessment, updated records, and an explicit release/handover outcome or next eligible work with owners.
