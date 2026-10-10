# Implementation unit

An implementation unit is bounded work that creates, changes, integrates or verifies elements of the solution structure. Use this format with the [compilation workflow](compile-implementation-units.md) and [plan](implementation-plan.md). Embed it in existing target-project records or link a separate record when useful. All unit contracts for the agreed scope are defined before execution; there is no separate task layer.

## Identity and scope

- Unit ID/title and revision:
- Plan ID/reference (the plan manifest binds exact unit revisions):
- Objective references and intended result:
- Responsible owner:
- Included work and exclusions:
- Contract state (`draft`, `complete`, `stale`), reason and date:

Contract completeness is separate from execution eligibility, progress and verification outcomes. Record those in the [execution record](../implementation/execution-record.md) and acceptance report.

## Source context

| Source/reference | Version or revision/environment | Role/status | Effect on this unit |
| --- | --- | --- | --- |
| To define | | Rule / requirement / decision / guidance / workflow / material / inspected fact / evidence | |

- Selected workflow reference/version and steps, conditions and checkpoints being specialised:
- Brief, guidelines, policy and coverage references/versions:
- Material permissions and shared-contract references:
- Previous unit revision and changed inputs, if any:

## Structural targets and ownership

| Solution element reference | Responsibility/public contract | Planned or existing location/runtime | Unit action: create, change, integrate or verify | Affected consumers/coordination |
| --- | --- | --- | --- | --- |
| To define | | | | |

Link the authoritative solution map. Units may act on several elements; several units may act on the same element under the plan's dependency/coordination rules. Pages and journeys provide context rather than an automatic unit boundary.

## Inputs and dependencies

| Required input | Concrete value or output contract | Producer unit/output reference or external provider | Needed before which action | Availability condition and owner |
| --- | --- | --- | --- | --- |
| To define | | | | |

Identify outputs that earlier units will produce. Reference connections or secret stores, never secret values. Define fixture/real environments and prerequisites without treating an unavailable dependency as an undefined contract.

## Applied requirements and behaviour

| Rule ID(s) or project requirement | Objective reference | Concrete behaviour and bound values/contracts | Planned check reference | Decision/exception reference |
| --- | --- | --- | --- | --- |
| To define | | | | |

Use the project coverage map for applicability. Include relevant content, presentation, responsive/input states, data/state lifetime, validation, trust/privacy boundaries and failure/recovery contracts, linking existing shared definitions.

## Actions

| Order/action reference | Concrete action and expected effect | Structural targets | Prerequisite | Source workflow step |
| --- | --- | --- | --- | --- |
| To define | | | | |

Bind actual target-project tools, paths and commands where relevant. A decision produced by this unit must have defined authority, constraints and consumers; it cannot conceal missing scope or an undefined structural contract.

## Outputs and acceptance checks

| Output reference and artifact/result | Check reference and expected observation | Conditions/environment and procedure/command | Consumer or integration checkpoint | Evidence destination |
| --- | --- | --- | --- | --- |
| To define | | | | |

- Unit completion conditions and shared-consumer checks:
- Plan checkpoints that verify the combined result:
- Handoff destination, including in-scope release/operating work:

Distinguish isolated, integrated and deployed checks. Planned outputs are not implementation facts and unexecuted checks remain `not checked` in the acceptance report.

## Definition gaps and revisions

- Missing definition inputs or conflicts preventing contract completeness, with decision links:
- Declared execution prerequisites to be provided later, with providers/conditions:
- Source or contract changes that require reassessing this unit and consumers:
- Applicable plan/policy revision procedure:

Resolve consequential definition gaps before package completion. Ordinary implementation defects use this contract; material changes follow the plan's policy-controlled revision procedure.
