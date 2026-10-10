# Wapps source notes

The architecture, project-structure and technical guidance was adapted on 9 October 2026 from the local `wapps/wapps` checkout, at revision `c965790e063139bcd5e6bacc759f289703e4ea9a`. Source paths below are relative to that repository, not links within this guidelines repository. The listed source documents had no local modifications when read; unrelated working-tree changes were not imported.

This is an adaptation of documentation, not a copy of the Wapps implementation or a certification of its behavior. No source application, deployment configuration, credentials or operational receipts are included.

## Source map

| Wapps source | Material retained | Destination |
| --- | --- | --- |
| `architecture-abstract.md` | Responsibility vocabulary; identity/permission/behavior separation; authoritative models and derived projections | [Architecture](../guides/architecture.md) |
| `docs/FRONTEND-APPLICATION-ARCHITECTURE.md` | Thin entrypoints; application composition; pages, shells and partials; ports/adapters; dependency direction; state scope; testing boundaries | [Architecture](../guides/architecture.md), [project structure](../guides/project-structure.md), [technical conventions](../guides/technical-conventions.md) |
| `libs/domains/domain.definition.md` | Domain ownership, pure models/contracts and external dependency ports | [Architecture](../guides/architecture.md), [project structure](../guides/project-structure.md) |
| `apps/portals/shared/features/feature.definition.md` | Feature application/infrastructure/presentation split and public setup API | [Project structure](../guides/project-structure.md), [technical conventions](../guides/technical-conventions.md) |
| `apps/portals/aggregator/application/src/partials/partials.definition.md` | Reusable application-aware presentation, inputs/events and local component structure | [Architecture](../guides/architecture.md), [project structure](../guides/project-structure.md) |
| `apps/portals/aggregator/application/src/pages/pages.md` | Page composition, derived view models, explicit async states, slots and shared tokens | [Technical conventions](../guides/technical-conventions.md) |
| `sdk/README.md` | Backend feature/kernel/platform/adapter split; bootstrap-owned provisioning; explicit non-atomic effects and limits of local verification | [Architecture](../guides/architecture.md), [technical conventions](../guides/technical-conventions.md) |

The [project-specific implementation notes](../templates/project-brief.md#project-specific-implementation-notes) and compact website structure are new adaptations that connect these patterns to this repository's workflow. They are not existing Wapps files copied verbatim. The initial separate technical-design template was consolidated into the brief and links to target-project documentation; the technical rules remain unchanged by that consolidation.

## Reconciliation and deliberate limits

- Wapps' frontend handbook is the primary source for frontend boundaries. Older page/partial descriptions sometimes place broader business logic in components; the adaptation keeps reusable invariants with the domain and orchestration with features/pages at their respective scopes.
- The abstract describes behavior-rich domains, while the frontend handbook also uses domain packages for DTOs and ports. Here domains can contain pure business behavior and contracts. A transfer object is not by itself a complete domain model. The older page instruction to import only types from domains is not carried over as a ban on pure domain behavior.
- Wapps separates pure port interfaces from Angular injection tokens. The reusable rule preserves the underlying separation between business contracts and runtime dependency binding.
- Wapps uses Angular, Nx, RxJS and Taiga UI. Those technologies are identified here solely as source context. Framework-specific profiles, API names, generators, file conventions and tool configurations are excluded from the reusable guidance; target projects choose their own mechanisms.
- Page instructions requiring the same header slots, skeletons, icons, spacing values and viewport widths on every page are not universal requirements. The existing baseline's content, design and responsive contracts remain authoritative.
- Older click-handler card navigation is replaced in this adaptation by the existing native-link rules `NAV-01`, `NAV-02` and `NAV-11`. No existing rule ID is repurposed.
- Source-specific shared replay caching is generalised to reuse of previous results; cache scope, invalidation and privacy remain explicit requirements. Source examples do not establish those policies for a new site.
- The architecture abstract's content-node registry, relation graph and eventually consistent projections are conditional patterns. They do not require every website to implement a graph, event system or separate read model.
- The SDK's authentication providers, storage engines and queue choices are implementation facts about Wapps. Only the responsibility boundaries and explicit treatment of partial failure are reused. Account, commerce and booking contracts still need their own extension.
- Existing baseline requirements supply the native navigation, privacy, authoritative input validation, race/failure handling and evidence standards used to make the imported conventions consistent across this repository.

The imported rule families are `ARC-*` (responsibility boundaries), `STR-*` (project structure) and `TECH-*` (implementation and verification). Existing baseline and capability IDs retain their definitions. Outcomes and exceptions use the same [acceptance report](../templates/acceptance-report.md) and [decision register](../templates/decision-register.md).

The framework-agnostic revision removes the initial optional stack profile and generalises dependency binding, public APIs, caching and presentation terminology. It retains the meaning and IDs of the corresponding rules; none is repurposed for a different responsibility.

The library now separates [authoritative rules](../rules/README.md#technical-rules) from their explanatory guides. The destination links in the source map lead to those guides, which reference the rule definitions. The folder migration preserves the rule IDs and wording.
