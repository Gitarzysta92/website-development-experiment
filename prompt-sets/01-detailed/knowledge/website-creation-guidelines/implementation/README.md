# Implementation

Implementation executes the complete package produced by [compilation](../compilation/README.md). It consumes the accepted plan and its exact unit revisions, produces changes to the solution structure, and records output and verification evidence. Units are executed directly; there is no separate task abstraction.

Use [Execute an implementation plan](execute-implementation-plan.md) and the [execution record](execution-record.md). Keep filled records in the target project, embedded in existing work records when suitable. The plan owns the inventory and ordering, unit contracts own the work definition, execution records own progress, and the [acceptance report](../templates/acceptance-report.md) owns actual check results.

## Execution policy

The execution policy is a versioned project input, recorded in the [brief](../templates/project-brief.md#execution-policy) or linked authoritative record. Select a mode explicitly; neither mode is a hidden default. Both require all units and the implementation plan for the agreed scope before execution begins.

| Policy input | What to specify |
| --- | --- |
| Mode | `human_review` or `autonomous` |
| Fixed outcomes and constraints | Required objectives, protected contracts, quality conditions and limits that the executor must preserve |
| Change authority | Which requirement, scope, structure, dependency and acceptance changes may be made; explicitly state any permitted substitutions or reductions of scope |
| Review authority | Named reviewer and acceptance responsibility in human-review mode; delegated authority and its source in autonomous mode |
| Acceptance checkpoints | Initial package and material revisions, plus any additional checkpoints, required evidence and acceptance conditions |
| Unresolvable conditions | Where to record blockers and who can supply missing inputs or amend authority |

| Decision | `human_review` | `autonomous` |
| --- | --- | --- |
| Initial complete package | Human reviewer accepts the exact plan and unit manifest before execution | Executor evaluates completeness and policy conditions and records acceptance within delegated authority |
| Ordinary defect within a unit contract | Executor repairs and verifies under the existing contract | Executor repairs and verifies under the existing contract |
| Material revision | Executor prepares revised units and plan; human accepts the complete replacement before affected execution | Executor prepares, validates and accepts the replacement within supplied change authority before affected execution |
| Conditions cannot be satisfied within authority | Record a blocker for the responsible owner/reviewer | Record a blocker; autonomous mode does not grant permission to expand authority |

The policy governs who resolves and accepts changes, including changes discovered during implementation. In autonomous mode, the executor evaluates the implementation checkpoints without routine human approval; missing facts or authority can still block execution. The policy does not remove requirements or permit silent scope reduction. An authority change is itself an input from the authority holder; an executor cannot grant itself broader permission. Publication authority remains separately recorded, and existing authorisation remains valid within its scope.

## Starting and selecting work

Start with a complete, accepted package and check its source versions and implementation baseline against the actual project. The package defines every unit, including later design, content, integration, verification and release/handover work where in scope. It cannot delegate undefined scope to execution.

A unit becomes eligible when its next actions' dependency outputs, environment, access and authority are available under the plan. A complete contract may wait for an earlier unit's output. Record this as a prerequisite condition, not missing compilation. Resolve unknown requirements or contracts that affect decomposition before package acceptance.

Follow dependency order, declared shared-change coordination and checkpoints. Independent eligible units can proceed when the plan permits it. Each unit names the structural elements it creates, changes, integrates or verifies; pages and visitor journeys provide context and acceptance observations. The plan maps objectives to structural targets, units and checks.

## Findings and revisions

| Finding | Required response |
| --- | --- |
| Output violates the existing contract | Repair the defect within the same unit, retain the failed attempt and rerun affected checks |
| A declared prerequisite is unavailable | Record the missing output/access and owner, block affected actions, and continue eligible independent work |
| Requirements, scope, structural/public contracts, dependencies, permissions or acceptance conditions need to change | Revise affected units and the plan through compilation, assess consumers and completed outputs, validate the whole replacement package and follow the selected acceptance mode |

A dependency failure may reveal that its contract must change; that becomes a revision rather than a prerequisite wait. A bounded design choice or artifact produced within a declared output contract is ordinary execution. If it changes the contract or required work inventory, follow the revision process.

While a revision is pending, unaffected work may continue under the currently accepted package. Affected work waits for a complete, accepted replacement. Preserve prior revisions and their evidence; explicitly assess whether earlier outputs still satisfy the new contract and whether checks must be repeated. Reuse evidence only for the scope, version and conditions it supports.

## Completion and evidence

Keep contract completeness, package acceptance, execution eligibility, execution progress and verification outcomes [separate](../compilation/README.md#completeness-acceptance-and-eligibility). Executed actions alone do not establish unit completion: required outputs and checks must satisfy the accepted contract, including any authorised exception. Failed or unexecuted checks retain their actual outcomes.

Whole-plan completion requires every required unit, combined integration checks, objective coverage and policy checkpoints to satisfy the plan's completion conditions. A successful isolated check is insufficient evidence for a combined visitor journey. Record implementation, verification, publication and handover outcomes distinctly; a completed build or accepted package does not establish a live release.
