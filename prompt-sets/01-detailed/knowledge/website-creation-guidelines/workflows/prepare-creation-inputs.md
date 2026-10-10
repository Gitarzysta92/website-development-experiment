# Prepare creation inputs

Use this workflow to turn an initial website request and available materials into the [creation workflow's inputs](create-website.md#inputs). It prepares the project records and identifies what discovery must resolve. Creation then refines the specification and [compiles the complete package of units and plan](../compilation/compile-implementation-units.md) before execution.

Keep the records in the target project. Reuse an existing brief, decision register or source inventory when available; update only missing or changed information. A completed brief, selected stack, finished copy and deployment access are not prerequisites for starting this workflow.

## Inputs

- The initial request, idea or problem to solve, including any stated audience, intended outcome, delivery scope and constraints. A short description is enough to begin.
- Available conversations, documents, copy, assets, references and existing website/repository locations, if any, with their known owners and permissions.
- Existing project records, decisions, operating instructions and verification evidence, when available.
- Supplied execution/revision authority, preferred review mode and workflow references, when already specified; missing policy inputs are gathered during preparation.
- The [project brief](../templates/project-brief.md) and [decision register](../templates/decision-register.md) templates, [baseline](../rules/README.md#baseline-rules), [capability modules](../capabilities/README.md) and relevant technical guidance.

Use available sources and delegated decision authority first. Obtain missing facts, permissions or authority from the responsible owner when necessary. Record unanswered questions and continue independent preparation; do not invent business facts, permissions or accepted choices to fill the template.

## Outputs

| Creation input | Prepared output and authoritative location |
| --- | --- |
| Requested outcome and project brief | An initial brief containing the request/source, audience and visitor outcome, known scope/constraints, exclusions and explicit unknowns |
| Implementation objectives and website model | An objective inventory stating what must be implemented, alongside candidate pages, content, capabilities and journeys; selected/proposed status and exclusions remain explicit |
| Content, assets and source/editing permissions | Material references in the brief's Sources and editing permissions section or a linked existing inventory, with availability and permitted uses recorded per item |
| Existing website, repository and operating context, when present | References and inspected facts in the brief's domain, architecture and implementation sections, including revision/environment for implementation facts |
| Baseline, candidate capabilities and technical guidance | A resolvable reference to the guidelines version used, candidate/selected capabilities with their status, and relevant guidance links in the brief |
| Selected workflows | Resolvable workflow references/versions and relevant steps/checkpoints to specialise during compilation |
| Execution policy | Mode (`human_review` or `autonomous`), fixed constraints, change authority, acceptance conditions and reviewer where required, or explicit missing policy inputs in the brief |
| Decisions and prior evidence, when present | A linked decision register containing material choices and open questions; references to existing evidence with its scope, revision and environment |
| Access arrangements and publication authority, when needed | Known connections/secret-store references, responsible owners and authority scope in the brief; missing arrangements tied to the stage that needs them |
| Handoff to creation | The brief's Creation handoff section identifying the next stage, work that can proceed and unresolved dependencies with owners and resolution triggers |

These outputs use the existing project records. Preparing them establishes input availability and decision status; actual website verification belongs in the [acceptance report](../templates/acceptance-report.md).

Preparation can hand off incomplete inputs to discovery. Before compilation completes, decisions affecting objectives, decomposition, structural contracts, dependencies or acceptance must be resolved. Future dependency outputs may remain unproduced when their providers, contracts and availability conditions are defined.

## 1. Capture the request and open project records

**Inputs:** The initial request, its source, known project location and any existing brief or decisions.

1. Locate the target project's authoritative records. If none exist, use the brief and decision-register templates there; retain resolvable guideline links. If the target location is not yet known, draft the inputs in the working conversation and record that storing/linking them remains open.
2. Record the requested delivery scope, primary audience, intended visitor outcome, known constraints and exclusions. Mark inferred details as assumptions; retain the source of confirmed requirements under `PUR-01` and the decision-register recording rules.
3. Fill known brief fields and use `recommend`, `use default`, `unknown` or `not applicable` for the rest as appropriate. A request to recommend or choose a default still needs a concrete value and rationale before it becomes a recorded choice.

**Outputs:** An initial brief with a traceable request and explicit gaps, linked to the project's decision register. Existing records retain relevant decisions and history.

## 2. Inventory materials and existing context

**Inputs:** Stage 1 records, supplied materials and references, and access to an existing website/repository or operating documentation when available.

1. List or link each relevant material with its location/version, source, intended use, availability and owner. Record editing and publication permissions per item, using `PUR-05` through `PUR-08`; identify conflicting sources and unconfirmed claims.
2. Link existing routes, domain dependencies, integrations, operating instructions and prior acceptance evidence where present. Put inspected implementation facts in the brief's implementation notes with their revision/environment; label supplied but unverified descriptions accordingly.
3. Record missing content, assets, permissions and inaccessible sources with their impact. Describe any proposed drafting, asset creation or replacement work and its owner; do not treat planned material as supplied or approved.

**Outputs:** A source/material inventory in the brief or linked existing records, references to available implementation and operating context, and source conflicts or missing materials linked to open decisions.

## 3. Map the request to capabilities and constraints

**Inputs:** The initial brief, stage 2 inventory and context, the baseline, capability contracts and relevant technical guidance.

1. Outline candidate pages/content types and representative visitor journeys using the brief's Pages, content and capabilities section. Record their purpose and known content sources; leave the detailed specification to the creation workflow.
2. Associate requested behaviour with capability modules. Distinguish confirmed scope, proposed capabilities and exclusions, and collect the module-specific inputs for relevant candidates. For accounts, commerce or booking, record the need for the dedicated extension contract before implementation under `EXT-01`, `EXT-02` or `EXT-03`.
3. Capture known brand, language, visibility, data, privacy, integration, operational and quality constraints in their brief sections. Keep unknown targets explicit; a previous project's values do not become defaults here.
4. Record existing technical constraints and open choices using [architecture](../guides/architecture.md), [project structure](../guides/project-structure.md) and [technical conventions](../guides/technical-conventions.md). Link the guidance needed for the candidate scope without selecting tools or creating unused layers merely to complete the brief.
5. Record the implementation objectives in the brief, stating what must be implemented and their scope/status. Include in-scope design, content, integration, verification and lifecycle work. Keep objectives distinct from website-model elements and the solution structure that compilation will choose.
6. Identify the selected creation/change workflows, versions and applicable steps/checkpoints. These procedures are explicit compilation inputs alongside project inputs and knowledge.

**Outputs:** A brief with objective inventory, candidate pages, journeys and capabilities, known design/technical/operating constraints, selected workflow and guidelines references, and consequential choices awaiting resolution in the decision register.

## 4. Resolve consequential gaps and assign dependencies

**Inputs:** The current brief, source conflicts, missing materials, candidate capabilities and existing decisions or authorisation.

1. Review gaps by the work they affect: discovery, specification, design, implementation, verification, release or operations. Distinguish missing definition decisions that must be settled before package completion from declared execution prerequisites needed later. Use supplied decision authority where applicable; obtain unresolved facts or authority from the responsible owner.
2. Where recommendations or defaults are requested, propose a concrete choice with its basis and trade-offs. Apply existing delegated authority and record the resulting status using the decision register; an unanswered question is not acceptance.
3. For each consequential unresolved item, record the affected stage/step, impact, responsible owner and when it must be resolved in the decision register. Link it from the brief instead of maintaining a second issue list. If the owner is unknown, record that assignment itself remains open.
4. Record known integration/deployment access arrangements and publication authority in the brief. Reference connections or secret stores under `SEC-01`; identify what must become available before the relevant integration, verification or release step. Apply `REL-01` and existing authorisation without introducing an additional approval gate.
5. Populate the brief's [execution policy](../templates/project-brief.md#execution-policy). Select `human_review` or `autonomous` explicitly and record fixed outcomes/constraints, permitted changes including any scope substitutions/reductions, acceptance conditions and reviewer where required. Both modes require full upfront compilation; mode changes who accepts initial and revised packages. Record missing policy inputs instead of assuming authority.

**Outputs:** An updated decision register separating requirements, accepted defaults, proposals, assumptions and exceptions, plus the supplied execution policy and brief references identifying definition gaps, future prerequisites, owners, access status and publication scope.

## 5. Check and hand off the inputs

**Inputs:** The current brief, decision register, material and implementation references, guideline references and any existing verification evidence.

1. Check that every row in this workflow's output table has a location and recorded state: available, missing/unknown or not applicable with a reason. Resolve broken references or record access limitations. Keep each fact in one authoritative place.
2. Check consistency between the request, objectives, proposed/selected capabilities, selected workflows, execution policy, source permissions, constraints and decisions. Preserve the distinction between supplied claims, inspected implementation facts and actual verification evidence; earlier evidence retains its original version and scope under `QA-03` and `TECH-15`.
3. Record the handoff in the brief: the review date and record versions, the next creation stage, what can proceed, and links to dependencies that block particular steps. Proceed into discovery when there is a traceable request, accessible initial records and a useful next action; do not require all optional fields or later-stage access to be complete.
4. Continue with [Understand the project](create-website.md#1-understand-the-project), reusing these records. If creation is already underway, resume at the affected stage. When new evidence changes an input, update its authoritative record and revisit dependent decisions and work.

**Outputs:** Linked creation inputs and an explicit handoff in the brief, with unresolved items assigned to the work they affect. If no creation work can proceed, record the blocking input and next resolution action; input preparation does not imply implementation, acceptance or publication is complete.
