# Technical implementation and verification

These rules supplement the [baseline](README.md#baseline-rules) for applicable implementation responsibilities. Absent layers or capabilities are `not applicable` with a reason. Examples and explanations are in the [technical implementation and verification guide](../guides/technical-conventions.md). Record choices in the [brief](../templates/project-brief.md), exceptions in the [decision register](../templates/decision-register.md) and evidence in the [acceptance report](../templates/acceptance-report.md).

## Feature contracts and data access

<a id="tech-01"></a>

- **TECH-01** — Give feature operations explicit input, result and failure contracts. Keep external response/storage shapes inside adapters and map them to the feature's contract. Use the selected language's types or schemas and validate untrusted inputs at the actual boundary; static types alone do not validate network data.

<a id="tech-02"></a>

- **TECH-02** — Make feature setup expose supported configuration and adapter choices through one public API. Document whether an adapter is connected, mocked or a demonstration; production configuration must not silently substitute demo success for a failed integration.

<a id="tech-03"></a>

- **TECH-03** — Specify expected absence, validation rejection and dependency failure separately when consumers handle them differently. Use a consistent result/error convention and map technical failures to useful UI states without exposing private diagnostic data.

## State and asynchronous work

<a id="tech-04"></a>

- **TECH-04** — Give each state value an owner, scope and lifetime: component, page, feature, shell, request/session or persistent storage. Use the smallest scope satisfying its consumers. In server-rendered applications, keep visitor-specific state isolated between requests/users.

<a id="tech-05"></a>

- **TECH-05** — Derive view models from owned state rather than maintaining independent copies of the same fact. Identify who may update the source and how dependent views refresh; use stable identities for repeated items.

<a id="tech-06"></a>

- **TECH-06** — For asynchronous feature work, define applicable idle/loading/success/empty/error states and retry behavior. Dispose of subscriptions/listeners or cancel work when its owner ends; late responses must not overwrite state for a newer route or request.

<a id="tech-07"></a>

- **TECH-07** — Where requests or responses are shared or cached, define the cache key, scope, invalidation, freshness and error behavior. A mechanism that reuses previous results must follow that policy. Private data follows `PERF-05` and the project's access boundaries.

## Navigation, templates and styles

<a id="tech-08"></a>

- **TECH-08** — Keep route vocabulary, parameters and repeated path construction in one declared navigation API or the framework's equivalent. Route links, menus and breadcrumbs must agree. Preserve native link behavior under `NAV-01`, `NAV-02` and `NAV-11`.

<a id="tech-09"></a>

- **TECH-09** — Keep template expressions focused on presentation. Put reusable mappings with the owning feature and business decisions with the domain; name view-model fields clearly enough to avoid duplicating calculations across templates.

<a id="tech-10"></a>

- **TECH-10** — Define presentation inputs, interaction outputs and any supplied content regions as a public contract. Content-region names describe their purpose; verify provided content renders in the intended region and retains meaningful document order.

<a id="tech-11"></a>

- **TECH-11** — Keep global theme/framework setup at the application boundary and component styling local or explicitly scoped. Consume the shared design tokens and named variants from `DES-01`–`DES-04`; do not reproduce Wapps' palette, spacing values or header arrangement by default.

<a id="tech-12"></a>

- **TECH-12** — Choose loading feedback appropriate to the operation and reserve relevant content space. A skeleton, progress indicator or retained previous result is a deliberate presentation choice; none may conceal an error, show misleading success or require artificial waiting.

## Development commands and checks

<a id="tech-13"></a>

- **TECH-13** — Document the prerequisites and exact commands for installation, local development, build, relevant checks and preview for each implemented unit. Identify required external services, safe fixture configuration and generated artifacts. Record actual execution separately from the proposed command list.

<a id="tech-14"></a>

- **TECH-14** — Match verification to the boundary being changed. Check domain decisions without framework infrastructure, feature orchestration with replaceable ports, adapters against their external contracts, and pages as composition points. Verify consequential route matchers/loaders and rendered visitor journeys where applicable.

<a id="tech-15"></a>

- **TECH-15** — Distinguish isolated tests, local service integration and deployed verification. A mock-backed page check does not prove delivery, authentication, persistence or publication against real services. Record environment, version, conditions and untested dependencies in the acceptance report.
