# Rule catalogue

Every numbered rule has one authoritative definition under `rules/`. Guides explain those rules, capabilities select conditional contracts, workflows apply them and project records capture choices and evidence. The [coverage matrix](../guides/requirements-matrix.md) provides a subject view across these roles.

## Applicability and outcomes

Apply the baseline to the selected project scope, supplement it with relevant technical rules and add the rules of each selected capability. Review applicability rather than adding a feature or architecture layer to satisfy an unrelated rule. Record `pass`, `fail`, `not checked` or `not applicable` with a reason in the [acceptance report](../templates/acceptance-report.md). A requirement or proposed default is not an implementation fact or a measured result.

Record consequential choices and justified exceptions in the [decision register](../templates/decision-register.md), referencing rule IDs. Silence is not an exception. Proposed defaults require concrete values and a project-specific basis; no stack, numeric budget, visual theme or extra approval step is implied by the catalogue.

## Baseline rules

These are the original cross-project requirements, grouped by concern. Their conditions still apply within each group.

| Concern | Families | Authoritative document |
| --- | --- | --- |
| Purpose and content | `PUR` | [Purpose and content](purpose-and-content.md) |
| Visual design and layout | `LAY`, `DES` | [Visual design and layout](visual-design-and-layout.md) |
| Interaction and accessibility | `RWD`, `NAV`, `A11Y` | [Interaction and accessibility](interaction-and-accessibility.md) |
| Performance and delivery | `PERF` | [Performance](performance.md) |
| Visibility and discoverability | `VIS` | [Visibility and discoverability](visibility-and-discoverability.md) |
| Data, privacy and security | `DATA`, `SEC` | [Data, privacy and security](data-privacy-and-security.md) |
| Operations and lifecycle | `OBS`, `REL` | [Operations and lifecycle](operations-and-lifecycle.md) |
| Verification across all subjects | `QA` | [Verification discipline](verification.md) |

## Technical rules

| Concern | Family | Authoritative document | Explanation |
| --- | --- | --- | --- |
| Architecture boundaries | `ARC` | [Architecture rules](architecture.md) | [Architecture guide](../guides/architecture.md) |
| Module placement and public APIs | `STR` | [Structure rules](project-structure.md) | [Structure guide](../guides/project-structure.md) |
| Contracts, state and implementation checks | `TECH` | [Technical rules](technical-conventions.md) | [Technical guide](../guides/technical-conventions.md) |

## Capability rules

These definitions apply through the corresponding [capability contracts](../capabilities/README.md), which supply selection conditions, required inputs and verification cases.

| Capability | Family | Authoritative document |
| --- | --- | --- |
| Structured content and CMS | `CMS` | [CMS rules](capabilities/cms.md) |
| Search and filtering | `SEARCH` | [Search rules](capabilities/search.md) |
| Forms and enquiries | `FORM` | [Form rules](capabilities/forms.md) |
| Collections, portfolios and galleries | `COL` | [Collection rules](capabilities/collections.md) |
| Multiple languages | `LANG` | [Language rules](capabilities/languages.md) |
| Themes and appearance preferences | `THEME` | [Theme rules](capabilities/themes.md) |
| Persistent guided assistant | `CHAT` | [Assistant rules](capabilities/assistant.md) |
| Accounts, commerce and booking extensions | `EXT` | [Extension requirements](capabilities/extensions.md) |

## Maintaining rules

Keep IDs and meanings stable. References use the rule's ID and link to its definition; do not copy definitions into another role. Document replacements explicitly instead of assigning a retired ID a different meaning. Group rules where readers can find their authoritative owner; a rule can appear in several subject views without being duplicated.
