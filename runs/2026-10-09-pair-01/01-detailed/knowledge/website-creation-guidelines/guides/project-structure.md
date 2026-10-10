# Project structure and module placement

Use [the architecture responsibilities](architecture.md) to decide where code belongs. The trees below illustrate framework-agnostic structures adapted from [Wapps](../sources/wapps.md). Record the chosen arrangement in [the project brief's implementation notes](../templates/project-brief.md#project-specific-implementation-notes) or linked project documentation, mapping responsibilities to the selected language, build system and any framework conventions. Directory names and file extensions are project decisions.

## Rule reference

Related rules: [STR-01](../rules/project-structure.md#str-01), [STR-02](../rules/project-structure.md#str-02), [STR-03](../rules/project-structure.md#str-03), [STR-04](../rules/project-structure.md#str-04), [STR-05](../rules/project-structure.md#str-05), [STR-06](../rules/project-structure.md#str-06), [STR-07](../rules/project-structure.md#str-07), [STR-08](../rules/project-structure.md#str-08), [STR-09](../rules/project-structure.md#str-09), [STR-10](../rules/project-structure.md#str-10).

## Compact website example

A small static, server-rendered or single-application website can keep boundaries within one source tree. Omit directories for responsibilities the project does not have.

```text
src/
  pages/                  # Routes or page templates; placement depends on the project
  layouts/                # Shared shell and page layouts
  partials/               # Application-aware shared chrome
  components/             # Generic presentation
  features/               # Selected interactive/product capabilities
    enquiry/
      application/        # Use case, port and feature state
      infrastructure/     # Receiver adapter, if required
      presentation/       # Form-specific UI and mappings
  domain/                 # Pure business contracts/rules, when needed
  config/                 # Explicitly separated public and private configuration
content/                  # Authored content, if repository-managed
public/                   # Intentionally public static assets
tests/                    # Journey/integration checks; focused checks may be co-located
docs/                     # Brief, decisions, implementation notes and operating instructions
```

Declare each module's public API using the selected language's export, package or interface mechanism. Keep server-only code out of browser-delivered artifacts through the actual build and deployment boundaries; a directory name such as `infrastructure` does not enforce that separation. Where an existing toolchain provides routing or layout conventions, map responsibilities there. A website without external feature data needs no port/adapter folders.

## Multiple applications or shared libraries

Use separate modules or packages when applications share behavior, have different runtimes, or need enforceable dependency/build boundaries. One possible arrangement is:

```text
applications/
  <application>/
    entrypoints/<runtime>/     # Startup, packaging and runtime assets
    composition/               # Feature setup, configuration and adapter binding
    navigation/                # Routes, layout selection and path construction
    layouts/
    pages/
    partials/
    state/
services/<service>/            # Only when backend deployables are needed
shared/
  features/<feature>/
    application/               # Use cases, contracts and feature state
    infrastructure/            # Feature-owned external adapters
    presentation/              # Feature-specific presentation
  contracts/                   # Thin cross-application contracts
  domains/<domain>/            # Pure business contracts and rules
  foundation/                  # Generic primitives
  ui/<area>/                   # Generic presentation
  infrastructure/<adapter>/    # Shared service-side technology integration
  cross-cutting/               # Deliberately shared technical mechanisms
```

Frontend adapters normally remain inside the owning feature. Shared service-side infrastructure belongs outside browser-delivered artifacts. Backend capabilities can use the same separation between use cases, contracts and adapters. Choose one ownership map and identify compatibility paths during migration.

## Mapping responsibilities to the selected tools

Record concrete mechanisms in the brief's implementation notes or linked project documentation. The reusable guidance specifies what each mechanism must accomplish:

| Responsibility | Contract to preserve |
| --- | --- |
| Startup | One identifiable entrypoint for each selected runtime, with documented inputs |
| Composition | A declared place to configure features and bind their external implementations |
| Domain contracts | Business types, schemas or interfaces independent of runtime integration mechanisms |
| Routing and layout | Explicit route/template inputs and shared layout ownership |
| Presentation | Clear data inputs, interaction outputs and local styling boundaries |
| Public APIs | Documented module interfaces that consumers can use without internal imports |
| Dependency checks | Import review or tooling that verifies the selected dependency directions |

These responsibilities can be implemented with functions, objects, templates, modules or declarative configuration. Select mechanisms and versions for the project; the source documentation does not establish compatibility for a chosen stack.

## Placement guide

| New work | Put it with |
| --- | --- |
| Routed screen | Application pages/routes; register its layout and route inputs |
| Header, footer or sidebar tied to this app | Application partials and shell contract |
| Capability used on several pages | Feature application and presentation modules |
| Product-independent control | Generic UI, taking inputs and emitting events |
| Business invariant or shared business vocabulary | Owning domain, independent of framework services |
| External API/storage mapping | Owning adapter; expose the feature's port contract |
| URL vocabulary or route builder | Application navigation, or a shared boundary if several apps agree on it |
| Generic result or identifier primitive | Foundation/kernel, provided it has no product dependencies |
| Build, runtime or deployment wiring | The unit's packaging/configuration boundary |

For the implementation procedure, follow [Add a page or feature](../workflows/add-page-or-feature.md).
