# Project structure and module placement

These rules supplement the [baseline](README.md#baseline-rules) for applicable implementation responsibilities. Absent layers or capabilities are `not applicable` with a reason. Examples and explanations are in the [project structure and module placement guide](../guides/project-structure.md). Record choices in the [brief](../templates/project-brief.md), exceptions in the [decision register](../templates/decision-register.md) and evidence in the [acceptance report](../templates/acceptance-report.md).

## Structural rules

<a id="str-01"></a>

- **STR-01** — Document the actual source, content, asset, configuration, test and deployment locations, plus each application's entrypoint and composition root. Distinguish authored inputs from generated output.

<a id="str-02"></a>

- **STR-02** — Organise product behavior by capability or domain and name its owner. Keep one-page presentation local; share a module when it has a clear consumer-facing contract. Do not move unrelated code into `shared` or `utils` merely to shorten imports.

<a id="str-03"></a>

- **STR-03** — Define each shared module's public entrypoint. Consumers use that API rather than importing internal files. If repeated deep imports are needed, revise the API or document a migration exception.

<a id="str-04"></a>

- **STR-04** — Keep imports flowing in the directions defined by the architecture. Path aliases must resolve to the intended public APIs; aliases and folders alone do not enforce a boundary.

<a id="str-05"></a>

- **STR-05** — Co-locate a component's presentation, styles and focused checks where the selected toolchain permits it. Keep feature-specific mappings with their feature and generic primitives in a deliberately small shared module.

<a id="str-06"></a>

- **STR-06** — Separate browser-safe configuration from privileged server/build configuration. Document where environment values enter the build or runtime and which outputs can contain them; never expose secrets through a client-facing configuration API or output.

<a id="str-07"></a>

- **STR-07** — Give independently built or deployed units explicit build/start/check commands, configuration inputs and artifact locations. A monorepo is optional; document how its units depend on each other if selected.

<a id="str-08"></a>

- **STR-08** — Keep generated assets, build output and local caches distinguishable from authored sources. Document regeneration and the source of truth; do not require manual edits to disposable output.

<a id="str-09"></a>

- **STR-09** — Document how to add a page, feature, content type and adapter when those concepts exist. A contributor must be able to find the owning module, registration point and relevant verification without searching every application.

<a id="str-10"></a>

- **STR-10** — When moving modules or replacing aliases, identify affected consumers and retain a migration plan for temporary compatibility paths. Do not leave both old and new implementations as competing sources of truth.
