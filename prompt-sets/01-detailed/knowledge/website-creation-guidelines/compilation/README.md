# Compilation and implementation units

Compilation combines project inputs, knowledge and selected workflows into a complete implementation package before implementation starts. Its outputs are the chosen solution structure, all implementation-unit definitions, an implementation plan and coverage of the agreed scope. A person or agent can perform compilation; executable compiler tooling is optional.

Use the [compilation workflow](compile-implementation-units.md), [unit template](implementation-unit.md) and [plan template](implementation-plan.md). These materials stay together in `compilation/`. The [implementation process](../implementation/README.md) executes the accepted package in the target project. Filled records can be embedded in existing project documentation; separate files per record are optional.

## Core concepts

| Concept | Meaning |
| --- | --- |
| Website model | Pages, content, capabilities and visitor journeys |
| Implementation objective | What has to be implemented |
| Solution structure | The chosen modules, components, interfaces, integrations and other structural elements |
| Implementation unit | Bounded work that creates, changes, integrates or verifies elements of the solution structure |
| Implementation plan | The dependencies, ordering, coordination and checkpoints for all implementation units |

The implementation unit is the work abstraction. There is no separate task layer. A component is a structural element; creating that component or verifying its integration is work expressed by a unit. Units target one or more named structural elements and reference the objectives they implement. A website page can supply context, but it does not automatically define a unit boundary.

The library's [matrix](../guides/requirements-matrix.md) has three dimensions: subject, library role and implementation objective. Concrete objectives and their source/status belong in the brief; their mappings to structure, units and checks belong in the implementation plan and linked coverage.

## Compilation inputs

| Input | Contribution |
| --- | --- |
| Project inputs | Objective inventory, website model, requirements, content/assets and permissions, constraints, accepted decisions, existing implementation/evidence and execution policy |
| Knowledge | Applicable rules, selected capability contracts, explanatory guides, examples and source provenance |
| Selected workflows | Procedures or relevant step ranges, their versions, action order, dependencies, checkpoints, failure paths and handoffs |

The lifecycle workflow schedules preparation, compilation and execution. Compilation specialises the selected work procedures into unit actions; orchestration steps already performed are not recursively compiled as new work.

Preserve the authority of each source. Rules retain their stable IDs; selected capabilities retain their conditional contracts. Guides explain approaches and source notes establish provenance. Neither examples nor source-project technologies, numeric values or visual choices become universal requirements. Project decisions keep their recorded status, and inspected implementation facts/evidence retain their revision and environment.

## Complete package before execution

Compile the entire agreed implementation scope before executing any of its units. The package includes design, content, integration, verification and release/handover work when those activities are in scope. A later feature request receives a complete package for that change and its integration impact, linked to the existing project baseline.

Compilation may iterate while being prepared, but incomplete subsets are not handed to implementation. Resolve unknowns that could change required objectives, unit boundaries, structural contracts, dependency order or acceptance conditions before declaring the package complete. Incomplete accounts, commerce or booking extensions remain blockers under the [extension contract](../capabilities/extensions.md).

Upfront definition does not require upfront production of dependency outputs. A unit may consume a component, asset or bounded design decision produced by an earlier unit, provided the producer, output contract, constraints and verification are defined. Missing execution access can be a declared prerequisite with an owner and availability condition. Neither case excuses an undefined requirement or a placeholder unit such as "work out the rest later".

The plan records exact unit revisions, source and policy versions, the dependency graph, execution sequence, integration checkpoints and completion criteria. Shared values, decisions and existing module documentation remain authoritative where already maintained; the package references their versions rather than creating competing copies.

## Partitioning and structural ownership

Start with all selected objectives, choose the solution structure using the applicable [architecture](../guides/architecture.md) and [structure](../guides/project-structure.md) guidance, then partition the work against that structure.

- Identify each targeted element by a stable project reference, responsibility, public contract and planned or existing location/runtime boundary.
- Give each unit a coherent action and observable output. One unit may touch several elements; one element may be created, integrated and verified by different units.
- Identify shared owners, extension points and affected consumers. Coordinate overlapping writes in the plan; file overlap does not by itself require a new structural layer.
- Map every objective to units and acceptance checks. A shared unit may support several objectives. Every unit contributes to an objective or an explicitly required supporting responsibility.
- Attach accessibility, performance, privacy and other applicable subjects to the units they affect. Separate integration units may verify combined behaviour without replacing each unit's own checks.

For example, an enquiry objective could target a form component, submission module and receiver adapter in the chosen architecture. Units could create the module, implement the adapter, connect the component and verify delivery. This is illustrative decomposition, not a requirement to introduce those layers in every website.

## Coverage and traceability

Use the acceptance report's [Compilation coverage](../templates/acceptance-report.md#compilation-coverage) section or an existing linked matrix. Trace source requirement/objective -> structural targets -> units and outputs -> planned checks. The library matrix helps find source material; it is not project coverage evidence.

- Consider every baseline and technical rule. Group conditional rules only when they share a reason and retain identifiable IDs. An unselected capability may be excluded as a whole module with a reason.
- Map each applicable obligation to an owned output and check. Already completed discovery or existing work may point to its authoritative record and relevant evidence.
- Include shared consumers, integrated journeys and in-scope release/operating obligations. A requirement outside one unit still needs project-level coverage.
- Record exclusions and justified exceptions with their source references, impact and decisions. Unresolved applicability is permitted in drafts but must be settled for the package's agreed scope before execution.

Applicability uses `applies`, `not applicable` with a reason, or `unresolved`. Planned checks remain `not checked` until actually executed. Compilation never turns planning coverage into passing evidence.

## Completeness, acceptance and eligibility

| Concern | Meaning and authoritative record |
| --- | --- |
| Contract/package state | `draft`, `complete` or `stale`; definitions and consistency checked in unit records and the plan |
| Package acceptance | `pending`, `accepted`, `rejected` or `superseded`; mode-specific acceptance of an exact plan/unit manifest in the plan |
| Execution eligibility | Whether current prerequisites and authority permit a unit's next actions; determined during execution |
| Execution progress | `pending`, `running`, `blocked` or `completed`; recorded separately in execution records |
| Verification outcome | `pass`, `fail`, `not checked` or `not applicable` with a reason; recorded in the acceptance report |

A complete unit may wait for an earlier unit's outputs. Implementation starts only after the entire package passes completeness checks and is accepted under the supplied [execution policy](../implementation/README.md#execution-policy). Package acceptance does not establish implementation success or independently authorise publication.

The completion gate checks objective/rule coverage, complete unit contracts, resolved consequential choices, structural ownership, valid dependency references and order, coordinated shared changes, observable checks and integration checkpoints, and defined execution policy and authority. Its result and acceptance are bound to the exact source versions and unit manifest.

## Readiness and recompilation

The earlier combined readiness model (`draft`, `ready`, `blocked`, `stale`) is replaced by the separate concerns above. In existing project records, reassess a former `ready` unit for contract completeness and current eligibility independently; a former `blocked` item may be either an incomplete contract or a missing execution prerequisite.

Ordinary defects are repaired within the current unit contract. Changes affecting requirements, scope, structure/public contracts, dependencies, permissions or acceptance conditions create explicit revisions of affected units and the plan under the execution policy. Preserve the old package and its evidence, assess consumers and completed work, and check the whole revised package for consistency. Human-review mode waits for acceptance of the proposed revision; autonomous mode evaluates and accepts revisions within the supplied change authority.

Unaffected work may continue against the currently accepted package. Affected work resumes only against an accepted, complete replacement package. This is controlled revision of the upfront plan, not routine creation of units during implementation. Record policy changes as versioned inputs; an implementer cannot grant itself wider authority.
