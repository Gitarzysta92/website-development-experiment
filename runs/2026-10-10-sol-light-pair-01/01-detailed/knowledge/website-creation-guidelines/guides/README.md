# Guides

Guides explain concepts, patterns and examples. Numbered requirements live in the [rule catalogue](../rules/README.md); step-by-step procedures live in [workflows](../workflows/README.md). Examples remain adaptable to the target project's scope and tools.

| Guide | Purpose | Related rules |
| --- | --- | --- |
| [Requirements coverage matrix](requirements-matrix.md) | Navigate subjects, library roles and implementation objectives | All applicable families |
| [Architecture](architecture.md) | Explain responsibility boundaries, dependency direction and composition | [ARC](../rules/architecture.md) |
| [Project structure](project-structure.md) | Map responsibilities to modules and illustrate project layouts | [STR](../rules/project-structure.md) |
| [Technical conventions](technical-conventions.md) | Explain feature contracts, state, presentation and verification boundaries | [TECH](../rules/technical-conventions.md) |

The current explanatory guides concentrate on architecture and implementation. Other subjects are covered by rules, capability contracts and workflows without requiring a dedicated guide. Add explanations when they answer a concrete need, not to fill every matrix cell.

The [compilation guide](../compilation/README.md) explains how project inputs, knowledge and selected workflows become the solution structure, all implementation units and a complete plan upfront. It lives with its workflow, unit and plan formats in `compilation/`. The [implementation guide](../implementation/README.md) explains execution, evidence and policy-controlled revisions; it lives with the execution workflow and record in `implementation/`.
