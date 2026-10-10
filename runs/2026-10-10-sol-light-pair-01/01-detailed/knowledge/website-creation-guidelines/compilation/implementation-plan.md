# Implementation plan

Use this format with the [compilation workflow](compile-implementation-units.md). It describes the entire agreed implementation scope before execution, coordinates implementation units directly and records package acceptance. It can be embedded in existing project documentation. Keep one authoritative inventory/order; the brief links here.

## Scope and source versions

- Plan ID/title, revision, date and owner:
- Project or complete change scope, including in-scope lifecycle work:
- Included objective references and explicit exclusions:
- Brief, guidelines, selected workflows/step ranges and decision-register versions:
- Existing implementation/package baseline and revision/environment:
- Execution-policy reference/version, selected mode and fixed constraints:
- Source/material/permission and prior-evidence references:
- Contract/package state (`draft`, `complete`, `stale`) and reason:

## Solution structure

Reference the chosen structure and its version, or use this table when no authoritative map exists. Keep planned elements distinguishable from inspected implementation facts; do not maintain competing module maps.

- Authoritative solution-structure reference/version:

| Element reference | Responsibility/public contract | Planned or existing location/runtime boundary | Dependencies/consumers | Owner |
| --- | --- | --- | --- | --- |
| To define | | | | |

## Objective coverage

Reference the brief's objective inventory rather than redefining it. Every unit must contribute to an objective or an explicitly required supporting responsibility.

| Objective/reference | Structural targets | Implementation unit references | Expected output/check references |
| --- | --- | --- | --- |
| To define | | | |

- Authoritative rule/requirement coverage location/version in the acceptance report or existing matrix:
- Existing artifacts/evidence satisfying requirements without new work, with scope/revision:
- Accepted exception references and affected coverage:

## Complete unit manifest

| Unit reference and exact revision | Work and structural targets | Owner | Contract completeness/check reference |
| --- | --- | --- | --- |
| To define | | | |

List every required unit, including design, content, integration, verification and release/handover work where in scope. Reference the unit contracts for detailed actions; do not create a separate task inventory.

## Dependencies and execution order

| Producer unit/output or existing/external provider | Consumer unit/input | Required contract/version and availability condition | Missing-input owner |
| --- | --- | --- | --- |
| To define | | | |

| Stage/order | Unit references | Entry conditions | Shared-change coordination or permitted independent work | Exit checkpoint |
| --- | --- | --- | --- | --- |
| To define | | | | |

- Dependency-graph location if represented elsewhere:
- Shared-contract owners, overlapping writes and affected consumers:

All units are defined upfront. Eligibility depends on actual prerequisite outputs and authority at execution time; waiting for a declared output does not make a complete contract incomplete.

## Integration and completion

| Checkpoint/reference | Required unit outputs | Combined behaviour and check conditions | Evidence destination and owner |
| --- | --- | --- | --- |
| To define | | | |

- Overall completion conditions for all required units and objectives:
- In-scope release/recovery/publication conditions and authority reference:
- Handover and operating outputs/owners:
- Execution-record location and acceptance-report reference:

## Completeness gate and package acceptance

- Gate review date, reviewer/executor and exact source/policy versions checked:
- Objective and applicable-rule coverage result:
- All unit contracts complete; structural targets, action/output contracts and checks resolved:
- Dependency, reference, ownership and shared-consumer consistency result:
- Consequential definition gaps resolved; later execution prerequisites have providers/conditions:
- Integration, completion and mode-specific checkpoints defined:
- Overall gate result and any blocking reasons:
- Package acceptance (`pending`, `accepted`, `rejected`, `superseded`):
- Mode-specific acceptance evidence, reviewer/executor, date and exact plan/unit manifest:

In human-review mode, record human acceptance of the package. In autonomous mode, record the executor's evaluation and acceptance within the supplied policy. No implementation unit executes before the complete package is accepted. Acceptance does not establish passing implementation checks or independently grant publication authority.

## Revision control

| Revision | Reason and changed sources | Affected objectives/elements/units/dependencies/checks | Completeness and mode-specific acceptance reference | Supersedes |
| --- | --- | --- | --- | --- |
| To define | | | | |

- Policy-defined change authority and revision checkpoints:
- Evidence or completed outputs requiring reassessment after this revision:
- Affected work paused and unaffected work permitted under the current accepted package:

Preserve prior plans, unit revisions and evidence. Ordinary defects use the existing contract. Material changes revise affected units and the plan, check the entire replacement package and follow the policy before affected execution resumes.
