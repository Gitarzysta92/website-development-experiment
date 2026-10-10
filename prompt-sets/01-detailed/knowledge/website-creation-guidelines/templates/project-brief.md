# Website project brief

Copy this file into the target website repository. Replace prompts with facts or use `recommend`, `use default`, `unknown` or `not applicable`. Record approved defaults explicitly; there is no hidden universal stack or visual theme.

Use [Prepare creation inputs](../workflows/prepare-creation-inputs.md) to assemble the initial version from the request and available materials. Incomplete fields may remain explicit during preparation. Resolve consequential scope, structural-contract, dependency and acceptance decisions before completing the implementation package; later execution prerequisites need defined providers and availability conditions.

- Request/source and requested delivery scope:
- Brief version/last updated:
- Guidelines location and version used:

## Project identity and purpose

- Project/business name:
- What the business/product does:
- Primary audience and its main need:
- Secondary audiences:
- Primary successful visitor outcome:
- Secondary outcomes:
- Differentiation and evidence:
- Claims or promises the website must avoid:
- Project owner:

## Audience and usage context

- Countries/markets:
- Languages and default language:
- Audience technical familiarity:
- Likely arrival sources (search, referrals, campaigns, direct links):
- Important devices, browsers or corporate restrictions:
- Accessibility needs/target:
- Relevant usage conditions (short visits, poor connectivity, mobile field use):
- Known facts versus audience assumptions:

## Domain, visibility and migration

- Intended domain:
- Existing website/repository:
- Replacement, redesign or new separate website:
- Public/indexable, public/unindexed and private areas:
- Existing routes/backlinks that must remain usable:
- Domain dependencies to preserve (email, subdomains, verification records):
- Preview access requirements:
- Domain/hosting operator:

## Pages, content and capabilities

| Page or content type | Visitor purpose | Required fields/source | Related content/next action | Visibility |
| --- | --- | --- | --- | --- |
| To define | | | | |

Select capabilities: structured CMS content / articles / portfolio or case studies / search and filters / forms / galleries / multilingual content / theme preference / assistant / accounts / commerce / booking / downloads / other.

Label candidate capabilities as proposed and distinguish them from confirmed scope and exclusions. Link consequential choices to the decision register.

- Capability-specific requirements:
- Content ordering and adjacent-navigation rules:
- Representative critical visitor journeys:
- Explicit exclusions:

## Implementation objectives

An implementation objective states what has to be implemented. Use stable project-local references, keep selected objectives distinct from proposals, and define the full agreed scope before compilation completes. Pages, content, capabilities and journeys form the website model; compilation maps objectives to the chosen solution structure and bounded implementation work.

| Objective reference | What has to be implemented and required outcome | Website model/journey context | Source, status and decision reference | Boundaries/exclusions |
| --- | --- | --- | --- | --- |
| To define | | | | |

- Selected creation/change workflow references, versions and applicable steps:
- Complete agreed scope, including design, content, integration, verification and release/handover where selected:

Use the library's [objective view](../guides/requirements-matrix.md#implementation-objective-view) to locate relevant sources, not to add unrequested features. The compiled plan owns objective-to-structure-to-unit mappings and execution order.

## Sources and editing permissions

For each supplied item, include its location/version, source, intended use, editing/publication permissions, availability and owner, or link an existing inventory. Keep unknown permissions and missing materials explicit.

- Copy/documents/presentations:
- Images, logos, fonts and other assets:
- Authoritative source when materials disagree:
- Verbatim material:
- Material that may be edited, summarised or rewritten:
- AI drafting allowed and applicable provenance/disclosure policy:
- Translation policy and reviewer:
- Facts, results or testimonials requiring confirmation:
- Public versus internal material:
- Content owner/reviewer:

## Brand, layout and interaction direction

- Existing brand requirements:
- Required colours/fonts/recognisable elements:
- References and what to borrow from each:
- Disliked examples and specific reasons:
- Required layouts/navigation patterns:
- Permitted project/product-specific palettes:
- Light/dark/system appearance requirements:
- Motion preferences:
- State that must persist across navigation/refresh/return visits:
- Important actions that must remain immediately reachable:
- Behaviour to avoid:

## Architecture, software and integrations

- Existing infrastructure and repository:
- Required/prohibited technology:
- Chosen language, framework and tool versions, with status and decision references:
- Proposed or accepted rendering strategy (static, server, client or hybrid) and rationale:
- Proposed or accepted project structure (compact, multiple applications or another arrangement) and rationale:
- Existing module boundaries, shared libraries and public interfaces to preserve:
- Required runtimes/deployable units and browser/server boundaries:
- Open-source/self-hosting/provider constraints:
- CMS/editor workflow:
- Hosting/deployment pipeline:
- Analytics tool:
- SEO/crawl/reporting tool:
- Monitoring/error-reporting tool:
- CRM/contact/notification destination:
- Other systems to read from or write to:
- Required runtime/region constraints:
- Infrastructure and recurring-service budget:
- Access arrangements (reference connections or secret stores, not secret values):
- Technical owner:

Apply the relevant [architecture](../guides/architecture.md), [structure](../guides/project-structure.md) and [technical](../guides/technical-conventions.md) guidance. Record project-specific choices below or link to their authoritative location in the target project's README or existing documentation. Do not restate the reusable rules. When copying templates, retain or replace guideline links with a resolvable reference to the version used.

### Project-specific implementation notes

Keep only applicable notes. Label entries as `confirmed requirement`, `accepted default`, `proposed`, `assumption`, `implementation fact` or `unknown`; link consequential choices and exceptions to the decision register. For implementation facts, identify the inspected revision/environment. Verification results belong in the acceptance report. A separate design document is optional when complexity warrants it; link to it instead of duplicating these notes.

- Module map: responsibilities/owners, locations, public contracts, allowed dependencies and runtime/trust boundaries:
- Entrypoints, composition/adapter binding, authored sources, generated output and regeneration:
- Selected feature contracts: inputs/results/failures, authoritative business/access checks and connected/mock/demo adapters:
- Page/route/layout composition, navigation source and data-loading contracts:
- State ownership/lifetime, request/user isolation, persistence/cache policy and stale-response/failure behavior:
- Multi-system operations or derived data, if present: authority, consistency, retries, duplicate protection and partial-failure recovery:
- Configuration sources: build-time/runtime, browser-visible/private and missing/invalid behavior; reference secret stores, never secret values:
- Contributor instructions: prerequisites/services, install/develop/build/check/preview commands and adding supported pages/features/adapters:
- Deployment/recovery runbooks, temporary migrations and remaining technical unknowns:
- Authoritative implementation-document links and revision/environment, where used:

### Compiled implementation units

Use the [compilation workflow](../compilation/compile-implementation-units.md) to combine project inputs, knowledge and selected workflows into all [unit contracts](../compilation/implementation-unit.md) and the [implementation plan](../compilation/implementation-plan.md) before execution. An implementation unit is bounded work that creates, changes, integrates or verifies elements of the solution structure; it is not a website-model element or a separate task hierarchy.

- Authoritative complete plan and exact unit-manifest reference/revision:
- Solution-structure reference/version, using the implementation notes or existing project documentation:
- Objective-to-structure-to-unit mapping in the plan:
- Rule/requirement coverage location in the acceptance report or existing matrix:
- Package completeness and mode-specific acceptance record in the plan:
- Shared contracts and affected consumers (link authoritative records):
- Execution-record location and current implementation baseline:

Keep one authoritative inventory and schedule in the plan, embedded here or linked from existing records. Contract completeness, package acceptance, execution eligibility, progress and verification are [separate concerns](../compilation/README.md#completeness-acceptance-and-eligibility).

## Data and privacy

| Data/feature | Purpose | Destination | Who accesses it | Retention/start event | Deletion mechanism |
| --- | --- | --- | --- | --- | --- |
| To define | | | | | |

- Optional tracking and consent policy:
- Applicable privacy signals/preferences:
- External-service restrictions:
- Geographic/organisational requirements:
- Data excluded from analytics/logs:
- Privacy notice/policy owner:
- Outstanding privacy decisions:

## SEO, sharing and measurement

- Target markets, topics and customer terminology:
- Known valuable pages/search terms:
- Relevant competitors:
- Social channels/share-preview needs:
- Business questions and success metrics:
- Definition of a completed conversion and authoritative system:
- Required events/reports:
- Desired ongoing crawl/reporting frequency:
- Measurement limitations already known:

## Operations and quality targets

- Critical functions to monitor:
- Alert destination and responsible operator:
- Required background jobs and evidence of execution:
- Supported browser/device matrix:
- Performance metrics, budgets and test conditions:
- Expected traffic/peak use:
- Availability and acceptable maintenance interruption:
- Recovery time/data-loss objectives:
- Backup and restore owner:
- Deadline and delivery budget:
- Features that can be postponed:

## Execution policy

Supply this policy before the complete package is accepted. See the [implementation policy contract](../implementation/README.md#execution-policy); neither mode is an implicit default. Link an existing authoritative policy instead of duplicating its fields.

- Policy reference/version, source of authority and effective scope:
- Mode (`human_review` or `autonomous`):
- Fixed objectives/outcomes, protected contracts and quality/budget constraints:
- Permitted requirement, scope, structure, dependency and acceptance changes:
- Permitted scope substitutions/reductions, or explicit prohibition:
- Human reviewer and acceptance responsibility, if `human_review`:
- Delegated acceptance/change authority, if `autonomous`:
- Initial-package and material-revision acceptance conditions/evidence:
- Additional checkpoints, required evidence and responsible evaluator under the selected mode:
- Blocker destination/owner and who may amend authority:

Both modes compile all units and the plan upfront. Repair ordinary defects within existing contracts. Material changes explicitly revise affected units and the plan, validate the whole replacement package and follow the selected acceptance mode before affected execution. Autonomous acceptance stays within supplied authority; publication authority is recorded separately below.

## Review, publishing and handover

- Visual review owner:
- Factual/content review owner:
- Publication authority and scope of automatic publishing:
- Required preview/release process:
- Post-launch operator:
- Training/handover needs:
- Maintenance scope after launch:

## Recommendations and unresolved decisions

- Please recommend:
- Accepted defaults:
- Open assumptions:
- Blocking decisions:

## Creation handoff

- Input review date and brief/decision-register versions:
- Next creation stage and work that can proceed:
- Missing inputs/conflicts and decision links, including affected step, impact, owner and when resolution is needed:
- Existing verification evidence with scope, revision/environment, or none:
- Compilation status and links to the full plan, manifest, completeness result and package acceptance, when available:
- Execution eligibility/progress and declared unavailable prerequisites, linked from execution records when execution has begun:

Preparation can hand off incomplete inputs to discovery. Implementation requires the entire package to be complete and accepted under the execution policy; individual complete units can still wait for declared prerequisite outputs. Neither preparation nor package acceptance establishes implementation or verification results. Link the decision register and acceptance report here. If the report has not been created, record that explicitly; existing unchecked items stay `not checked`:
