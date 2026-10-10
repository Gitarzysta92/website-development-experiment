# Architecture and responsibility boundaries

Use this guidance when specifying the technical shape of a website. It extends the [baseline](../rules/README.md#baseline-rules) without selecting a framework, rendering mode, database or deployment topology. Record the chosen boundaries in [the project brief's implementation notes](../templates/project-brief.md#project-specific-implementation-notes) or linked project documentation, with decisions and exceptions in [the decision register](../templates/decision-register.md).

Adapted from the Wapps architecture abstract and frontend handbook; [source notes](../sources/wapps.md) explain the adaptations. This guide explains the architecture concepts. The linked rules define requirements; neither this guide nor an architecture diagram establishes implementation evidence.

## Choose the necessary architecture

Related rules: [ARC-01](../rules/architecture.md#arc-01), [ARC-02](../rules/architecture.md#arc-02).

The [responsibility table](../rules/architecture.md#choose-the-necessary-architecture) defines the owners and boundaries used by ARC-02. Use it to map the implemented responsibilities to project modules; the examples below explain how those boundaries interact.

The word `application` has two uses in Wapps: an application's composition library and a feature's use-case layer. Name these separately in the target project's module map.

## Dependency direction and composition

Related rules: [ARC-03](../rules/architecture.md#arc-03), [ARC-04](../rules/architecture.md#arc-04), [ARC-05](../rules/architecture.md#arc-05), [ARC-06](../rules/architecture.md#arc-06).

For a feature with external data, the runtime call path is:

```text
page -> feature use case -> selected adapter -> external system
```

The source dependency direction is different: both the use case and the adapter depend on the port contract. The composition root may import both to connect them. Dependency inversion does not require a dependency-injection framework; explicit function arguments can perform the same binding.

For example, a listing page consumes a listing use case. Its port describes listing inputs, records and failure outcomes. An HTTP adapter maps provider responses to that contract; a fixture adapter supplies the same contract for isolated checks. The application selects the adapter.

## Pages, routing and shared layout

Related rules: [ARC-07](../rules/architecture.md#arc-07), [ARC-08](../rules/architecture.md#arc-08), [ARC-09](../rules/architecture.md#arc-09), [ARC-10](../rules/architecture.md#arc-10).

In a router-based application, routes may select pages, partials, access checks, data loading and scoped dependencies. In a static or server-rendered site, template/layout declarations may serve the same responsibility. Neither a dynamic shell nor a client router is required.

## Business meaning, permissions and derived data

Related rules: [ARC-11](../rules/architecture.md#arc-11), [ARC-12](../rules/architecture.md#arc-12), [ARC-13](../rules/architecture.md#arc-13), [ARC-14](../rules/architecture.md#arc-14).

Wapps additionally models content existence and structural relations separately from business meaning. Apply that pattern only when several domains need shared resource identity or relation facts. Specify the concrete identities, relation meanings and lifecycle owner before introducing a registry or graph. A conventional content record can be sufficient for a small website.

## Backend capabilities, when selected

Wapps' backend SDK separates feature behavior, kernel primitives, platform interfaces and concrete extras/adapters. The same direction applies without requiring an SDK or separate packages:

```text
service bootstrap -> feature use cases + selected adapters
feature use cases -> domain/kernel contracts + platform ports
adapters -> platform ports + external technology
```

Related rules: [ARC-15](../rules/architecture.md#arc-15), [ARC-16](../rules/architecture.md#arc-16).

Accounts, commerce and booking still require the dedicated contracts in [capability modules](../capabilities/README.md). These architecture rules do not supply their missing product or security requirements.

## Verification

Use the [acceptance report](../templates/acceptance-report.md) to record applicable rule IDs and evidence:

- Trace a representative page interaction through its use case, port, adapter and authoritative data source.
- Inspect imports at declared boundaries, including domain framework imports, shared-to-app imports and cycles.
- Substitute an adapter for an isolated feature check without changing page code.
- Check route/layout composition and relevant failure states in the rendered result.
- For protected or multi-system operations, verify the declared enforcement and partial-failure paths.

Folder names alone do not prove these responsibilities are separated. Scale checks to the implementation and retain `not applicable` reasons for absent layers.
