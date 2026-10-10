# Project record templates

Copy or adapt these records in the target project, retaining a resolvable reference to the library version used. Reuse existing equivalent records and keep each fact in one authoritative place. Filled briefs, client materials, secrets and deployment evidence do not belong in this library.

| Template | Records | Does not establish |
| --- | --- | --- |
| [Project brief](project-brief.md) | Needs, objectives, website model, sources, selected capabilities/workflows, execution policy, implementation notes and handoff | Factual approval of assumptions or successful implementation |
| [Decision register](decision-register.md) | Requirements, defaults, proposals, assumptions, exceptions, rationale, authority and revision impact | Verification that the chosen behavior works |
| [Implementation unit](../compilation/implementation-unit.md) | Bounded work on structural targets, source actions, inputs, outputs, dependencies and planned checks | Successful execution, passing checks or publication authority |
| [Implementation plan](../compilation/implementation-plan.md) | All unit revisions, structure/objective mappings, dependencies, ordering, integration checkpoints, completeness and package acceptance | Available runtime prerequisites, passing implementation checks or completed release |
| [Execution record](../implementation/execution-record.md) | Unit attempts, eligibility, actual actions/outputs, progress, findings and evidence references | A substitute for the plan or verification evidence |
| [Acceptance report](acceptance-report.md) | Objective/requirement coverage, rule applicability, actual checks, conditions, evidence, release status and open work | A pass for untested behavior or a completed deployment based on a plan |

Use the [workflows](../workflows/README.md) to prepare and update these records. Reference authoritative [rule IDs](../rules/README.md) and [selected capability contracts](../capabilities/README.md); avoid copying their definitions into project records. A separate technical design document is optional when a project's complexity warrants it. Existing implementation documentation can be linked from the brief.

The unit and plan formats live in [compilation](../compilation/README.md), and the execution record lives in [implementation](../implementation/README.md), alongside their respective guides and procedures. Embed them in existing project records when suitable; no separate file per unit or execution attempt is required.
