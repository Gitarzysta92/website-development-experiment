# Project decision register

Project:
Guidelines version/reference:
Brief/version:
Implementation-plan reference/revision:
Execution-policy reference/version and mode:
Related implementation-document links/versions, if used:
Last updated:

Record material choices, assumptions and baseline, capability or technical-rule exceptions. Include consequential project structure, dependency boundaries and runtime choices; distinguish proposed architecture from verified implementation. Keep minor implementation details out unless they affect behaviour, quality targets, operating cost or future maintenance.

| ID | Topic/rule | Status | Decision or current assumption | Basis/source | Alternatives/trade-off | Owner | Impact if unresolved | Revisit trigger |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DEC-001 | To define | Proposed | | | | | | |

Statuses: `confirmed requirement`, `accepted default`, `proposed`, `assumption`, `exception`, `superseded`.

## Recording rules

- Quote or link the source of a user requirement where available.
- Mark inferred preferences as assumptions until validated.
- For a default, record its actual value and why it fits this project.
- For an exception, reference the baseline, capability or technical rule ID, describe the impact, compensating behaviour and applicable approval. Record an owner and revisit/removal trigger for temporary dependency or migration exceptions.
- For a superseded decision, retain its history and link the replacement.
- A missing answer is not approval. Continue independent work where possible while resolving consequential unknowns.
- For a missing input or unresolved question, identify the affected workflow stage/step in its impact, name the owner and state when resolution is needed in the revisit trigger. Link the entry from the brief's handoff instead of duplicating it there.
- Resolve decisions within the supplied execution policy. In `human_review` mode, record the reviewer's acceptance of initial and materially revised packages in the plan; in `autonomous` mode, record the executor's evaluation and acceptance within delegated authority. Decision status does not itself establish package acceptance.
- When compilation or implementation exposes a conflict, missing binding or material change, identify affected objectives, structural targets, unit revisions, dependencies, consumers and checks. Keep the choice here and reference it from the units and plan. Resolve consequential definition gaps before the complete package is accepted.
- Ordinary defects are repaired within existing contracts. Changes to requirements, scope, structural/public contracts, dependencies, permissions or acceptance conditions revise affected units and the plan. Link the revision's whole-package validation, policy authority and acceptance; identify completed outputs or evidence that require reassessment.
- Preserve prior decision and package versions. Unaffected work may continue under the current accepted package; affected execution waits for an accepted replacement. Record blockers when no compliant revision is possible within authority, rather than silently changing fixed outcomes or granting wider authority.
- Do not convert a previous project's value into a new project's requirement without recording the choice.

## Example only — remove from a filled register

| ID | Topic/rule | Status | Decision or current assumption | Basis/source | Alternatives/trade-off | Owner | Impact if unresolved | Revisit trigger |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| EXAMPLE-01 | LAY-08 | Exception | An authenticated data panel uses an intentional internal scroll region with keyboard access. | Approved application workflow | Normal document flow would separate the selected item from its controls. | Product owner | Verify short-screen and keyboard behaviour before release. | Panel content or navigation changes |
