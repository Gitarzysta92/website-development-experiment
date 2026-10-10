# Capability contracts

Capabilities describe selectable features. Each contract states when it applies, identifies inputs, links to its authoritative rules and lists verification cases. A capability can concern several subjects in the [coverage matrix](../guides/requirements-matrix.md); it is not tied to a framework or folder architecture.

## Available contracts

| Contract | Select when | Rule family |
| --- | --- | --- |
| [Structured content and CMS](cms.md) | Content has a structured editing/publication workflow | `CMS` |
| [Search and filtering](search.md) | Visitors search or filter records | `SEARCH` |
| [Forms and enquiries](forms.md) | Visitor submissions are accepted and delivered | `FORM` |
| [Collections, portfolios and galleries](collections.md) | Repeated entries or image galleries are presented | `COL` |
| [Multiple languages](languages.md) | Content is available in multiple languages | `LANG` |
| [Themes and appearance preferences](themes.md) | Visitors or system preferences select an appearance | `THEME` |
| [Persistent guided assistant](assistant.md) | A guided assistant is in scope | `CHAT` |
| [Accounts, commerce and booking](extensions.md) | One of these features is selected; a dedicated contract is still required before implementation | `EXT` |

## Using a capability

Select capabilities in the [project brief](../templates/project-brief.md), with confirmed/proposed scope and exclusions explicit. Their rules extend the [baseline](../rules/README.md#baseline-rules) and relevant [technical rules](../rules/README.md#technical-rules); selection does not require unrelated features. A tool can be replaced if the agreed behavior and data boundaries are preserved.

Collect the contract's inputs in the brief or linked target-project documentation. Identify its objectives, owning structural elements, public contracts, adapters, state lifetime and runtime/data boundaries. Keep missing inputs and their impact explicit in the brief or [decision register](../templates/decision-register.md). Resolve consequential definition gaps before the complete implementation package is accepted; future dependency outputs need defined providers and conditions.

Include relevant [workflow](../workflows/README.md) actions when [compiling all units and the plan](../compilation/compile-implementation-units.md), then [execute the accepted package](../implementation/execute-implementation-plan.md) under the supplied policy. Record rule applicability and actual verification evidence in the [acceptance report](../templates/acceptance-report.md), including failed or untested cases. Capability selection, package acceptance and configured controls do not establish verified completion.

For features not covered by a complete contract, define the missing project-specific requirements, owner and acceptance checks before implementing consequential behavior. Accounts, commerce and booking are explicitly incomplete extension contracts; do not infer their requirements from the forms module.
