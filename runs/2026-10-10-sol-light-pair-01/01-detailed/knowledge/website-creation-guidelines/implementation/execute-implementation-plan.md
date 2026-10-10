# Execute an implementation plan

Execute implementation units directly under the [implementation model and policy](README.md). [Compilation](../compilation/compile-implementation-units.md) must have produced the complete, accepted package for the agreed scope before this workflow starts. Repeat execution stages across already defined units; do not use the loop to invent the remaining scope.

## Inputs

- The complete [implementation plan](../compilation/implementation-plan.md), exact unit manifest and [unit contracts](../compilation/implementation-unit.md), with completeness and mode-specific acceptance records.
- Versioned project inputs, objective inventory, solution structure, selected workflows, applicable knowledge and decisions referenced by the package.
- The supplied [execution policy](README.md#execution-policy), authority and acceptance conditions; publication authority separately when release is in scope.
- The actual implementation baseline, environment, contributor instructions, available dependency outputs, content/assets and access arrangements. Reference connections or secret stores rather than copying credentials.
- Prior execution records and [acceptance evidence](../templates/acceptance-report.md), when present, with their scope, versions and known failures or gaps.

Missing execution prerequisites block dependent actions. A missing contract, stale baseline or unaccepted material change returns the affected package to compilation and policy-based acceptance.

## Outputs

- Implementation artifacts and changes to the named structural targets, with resulting code/content/configuration versions and current implementation documentation.
- [Execution records](execution-record.md) identifying unit attempts, eligibility, actual actions, outputs, progress, defects, blockers and handoffs.
- Acceptance evidence for unit outputs, shared consumers and plan integration checkpoints, with actual conditions, outcomes and limitations.
- Explicit package revisions and acceptance records when material changes are necessary, preserving previous versions and evidence.
- A whole-plan completion result and distinct release/handover outcome, or remaining work and blockers with owners. Expected outputs are not a claim of successful execution.

## 1. Load the package and check the starting state

**Inputs:** Accepted plan, exact unit manifest, source/policy versions, actual project baseline and previous records.

1. Confirm the complete package and acceptance apply to this scope and revision. Identify the authoritative plan, unit contracts, solution map, decision register and evidence locations.
2. Inspect the starting code/content/configuration revision and environment. Compare actual state with the package's assumptions and any previous completed outputs; do not treat proposed structure or supplied claims as inspected facts.
3. Open or continue the execution record. Classify differences as defects, unavailable declared prerequisites or material changes using the policy. Resolve differences affecting contracts through compilation before affected work.

**Outputs:** An execution record bound to the current accepted package and inspected baseline, with previous evidence scoped and any blockers or required revisions identified.

## 2. Select eligible work

**Inputs:** Current plan, execution progress, actual dependency outputs, environment/access status and policy.

1. Select a defined unit according to the plan's dependencies and ordering. Check each input needed for its next actions against the producer output contract and required version.
2. Confirm shared-change coordination, relevant access and authority, and any checkpoint conditions. Execute independent units only where the plan permits their work to proceed together.
3. Record unavailable prerequisites and owners. Continue other eligible work when possible; if none is eligible, record the blocking conditions instead of creating substitute scope without a plan revision.

**Outputs:** An eligible unit/action selection with recorded prerequisite checks, or blocked work with precise missing conditions and owners.

## 3. Execute the compiled actions

**Inputs:** Eligible unit and exact revision, its compiled workflow actions, structural targets, declared inputs and applicable project instructions.

1. Perform the actions against the named structural elements, preserving the chosen responsibility, public-interface and runtime/trust boundaries.
2. Produce the contracted artifacts, including bounded design decisions, content or configuration when specified. Keep actual module maps and contributor instructions current in their authoritative locations.
3. Record actual actions, output references and resulting versions. If a required change exceeds the unit contract, stop the affected actions and follow stage 5; do not execute undefined work under the old package.

**Outputs:** Produced or changed artifacts and an execution record of actions, outputs and versions, with any findings routed for verification or revision.

## 4. Verify outputs and integration checkpoints

**Inputs:** Actual outputs and versions, unit check contracts, due plan checkpoints, representative conditions and relevant prior evidence.

1. Run the prescribed checks and record observed results in the acceptance report. Distinguish isolated, integrated and deployed checks; use the actual environment, input conditions and implementation version.
2. At scheduled checkpoints, check shared consumers and combined journeys against the plan. A collection of passing unit checks does not replace the required combined checks.
3. Link results to plan/unit revisions, outputs and objective/requirement references. Reuse earlier evidence only when its scope, version and conditions support the current claim; identify gaps and checks invalidated by changes.

**Outputs:** Evidence references, actual outcomes and findings for unit outputs and due integration checkpoints. Unexecuted checks remain `not checked`.

## 5. Resolve defects, blockers and material changes

**Inputs:** Verification findings, dependency failures, new facts, current package and change authority.

1. Repair ordinary defects within the existing unit contract, retain failed-attempt records and repeat affected checks. Do not weaken acceptance conditions to label a repair successful.
2. For an unavailable declared prerequisite, record its provider, impact and resumption condition. Continue unaffected eligible work under the accepted plan.
3. For material changes, record the decision and impact on objectives, structure, consumers, dependencies and previous evidence. Use compilation to revise affected units and the plan, preserving unchanged unit revisions and validating the whole replacement package.
4. In `human_review` mode, obtain the policy's human acceptance of the exact revised package before affected execution. In `autonomous` mode, evaluate and record acceptance within supplied authority. If no compliant revision is possible, record the blocker and required input/authority; do not silently reduce scope.
5. Resume affected work only after the replacement is complete and accepted. Recheck eligibility and identify which completed outputs or checks need reassessment.

**Outputs:** Repaired outputs awaiting recheck, declared blockers, or a complete accepted replacement package with impact/evidence records. Pending or rejected revisions remain explicit.

## 6. Close units and the plan

**Inputs:** Current accepted package, unit outputs, check results, integration and policy checkpoint records, and remaining blockers.

1. Mark a unit completed only when its required outputs and completion conditions are satisfied under its accepted contract. Link actual outcomes and any authorised exception; do not relabel failures or unchecked behaviour as passing.
2. Hand off produced outputs to declared consumers and select subsequent eligible units. Preserve retries and superseded attempts rather than overwriting their history.
3. Execute in-scope release and handover units through the same selection, action and verification stages under their authority and checks. Record publication, recovery, operating and handover outcomes separately; an accepted plan or local build is not a deployment receipt.
4. Evaluate whole-plan completion against all required units, objective coverage, combined integration results and policy checkpoints. Record remaining work and owners when conditions are not met.

**Outputs:** Updated execution progress and consumer handoffs, plus either a supported whole-plan completion record or explicit remaining work. The acceptance report contains the actual verification and release/handover evidence.
