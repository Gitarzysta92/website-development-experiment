# Sources and adaptation history

Sources record where reusable material came from and how it was adapted. They do not select project capabilities, impose the source project's stack or prove implementation quality.

| Source | Available provenance | Scope and limits |
| --- | --- | --- |
| [Website creation retrospective](retrospective.md) | Origin statement recorded on 9 October 2026 | Broad origin of the initial baseline/capability material; no per-rule source map |
| [Wapps](wapps.md) | Source revision, document map and reconciliation notes | Architecture, structure and implementation guidance adapted to be framework-agnostic |

## Library layout migration

The role-based rewrite separates definitions from their uses while preserving every existing rule ID and requirement. The former `docs/` files are now represented by:

| Previous location | Current location |
| --- | --- |
| `docs/baseline.md` | [Baseline rule catalogue](../rules/README.md#baseline-rules) and its subject files |
| `docs/capability-modules.md` | [Capability contracts](../capabilities/README.md) and [capability rule definitions](../rules/README.md#capability-rules) |
| `docs/architecture.md`, `docs/project-structure.md`, `docs/technical-conventions.md` | [Technical rule definitions](../rules/README.md#technical-rules) and [explanatory guides](../guides/README.md) |
| `docs/requirements-matrix.md` | [Requirements coverage matrix](../guides/requirements-matrix.md) |
| `docs/wapps-sources.md` | [Wapps provenance](wapps.md) |

General workflows remain under `workflows/`, and shared project record templates remain under `templates/`. The input-preparation workflow and creation handoff are retained. The subsequently added [compilation material](../compilation/README.md) keeps its guide, workflow, unit and plan templates together in `compilation/`; its initial draft locations were `docs/compilation.md`, `workflows/compile-implementation-units.md` and `templates/implementation-unit.md`. The [implementation material](../implementation/README.md) groups the execution model, workflow and execution record in `implementation/`. These process additions do not extend the source projects' provenance claims. Existing links within this library use the current destinations. When updating a copied project record, resolve its links against the library version that record references.
