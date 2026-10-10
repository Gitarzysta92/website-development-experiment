# Architecture and responsibility boundaries

These rules supplement the [baseline](README.md#baseline-rules) for applicable implementation responsibilities. Absent layers or capabilities are `not applicable` with a reason. Examples and explanations are in the [architecture and responsibility boundaries guide](../guides/architecture.md). Record choices in the [brief](../templates/project-brief.md), exceptions in the [decision register](../templates/decision-register.md) and evidence in the [acceptance report](../templates/acceptance-report.md).

## Choose the necessary architecture

<a id="arc-01"></a>

- **ARC-01** — Describe the selected rendering mode, runtime entrypoints, deployable units and external systems, with the reason each is needed. A static website may need only templates, content and a build; accounts, a backend-for-frontend (BFF), queues and separate services require a project-specific reason.

<a id="arc-02"></a>

- **ARC-02** — Assign each implemented responsibility below to a named module or location. Responsibilities may share a package; do not create empty layers or separate services merely to reproduce a diagram.

| Responsibility | Owns | Keeps outside its boundary |
| --- | --- | --- |
| Runtime entrypoint | Starting and packaging an application for its execution environment | Page composition, reusable feature rules |
| Application composition | Routes, feature registration, adapter selection and configuration | Implementations of domain rules and external protocols |
| Shell/layout | Shared layout regions and their interaction state | Knowledge of every page's internals |
| Page/template | Screen composition, route inputs and page-specific view models | Reusable business rules, transport and persistence details |
| Partial | Application-aware header, footer, navigation or other shared chrome | Unrelated product workflows |
| Feature application service/use case | Sequencing a capability's operations and exposing them to consumers | Duplicated business invariants and vendor-specific protocol details |
| Domain | Business vocabulary, invariants, decisions and pure contracts | Presentation components, runtime dependency binding, HTTP clients, persistence mapping |
| Port | Contract for an operation required by a domain or feature | A particular provider's implementation |
| Adapter | HTTP, storage, vendor or other implementation of a port | Page layout and application-specific navigation |
| Generic UI | Presentation and local interaction through inputs/events | Product data fetching and application services |
| Foundation/kernel | Small reusable primitives, such as result or identifier types | Dependencies on features or applications |
| Shared boundary | Thin contracts between applications or modules | Full feature implementations |
| Cross-cutting support | Deliberately shared logging, tracing or similar technical mechanisms | A miscellaneous collection of business features |

## Dependency direction and composition

<a id="arc-03"></a>

- **ARC-03** — Keep domain contracts and rules independent of presentation frameworks and infrastructure implementations. Put runtime dependency binding in the consuming application/feature layer; retain the implementation-independent contract in its owning domain or feature.

<a id="arc-04"></a>

- **ARC-04** — For feature data access, make the use case depend on a port and make the adapter implement that port. Select the concrete adapter at a composition boundary. Switching between a real, mock or alternative adapter must not require editing page behavior.

<a id="arc-05"></a>

- **ARC-05** — Keep shared foundation, domain and UI modules from importing application code. Shared features must not import the internals of a consuming app. Document permitted imports and check for cycles across the chosen boundaries.

<a id="arc-06"></a>

- **ARC-06** — Keep entrypoints limited to bootstrapping and runtime packaging. Centralise application feature registration; do not repeat adapter selection across pages.

## Pages, routing and shared layout

<a id="arc-07"></a>

- **ARC-07** — Keep pages focused on route inputs, feature calls, presentation composition and screen-level loading/empty/error states. Move reusable business decisions into their owning domain/feature and external data access into adapters.

<a id="arc-08"></a>

- **ARC-08** — When pages share a shell, let a declared layout contract select its regions and inputs. Keep global layout ownership in the shell; do not make individual pages imperatively rewrite unrelated shell state.

<a id="arc-09"></a>

- **ARC-09** — When route metadata or loaders/resolvers drive composition, give their data an explicit schema or type. Loaders/resolvers prepare route data and delegate feature work; they must not duplicate feature services.

<a id="arc-10"></a>

- **ARC-10** — Keep generic UI dependent on supplied data and events. Keep product-specific presentation in its feature, and application-specific chrome in partials. A visually reusable component is not generic if it fetches product data or assumes one application's routes.

## Business meaning, permissions and derived data

<a id="arc-11"></a>

- **ARC-11** — Distinguish an actor/resource's identity, permission to perform an action and the business rules governing that action. Where protected operations exist, enforce permission at a trusted application boundary before invoking them; client route guards alone do not enforce server access.

<a id="arc-12"></a>

- **ARC-12** — Keep business invariants in their authoritative domain implementation. Application code coordinates permission checks, domain operations and persistence without redefining those invariants. Client-side checks may assist the visitor but cannot replace authoritative enforcement.

<a id="arc-13"></a>

- **ARC-13** — Distinguish domain behavior, transfer contracts, stored records and presentation models. Map between them where responsibilities differ; do not let a database schema or API response accidentally become the contract for every layer.

<a id="arc-14"></a>

- **ARC-14** — Where derived read models, indexes or projections exist, record their source of truth, update/rebuild mechanism, consistency expectations and stale/failure behavior. A projection must not silently become the authoritative write model.

## Backend capabilities, when selected

<a id="arc-15"></a>

- **ARC-15** — For each backend process or job, identify the bootstrap/composition owner, runtime configuration, dependencies and failure behavior. Keep concrete provisioning and adapter binding outside reusable feature behavior.

<a id="arc-16"></a>

- **ARC-16** — When a workflow writes data and publishes a message or calls another system, state which effects are atomic and how partial completion is detected and recovered. Specify duplicate handling and retry behavior; do not imply a transaction spans systems when it does not.
