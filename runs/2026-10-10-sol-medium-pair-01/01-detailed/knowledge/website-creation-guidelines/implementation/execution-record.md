# Implementation execution record

Use this format with [Execute an implementation plan](execute-implementation-plan.md). Embed it in the target project's existing work records or link an equivalent record. A separate file per run or unit is optional. Preserve attempts and retries; refer to the plan's unit manifest rather than maintaining another work inventory.

## Run and package context

- Run/attempt reference, date and executor:
- Plan ID, exact revision and accepted unit-manifest reference:
- Unit ID and exact revision:
- Execution-policy reference/version, mode and applicable authority:
- Package completeness and acceptance references:
- Starting code/content/configuration version and environment:
- Prior execution-record references and reusable evidence scope:
- Current progress (`pending`, `running`, `blocked`, `completed`) and reason:

## Eligibility and starting state

| Required input or checkpoint | Expected provider/output/version or authority | Actual availability and observation | Eligible actions or blocker/owner |
| --- | --- | --- | --- |
| To define | | | |

- Inspected structural targets and differences from the accepted baseline:
- Shared-change coordination and affected consumers:
- Resumption conditions for unavailable prerequisites:

## Actual actions and outputs

| Unit action reference | Action performed and date | Structural targets and output references | Resulting implementation version/environment |
| --- | --- | --- | --- |
| To record | | | |

- Updated authoritative implementation/module-map/contributor documentation:
- Producer outputs handed to consumers, with contract/version and destination:

## Verification references

Link to the [acceptance report](../templates/acceptance-report.md), which owns actual check outcomes and evidence. Do not create a second independently maintained result table here.

- Unit output/check evidence references:
- Shared-consumer and integration-checkpoint evidence references:
- Previously recorded evidence reused, with scope/version justification:
- Invalidated evidence, required rechecks and resulting evidence references:

## Findings and decisions

| Finding/reference | Defect, prerequisite blocker or material revision | Affected work/consumers and owner | Repair, resumption condition or revised package | Decision/authority/acceptance reference |
| --- | --- | --- | --- | --- |
| To record | | | | |

- Unaffected work permitted under the current accepted plan while a revision is pending:
- Replacement package reference and date affected execution resumes:
- Previous outputs requiring reassessment:

## Completion and handoff

- Unit completion-condition assessment and evidence references:
- Remaining work, blocker owners and next eligible unit references from the plan:
- Whole-plan completion-condition assessment, when due:
- Release and handover outcome references, when in scope:
- Final implementation version/environment and record date:

Completion follows the accepted contract and plan. Preserve failed and unchecked outcomes; progress, verification, package acceptance and publication remain distinct.
