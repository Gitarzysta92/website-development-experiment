# Creation workflow

The process is prepare, compile the complete package, then implement. All implementation units and the implementation plan for the agreed scope must be defined and accepted before execution begins. Compilation may iterate during preparation; implementation follows the accepted plan and explicit policy-controlled revisions.

Use [Prepare creation inputs](prepare-creation-inputs.md) when the request and materials have not yet been assembled into project records. Its outputs feed this workflow's inputs; reuse existing records and the recorded handoff when they are already available.

## Inputs

- The requested website outcome and a [project brief](../templates/project-brief.md) containing implementation objectives, the website model, known requirements, constraints, exclusions and unresolved questions. An incomplete brief is sufficient to start discovery.
- Supplied content, assets and their sources/editing permissions; the existing website, repository and operating documentation when available.
- The [baseline](../rules/README.md#baseline-rules), candidate [capability modules](../capabilities/README.md) and relevant architecture, structure and technical guidance linked in the stages below.
- Existing project decisions and verification evidence, if any. Access arrangements and publication authority are needed for the stages that use them; reference connections or secret stores rather than copying credentials.
- Selected workflow references/versions and a supplied [execution policy](../implementation/README.md#execution-policy), including mode, fixed constraints, change authority and acceptance checkpoints. Missing policy inputs can be resolved during preparation, but must be defined before package acceptance.

## Outputs

- An updated brief and [decision register](../templates/decision-register.md) recording scope, selected capabilities, accepted choices, assumptions, exceptions and open decisions.
- The chosen solution structure, all implementation-unit contracts and the complete implementation plan, with objective/requirement coverage, dependencies, integration checkpoints and mode-specific acceptance.
- The website implementation, content and assets, with current implementation notes and contributor/operating instructions in the target project.
- [Execution records](../implementation/execution-record.md) and an [acceptance report](../templates/acceptance-report.md) identifying plan/unit revisions, the checked implementation version, applicable rules, actual evidence, failures and gaps.
- A recorded release outcome and handover status. A verified deployment is an output only when publication is in scope, authorised and completed; otherwise record what remains and its owner.

Keep each output in its authoritative project record or implementation location and link to it rather than creating a document per stage. Stages 1 and 2 prepare and compile the full scope. Stages 3 through 7 describe work categories and checkpoints that compilation includes where applicable; the accepted implementation plan owns their dependencies and execution order. Runtime outputs from earlier units can be inputs to later units when their contracts are already defined.

## 1. Understand the project

**Inputs:** The initial brief, requested outcome, supplied materials and known constraints; existing website, repository and project records when available.

Review and refine the prepared inputs as discovery adds evidence. Resolve consequential questions using the brief's handoff, decision links and supplied authority, updating the same records.

**Outputs:** Discovery findings in the brief, with consequential assumptions and open decisions linked to the decision register:

- Audience, primary visitor outcome and representative journeys.
- Candidate implementation objectives, selected workflow references and execution-policy inputs.
- Content/source inventory and editing permissions.
- Known facts, assumptions, open decisions and exclusions.
- Domain/migration dependencies and ownership.
- Existing repository structure, runtimes, integrations and reusable module conventions.

Proceed into specification when enough is known to propose a useful structure. Optional fields need not all be filled. Resolve consequential unknowns within delegated authority, and obtain missing facts or authority from the responsible owner when necessary; do not infer acceptance from silence.

## 2. Specify the website

**Inputs:** Stage 1 findings and objective inventory, candidate capability contracts, the baseline and relevant technical guidance; selected workflow versions, execution policy, existing decisions and unresolved questions.

**Outputs:** The website specification in the brief and linked project records:

- Page/content model with purpose, relationships, visibility and next actions.
- The complete selected objective inventory stating what must be implemented, explicit exclusions and the supplied execution policy.
- Selected capability modules and applicable baseline rule IDs.
- Architecture and tool choices recorded in [the brief's implementation notes](../templates/project-brief.md#project-specific-implementation-notes) or linked project documentation, including applicable module ownership, permitted dependencies, runtime/data boundaries and feature contracts. Apply the framework-agnostic [architecture](../guides/architecture.md), [project structure](../guides/project-structure.md) and [technical conventions](../guides/technical-conventions.md) at the scale the website needs.
- Quality targets, browser/device coverage and verification conditions.
- [Decision register](../templates/decision-register.md), including defaults and exceptions.
- All [compiled implementation units](../compilation/compile-implementation-units.md), with structural targets, source workflow actions, project-specific behaviour, inputs, outputs and planned checks; compilation coverage in the acceptance report or an existing linked matrix.
- The complete [implementation plan](../compilation/implementation-plan.md), binding exact unit revisions to objectives and structure, with dependencies, execution order, integration checkpoints, completion conditions and recorded completeness/acceptance.

Distinguish user requirements from recommendations. Do not turn an unverified assumption into a claim, review stamp or production setting.

Record each project-specific fact in one authoritative place and link to it. A separate design document may help a complex project, but it is not a required deliverable or a place to copy the reusable guidelines.

Run the [compilation workflow](../compilation/compile-implementation-units.md) to combine project inputs, knowledge and selected workflows into the entire package. Resolve decisions that could change required objectives, unit boundaries, structural contracts, dependencies or acceptance before the package is complete. Defined future outputs may remain unproduced. Accept the complete package according to `human_review` or `autonomous` policy before any unit executes; this gate does not establish implementation success.

## 3. Establish the design and representative journeys

**Inputs:** The complete accepted package, page/content model, architecture choices, quality targets and representative journeys; eligible predefined design/journey units and the brief's brand direction, content and asset permissions.

**Outputs:** A representative implementation and its shared design conventions in the target project:

- Visual tokens and actual reusable component states.
- A representative page and a critical visitor journey.
- A representative route/template-to-feature-to-data flow, showing composition, state ownership and external adapter binding where applicable.
- Responsive transformations, long-content behaviour and relevant failure states.
- Asset treatment and content hierarchy using authentic material where available.

Execute the bounded design/journey units through the [implementation workflow](../implementation/execute-implementation-plan.md). Review the rendered result under the policy's checkpoints. Record shared design conventions in authoritative project records and apply corrections to their shared owners.

Expected design outputs within declared constraints are execution results. Repair defects within the current contracts. Discoveries changing scope, structural contracts, dependencies or acceptance require explicit revised units and plan, whole-package validation and policy-based acceptance before affected work proceeds.

## 4. Implement and extend

**Inputs:** The current accepted plan and its complete unit manifest, eligible units and dependency outputs, any required representative design/journey outputs, authorised content/assets and configuration/access arrangements for selected integrations.

**Outputs:** The implementation covering the agreed scope, with updated implementation notes and contributor instructions:

- Reusable templates/components and stable content identifiers.
- Selected integrations with explicit configuration and failure behaviour.
- Draft/preview and production boundaries.
- Relevant automated checks for consequential policy and state behaviour.
- Public module APIs, contributor commands and a current map of authored sources versus generated output.

Apply shared conventions to subsequent pages. Verify zero/one/many entries and incomplete optional content. Avoid carrying over a prior project's colours, architecture, numeric limits or unrelated integrations.

Use [Execute an implementation plan](../implementation/execute-implementation-plan.md) to select eligible units, perform their actions, verify outputs and record progress/evidence. All units are already defined. Apply the execution policy to material revisions of affected units and the plan; retain earlier outputs and evidence with their original scope and revision.

Compile applicable actions from [the page or feature workflow](add-page-or-feature.md) into the initial package. A later requested addition receives a complete change package covering its integration impact, linked to the existing baseline.

Keep actual module locations, configuration boundaries and adapter choices current in the brief's implementation notes or the linked target-project documentation as implementation changes. Check public imports and responsibility boundaries when extracting shared code.

## 5. Verify

**Inputs:** Implementation outputs and their code/content/configuration version, a runnable environment, the current accepted plan/unit revisions, scheduled verification and integration checkpoints, brief/decisions, coverage/check references, applicable rule IDs, quality targets, representative test data and relevant prior evidence.

Complete the applicable parts of [the acceptance report](../templates/acceptance-report.md).

Execute scheduled verification units and checks as their dependencies become available; aggregate their evidence here. Trace objectives and compiled requirements to actual outputs and results, including shared consumers and combined journeys. Compilation coverage, package acceptance and unit eligibility cannot substitute for executed checks.

Check rendered behaviour, critical journeys, privacy/access boundaries, metadata, responsive states and dependency failure. Use representative combinations rather than an unbounded Cartesian product. Record what was actually checked, where and against which version.

Include applicable `ARC-*`, `STR-*` and `TECH-*` outcomes. Inspect dependency direction and browser/server boundaries, and distinguish isolated feature checks from real integration evidence. A matching directory tree is not proof of architectural compliance.

Repair defects within their contracts and rerun affected checks. Exceptions or other changes to acceptance conditions follow the execution policy's explicit unit/plan revision process, with impact and owner recorded. "Not checked" remains visible. Do not present a prototype, configured schedule or successful local build as production completion.

**Outputs:** An acceptance report with rule outcomes, environment/version, conditions and evidence; corrected implementation with affected checks rerun where needed; linked exceptions and unresolved failures or gaps with impact and owners.

## 6. Release

**Inputs:** Predefined release units in the current accepted plan, the intended release revision, required acceptance evidence and unresolved issues, the project's publication process and authority, deployment access/configuration, domain dependencies and the recovery or migration plan where applicable.

- Establish that publication is authorised under the project's agreed process.
- Prepare the intended code/content/assets/configuration and recovery path.
- Preserve unrelated domain and service dependencies.
- Complete relevant checks, deploy, and wait for the actual rollout result.
- Verify the real destination, version, important routes, assets and functional outcome.
- Keep receipts without exposing credentials or personal data.

Existing authorisation remains valid within its scope. Do not introduce a redundant approval request merely because a template mentions review.

**Outputs:** The acceptance report's release record identifying exact contents, authorisation, deployment result, destination/version checks, functional evidence and recovery route. If publication is deferred, blocked, fails or is rolled back, record that outcome and remaining work instead of claiming a completed release.

## 7. Operate and improve

**Inputs:** Predefined operating/handover units within the accepted scope, implementation and release outcome, current brief and linked implementation/runbook documentation, acceptance evidence and open work, plus the agreed maintenance scope, operating policy and responsible owners.

- Hand over editing, release, configuration, monitoring and recovery instructions.
- Hand over the current brief and its linked implementation documentation, including the module map and instructions for adding supported pages/features and running relevant checks.
- Confirm responsibility for enquiries, alerts and recurring jobs.
- Verify backups/restoration and retention according to the agreed operating policy.
- Evaluate business outcomes while acknowledging measurement gaps.
- Feed reusable lessons back into this repository; keep client-specific facts in the target project.

Scheduling future checks, sending notifications or enabling paid services requires appropriate project authorisation. A written operating plan alone does not activate these actions.

Close the plan only when all required units, combined checks and policy checkpoints meet its completion conditions. A later improvement outside that scope goes through a complete change package; ongoing operation does not imply undefined implementation work in the original plan.

**Outputs:** Current operating instructions linked from the brief; handover and open-work records in the acceptance report with responsible owners, actual recovery/job/measurement evidence where applicable, and authorised versus activated recurring work distinguished. Reusable lessons may update this library; project-specific facts remain in the target project.
