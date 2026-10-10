# Solution structure and tooling

Record `AF-STRUCT-1.1`. This is a planned structure, not an inspected application. The executor creates a single project under `website/`, relative to the experiment package root. Choose no additional application runtime unless an accepted package revision establishes a need.

## Selected tools and runtime

Use Node.js `24.21.0`, npm `11.19.0`, and exact direct dependencies in [toolchain.json](toolchain.json). Use Astro with its Node adapter in standalone mode and static output by default; only the enquiry endpoint and required request-specific technical handling opt out of prerendering. Use TypeScript strict mode, native scoped CSS, and small DOM scripts. No React/Angular UI runtime or Tailwind dependency is selected.

The runtime adapter and rendering choices follow the official Astro references recorded in [source-lock.json](source-lock.json). Exact package metadata, engines and peer requirements were inspected during compilation; install/build compatibility still requires execution within IU-RUNTIME and its consumer checkpoints. Material incompatibility triggers a recorded revision; do not use forced peer installs or silently substitute another stack.

Use Vitest for consequential pure contracts and adapter orchestration, Playwright for browser journeys, axe through Playwright for targeted accessibility automation, and Lighthouse for the specified lab budgets. Avoid adding test infrastructure for trivial visual constants or getters. Use Zod at content and network boundaries. Use native server fetch for the Resend adapter, with no delivery SDK.

## Structural elements

All locations below are relative to `website/`. Public entrypoints are the supported import boundary, not optional conventions.

| ID | Location / public contract | Responsibility and runtime | Consumers / permitted dependencies |
| --- | --- | --- | --- |
| E-01 | `astro.config.mjs`, package files, `scripts/` | Build/start/configure one Astro+Node artifact; explicit environment checks; generated `dist/client` and `dist/server` | Composition and tool setup only; no page or domain logic in startup |
| E-02 | `content/`, `src/content/index.ts` | Authored EN/PL page/shared records and private provenance; build-time validation and public-view projection | Pages/metadata/navigation consume exported validated views; content may use domain schemas, never UI/server adapters |
| E-03 | `src/navigation/index.ts` | Typed page IDs, locale, routes, ancestors, sibling groups, CTA helpers, redirects | Shell, pages, metadata, checks; depends only on route/content contracts |
| E-04 | `src/styles/`, `src/components/ui/` | Tokens and product-independent controls, cards, badges, figures, tables, buttons | Props/events only; no product data fetch, route construction, or private configuration |
| E-05 | `src/layouts/`, `src/partials/` | Shared shell, header, footer, breadcrumbs, project navigation; transient menu state | Public APIs E-03/E-04/E-09; no receiver implementation |
| E-06 | `src/pages/[...path].astro`, `src/pages/404.astro`, `src/templates/` | Route wrappers and company/project/contact/utility composition | E-02/E-03/E-04/E-05 and enquiry presentation; no provider calls |
| E-07 | `src/features/enquiry/domain/index.ts`, `application/index.ts` | Pure request/result schemas, validation, receiver port, submit use case and state contract | Domain has no Astro/DOM/HTTP dependency; use case depends on domain+port, not concrete adapters |
| E-08 | `src/features/enquiry/server/index.ts`, `src/config/server.ts`, `src/pages/api/enquiries.ts` | Privileged configuration, receiver implementations, abuse/time limits, one composition root and endpoint | Server composition binds E-07 to fixture/disabled/Resend adapters; no browser consumer imports E-08 |
| E-09 | `src/metadata/index.ts`, technical routes, `src/middleware.ts` | Metadata, sitemap, robots, headers, redirect and publication policies | Uses E-02/E-03 and explicit public build config; no private record serialization |
| E-10 | `src/features/enquiry/presentation/` | Form markup, DOM controller, visible state, localized error/receipt wording | Browser-safe E-07 contracts only, shared UI, supplied view data; network only to same-origin endpoint |
| E-11 | `tests/`, focused co-located checks, `scripts/check-*.mjs`, `scripts/performance.mjs` | Contract, boundary, route, browser and budget checks | Tests can inject ports/transports; reports go to `artifacts/`, never public output |
| E-12 | `README.md`, `docs/`, `artifacts/` | Actual module map, content/asset inventory, runbook, execution records, acceptance evidence | Documents actual versions/commands and gaps; generated artifacts distinct from source |

Do not create empty layers. Keep feature-specific mappings in their feature, one-page composition in its template, and generic controls in UI. Co-locate component markup/styles and focused tests where practical. Export supported APIs; cross-module consumers do not reach into internal implementation files. The server composition root is the sole adapter selector.

## Planned source tree

```text
website/
  package.json, package-lock.json, .nvmrc, .npmrc, .gitignore, .env.example
  astro.config.mjs, tsconfig.json, vitest.config.ts, playwright.config.ts
  content/
    pages/en/, pages/pl/          # structured authored copy
    shared/, evidence/, assets/  # shared facts and private source/review records
  src/
    content/index.ts             # validated public projections
    navigation/index.ts          # route and CTA API
    styles/                     # colors + shared visual values
    components/ui/              # generic components and states
    layouts/, partials/, templates/
    pages/
      [...path].astro, 404.astro
      api/enquiries.ts
      sitemap.xml.ts, robots.txt.ts
    features/enquiry/
      domain/, application/, server/, presentation/
    metadata/index.ts
    config/public.ts, config/server.ts
    middleware.ts
  public/                       # explicitly eligible public assets only
  scripts/                      # commands and private build/check helpers
  tests/                        # fixtures and consequential integration checks
  docs/                         # actual implementation, operation and run records
  artifacts/                    # generated logs/screenshots/reports; ignored
  dist/                         # generated build; ignored
```

IU-CONTENT may choose JSON or typed data files for individual copy records under this tree; the exported schema, route inventory, publication gates and ownership remain fixed. Do not put package inputs, the guidelines copy, or compiled instructions under `public/`. Do not serve arbitrary workspace paths. Generated files are disposable and must not become an independently edited source of truth.

## Shared contracts

`PageId` comes from routes.json; `Locale` is `en | pl`. `routeFor(pageId, locale)`, `equivalentRoute(pageId, locale, sectionId?)`, `ancestors(pageId)`, `projectPages(projectId, locale)` and `contactHref(locale, intent, project?)` centralize route construction. `getPageView(pageId, locale, buildProfile)` returns only presentation data. An unsupported identity is a typed missing result, not an arbitrary path.

Page views expose title/description, semantic sections, related-page IDs, project/maturity labels, captioned media and canonical identity. Private source references, review stamps and control fields stay behind the build-time projection. Layout receives locale, page ID, metadata and optional project/navigation context as explicit props; slots identify header/lead/body/aside meaning. No page imperatively mutates global shell state.

`submitEnquiry(request, {receiver, clock, limits})` returns the discriminated ENQ-1.0 outcomes. `EnquiryReceiver.accept(validatedRequest, submissionId, signal)` is the delivery port. Clock/transport substitution is explicit for deterministic checks. The browser form consumes only request/result types and public validation hints; server validation remains authoritative. Provider responses map at the adapter boundary.

Language/current page are URL-owned; menu is shell-local; form contents and pending ID are page-memory-owned; fixture receipt/idempotency state is server-process-owned; public content projections are immutable per build. No browser persistence, visitor session, cross-user content cache or background job is selected. Cancel browser work on teardown; scope request bodies/results to the request.

## Configuration and trust boundaries

| Setting | Boundary / required value |
| --- | --- |
| `SITE_PROFILE` | Build/server `preview` by default; `published` requires content/publication prerequisites |
| `SITE_ORIGIN` | Explicit origin for generated links: loopback URL for preview; approved HTTPS origin for published output; never infer from untrusted Host |
| `HOST`, `PORT` | Local run binds `127.0.0.1`, default port 4321; a free port may be chosen and recorded without changing scope |
| `ENQUIRY_MODE` | Server `fixture`, `disabled`, or `resend`; fixture restricted to preview plus loopback |
| `RESEND_API_KEY` | Server-only secret; missing/invalid live settings cannot fall back to fixture success |
| `ENQUIRY_FROM`, `ENQUIRY_TO` | Server-only verified sender and fixed approved recipient; never controlled by a visitor |
| Live activation record | Private record referencing actual user-supplied send authority, operator/data policy and trusted-proxy/abuse configuration; absent in this package |
| Public config | Only locale choices, published presentation origin/profile and other safe rendering settings; no provider key, private control record or raw environment dump |

Store examples with empty secret placeholders. Ignore `.env*` except `.env.example`, generated output, caches, and test artifacts. Use server-only imports and inspect actual client bundles; naming a folder `server` is insufficient. No credentials are provided here.

## Command contract

IU-RUNTIME implements the real host/check command entrypoints. Each component unit adds and executes its own meaningful checks through them. There is no later verification unit that first implements or runs them. A selected command must fail honestly when its required target/prerequisite is absent, not return placeholder success.

| Command from `website/` | Concrete ownership |
| --- | --- |
| `npm install` then `npm ci` | IU-RUNTIME pins/locks and demonstrates reproducible installation |
| `npm run dev`, `npm run start` | IU-RUNTIME owns loopback/configuration; IU-ENQUIRY owns explicit receiver modes |
| `npm run build` | IU-RUNTIME owns candidate isolation; IU-CONTENT owns validation/export; each page checks its artifact |
| `npm run build:published` | IU-CONTENT owns approval gates, RUNTIME safe artifact/profile selection; expected rejection for real unreviewed drafts |
| `npm run check` | Type/content/import runners from RUNTIME/CONTENT; every piece checks its own contracts |
| `npm run test` | Relevant pure/contract checks within each owner; ENQUIRY owns endpoint/receiver tests |
| `npm run test:e2e` | Each UI/page/capability owns its browser checks; plan checkpoints run newly available combinations |
| `npm run test:a11y` | Each rendered piece owns scoped axe and actual manual keyboard/contrast checks |
| `npm run check:links` | CONTENT supplies route-based runner; each piece validates destinations; checkpoints observe final counterparts |
| `npm run check:boundaries` | RUNTIME supplies import/bundle runner; each piece checks its real public/runtime boundaries |
| `npm run test:performance` | RUNTIME supplies measurement runner; each piece checks costs; HOME and longest PL technical-page owner measure specified Lighthouse samples |

Document scoped invocation/filter options and whether a command starts its own built server. Add the relevant test files and implement the selected assertions in the component unit; no command/test stub is evidence.

Use package-local pinned binaries. Browser downloads are environment prerequisites; record exact installed browser builds. Do not infer browser availability or passing tests from a configuration file. Setup permission/network failures are blockers for affected checks, while independent implementation continues.
