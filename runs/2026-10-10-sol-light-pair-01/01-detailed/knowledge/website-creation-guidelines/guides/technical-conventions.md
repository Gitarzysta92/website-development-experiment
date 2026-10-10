# Technical implementation and verification

Apply these conventions to the capabilities and architecture chosen in [the project brief](../templates/project-brief.md), using its implementation notes or linked project documentation for concrete mechanisms. They adapt the Wapps feature, page and frontend guidance; see [source notes](../sources/wapps.md). Tool names, numeric targets and runtime choices remain explicit project decisions.

## Feature contracts and data access

Related rules: [TECH-01](../rules/technical-conventions.md#tech-01), [TECH-02](../rules/technical-conventions.md#tech-02), [TECH-03](../rules/technical-conventions.md#tech-03).

Expose the feature's operations through a public contract and connect its dependencies at a declared composition point. Modules, functions, objects or configuration can perform these roles. Consumers use the same contract when a real adapter is replaced with a fixture adapter.

## State and asynchronous work

Related rules: [TECH-04](../rules/technical-conventions.md#tech-04), [TECH-05](../rules/technical-conventions.md#tech-05), [TECH-06](../rules/technical-conventions.md#tech-06), [TECH-07](../rules/technical-conventions.md#tech-07).

Record representative state contracts before choosing a state library:

| State | Example ownership decision | Evidence to collect |
| --- | --- | --- |
| Current page tab | Page-local, or URL-backed when it must be shareable | Direct entry, navigation and Back/Forward behavior |
| Shared feature result | Feature-scoped, with declared refresh and invalidation | Two consumers, changed inputs and failed refresh |
| Shell region visibility | Shell/layout owner | Route change, resize and focus recovery |
| Persisted preference | Chosen persistence scope and fallback | Reload, malformed/unavailable storage where applicable |

These are examples, not universal persistence defaults. The theme and assistant modules define additional contracts when selected.

## Navigation, templates and styles

Related rules: [TECH-08](../rules/technical-conventions.md#tech-08), [TECH-09](../rules/technical-conventions.md#tech-09), [TECH-10](../rules/technical-conventions.md#tech-10), [TECH-11](../rules/technical-conventions.md#tech-11), [TECH-12](../rules/technical-conventions.md#tech-12).

Use role-based names consistently within the selected language: page, partial, feature use case, port, adapter, transfer object, view model and state owner. Document naming conventions in the target project so contributors can identify responsibilities without relying on source-project prefixes or suffixes.

## Development commands and checks

Related rules: [TECH-13](../rules/technical-conventions.md#tech-13), [TECH-14](../rules/technical-conventions.md#tech-14), [TECH-15](../rules/technical-conventions.md#tech-15).

| Boundary | Suitable evidence when behavior warrants it |
| --- | --- |
| Domain | Valid/invalid decisions and invariants using pure inputs |
| Feature use case | Controlled port responses, state transitions and failure/retry paths |
| Adapter | Request/response mapping and relevant provider failures |
| Presentation | Inputs/events, state rendering, keyboard behavior and focus |
| Routing/layout | Parameter handling, direct entry, partial selection and relevant navigation failures |
| Package boundary | Import review, or existing lint/dependency checks, for forbidden edges and cycles |
| End-to-end journey | Actual receiving system and final user-visible outcome under declared conditions |

Use the project's existing check tools where they provide useful evidence. Add automation only when it protects consequential behavior; avoid tests that repeat trivial implementation details (`QA-04`). Build success and type checking complement rendered checks rather than replacing them.
