# Compile implementation units

Use this workflow to combine project inputs, knowledge and selected workflows into the complete package defined by the [compilation guide](README.md). Run it in the creation workflow's [specification stage](../workflows/create-website.md#2-specify-the-website). All units and the implementation plan for the agreed scope must exist before execution begins.

## Inputs

- The current [brief](../templates/project-brief.md), complete objective inventory, website model, materials/permissions, constraints and [decision register](../templates/decision-register.md), identified by version.
- The [rules](../rules/README.md), selected [capability contracts](../capabilities/README.md), relevant [guides](../guides/README.md) and [source notes](../sources/README.md) at the recorded library version.
- Selected workflow references/versions and the action steps, conditions, checkpoints and handoffs to specialise for the project.
- The [execution policy](../implementation/README.md#execution-policy): mode, fixed constraints, change authority, acceptance conditions and reviewer when human review is selected.
- Existing solution structure, implementation, operating instructions, package and [evidence](../templates/acceptance-report.md), when present, with revision/environment and the scope of the requested change.

Missing consequential inputs keep the package in draft while preparation continues. Inputs that will be produced during execution need a defined provider, output contract and availability condition.

## Outputs

- A versioned solution-structure description or reference, and the complete set of [implementation-unit contracts](implementation-unit.md) targeting its elements.
- An [implementation plan](implementation-plan.md) listing exact unit revisions, objective mappings, dependencies, execution order, shared-change coordination, integration checkpoints and completion criteria.
- Source/requirement coverage in the acceptance report or an existing linked matrix, with explicit applicability and exception decisions.
- A recorded completeness result and mode-specific acceptance of the entire package, or a draft/rejected package with precise unresolved work. Execution handoff occurs only for a complete, accepted package.

Use existing project records where suitable. The plan is authoritative for unit inventory and ordering; the brief links to it instead of maintaining another schedule.

## 1. Bind the full scope and source context

**Inputs:** Project inputs, objective inventory, source versions, selected workflows, policy and existing project/package context.

1. Establish the complete agreed scope, including in-scope design, content, integration, verification, release and handover. Resolve proposed versus selected objectives and exclusions in the brief.
2. Record source, workflow and policy references/versions. Distinguish requirements, decisions, explanatory patterns, provenance, supplied claims, inspected facts and evidence.
3. Inspect existing structure and consumers. Resolve gaps through [input preparation](../workflows/prepare-creation-inputs.md); classify external prerequisites separately from missing requirements.

**Outputs:** A draft plan with fixed scope, source context, objective references and policy, plus a decision-linked list of compilation blockers.

## 2. Specify the solution structure and coverage

**Inputs:** Stage 1 context, accepted project choices, relevant knowledge and inspected implementation.

1. Choose the necessary structure using [architecture](../guides/architecture.md), [structure](../guides/project-structure.md) and [technical guidance](../guides/technical-conventions.md). Identify structural elements, responsibilities, interfaces, consumers, planned/existing locations and runtime/trust boundaries.
2. Map objectives and applicable rules to those elements and planned observable checks using the [coverage contract](README.md#coverage-and-traceability). Keep original rule IDs and justified exclusions.
3. Resolve structural choices, source conflicts, missing values and required [capability extensions](../capabilities/extensions.md) that affect decomposition or acceptance. Bind concrete project values or precise authoritative references.

**Outputs:** The chosen solution structure and draft coverage linking objectives/requirements to structural targets and checks; any remaining consequential unknowns keep compilation incomplete.

## 3. Define every implementation unit

**Inputs:** Full scope, structure, coverage and selected workflow steps.

1. Partition the complete work into units that create, change, integrate or verify named structural elements. Assign stable project-local unit references and owners; do not introduce a separate task layer.
2. Fill the [unit format](implementation-unit.md) with structural targets, source workflow steps, concrete actions, requirements, outputs and acceptance checks. Describe shared-contract consumption and affected consumers.
3. Identify every input provider, including outputs of other units, existing artifacts and external prerequisites. A planned output can remain unproduced only when its contract and provider are known.
4. Include shared changes, integrated verification and later lifecycle work within scope. Expected design choices must be bounded outputs; decisions that could change scope, structural contracts or the unit inventory must be resolved before compilation completes.

**Outputs:** All unit definitions for the scope, with traceable actions and output/check contracts. Incomplete definitions remain draft and cannot be handed off as a partial execution package.

## 4. Assemble the implementation plan

**Inputs:** All unit definitions, objective/requirement coverage, solution structure and policy.

1. Populate the [plan](implementation-plan.md) with exact unit revisions and objective-to-structure-to-unit mappings. Reference the authoritative coverage and decision records.
2. Build the dependency graph from concrete producer outputs to consumer inputs. Resolve cycles, missing producers, conflicting ownership and incompatible contracts.
3. Define execution stages/order and any permitted independent work. Sequence overlapping writes or identify their coordination mechanism. Identify checks of shared consumers and combined journeys at explicit checkpoints.
4. Define overall completion and in-scope release/handover conditions, prerequisite owners, mode-specific acceptance checkpoints and the revision procedure.

**Outputs:** A complete draft plan for the full unit inventory, including dependency contracts, execution sequence, integration checkpoints and completion conditions.

## 5. Check the complete package

**Inputs:** Draft plan, all referenced unit revisions, coverage, source records and policy.

1. Check both directions: every objective/applicable requirement has owned outputs and checks, and every unit has an objective or an explicitly required supporting responsibility.
2. Confirm all unit contracts are complete, references resolve, shared contracts agree, dependencies are valid and all required workflow steps/checkpoints have been accounted for.
3. Distinguish unresolved requirements from future outputs and execution prerequisites. Resolve all consequential definition gaps; retain only declared runtime dependencies with providers and conditions.
4. Record the [completion gate](README.md#completeness-acceptance-and-eligibility) result against the exact plan, unit manifest and source/policy versions. Keep actual verification evidence `not checked` where unexecuted.

**Outputs:** A complete package and recorded completeness result, or a draft package with actionable definition gaps. This gate does not prove the website is implemented.

## 6. Accept and hand off the package

**Inputs:** The entire package, completeness result and supplied execution policy.

1. In `human_review` mode, present the concrete package and any changes from its predecessor to the named reviewer. Record acceptance of its exact revision before execution starts.
2. In `autonomous` mode, evaluate the same conditions and authority, record the rationale and accept the package when they hold. If they cannot be satisfied within authority, record the blocker without expanding scope or authority silently.
3. Link the accepted plan from the brief and hand it to [Execute an implementation plan](../implementation/execute-implementation-plan.md). Defined units may wait for dependency outputs; the whole package must already be complete.
4. For revisions, retain unchanged unit revisions, update affected units and consumers, reassess the entire replacement package and preserve old evidence with its original scope. Apply the same mode-specific acceptance before affected execution resumes.

**Outputs:** A complete, accepted package ready for execution, or a pending/rejected package with reasons and next actions. The plan and its manifest, rather than an informal subset of units, define the execution handoff.
