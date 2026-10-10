# Artifactory local website

A complete local review edition based only on the supplied `../inputs/` package. It implements the proposed 17 page identities in English and Polish (34 routes), with English as the default. This is locally drafted content, not a public release or owner-approved factual/translation record.

## Start

Requires Node.js 22 or later and npm. Run commands from this `website/` directory:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:4317/en/` or `http://127.0.0.1:4317/pl/`. The root redirects to English. The development command builds the site and watches `src/` and `public/`; refresh the browser after an edit. Changes to the build or server scripts require a restart. Stop with Ctrl+C.

Choose another port with `npm run dev -- --port 4320`. A sandbox may require permission to bind to loopback. The server deliberately listens only on `127.0.0.1`; do not expose this unapproved draft as a public preview. Local binding, rather than `noindex`, limits access. No authenticated remote-preview mechanism has been set up.

```sh
npm run build  # Creates dist/ with pre-rendered pages and local assets
npm start      # Serves dist/; builds first if it is missing
npm test       # Route, metadata, content, fragment and privacy checks
npm run test:browser  # Chrome journeys, responsive and accessibility checks
```

The browser suite uses an installed Google Chrome via Playwright and starts the preview server if needed. It does not download a browser. On a machine without Chrome, install a supported test browser and update `playwright.config.mjs` accordingly. Production browsing itself has no Chrome-specific dependency.

## What works

- All 34 pre-rendered pages, including seven distinct project detail pages in each language.
- Investor, partnership and demo journeys, with visible, editable intent/project defaults on Contact.
- Equivalent-page language switching, preservation of corresponding section anchors and permitted public query context. Changing language with an edited form prompts before discarding its contents.
- Keyboard/touch global menus, expandable mobile project navigation, breadcrumbs, article contents and sibling links.
- A local enquiry form with accessible validation, character limits, input preservation, draft editing, clipboard copying and manual-copy fallback. An email link opens the supplied public address.
- Real localized 404 responses, permanent single-hop legacy redirects, and the four known ArtiSense fragment targets.
- Local fonts with Polish coverage, original labeled SVG illustrations, reduced-motion behavior, printable content and a usable no-JavaScript fallback.
- Localized titles, descriptions, canonical URLs, reciprocal `hreflang` annotations, SVG share artwork and a favicon. The unapproved preview is `noindex` and its sitemap is intentionally empty.

## Contact delivery is unresolved

The selected launch capability is a receiving form plus public email. No receiving service, mailbox access, credentials, data operator or retention policy was supplied. **The form currently prepares an email draft; it does not submit or deliver enquiries.** It never displays a delivery-success state. Users copy their draft and send it themselves using their email app. The supplied `info@artifactory.tech` address is visible, but its operator and receipt have not been verified.

Nothing from the form is stored or sent by the site. Names, addresses and messages stay in page memory and are not put in URLs, cookies, browser storage or logs. Copying uses the device clipboard only after a button press. Mailto links contain just the address, not personal data. There is no database, CRM, analytics, external embed or background task. The local server rejects write requests with HTTP 405.

To complete real receipt, choose and authorize a receiver and assign an operator, define retention/deletion and privacy terms, then implement a server-side adapter with validation, abuse controls, bounded timeouts, idempotency and distinguishable accepted/rejected/unavailable/uncertain results. Test those states against a controlled inbox and update both language notices before enabling collection. No provider has been silently selected.

## Structure and editing

| File                | Responsibility                                                                                            |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `src/content.mjs`   | Stable page IDs, EN/PL route pairs, shared project facts, all technical article content, legacy redirects |
| `src/render.mjs`    | Semantic shared shell, page layouts, company/editorial copy, bilingual form and metadata                  |
| `src/visuals.mjs`   | Original conceptual SVG graphics and the provisional identity mark                                        |
| `public/styles.css` | Selected brand colors, local font declarations, responsive layouts, focus states and reduced motion       |
| `public/client.js`  | Progressive enhancement for menus, language context and local form drafting                               |
| `build.mjs`         | Static generation, font/license copying, metadata assets, robots and sitemap                              |
| `server.mjs`        | Loopback preview, strict public-file boundary, redirects, HTTP errors and development rebuilds            |
| `tests/`            | Structural and browser verification                                                                       |

Edit paired English and Polish facts together. Technical sections use matching stable IDs to preserve language-switch anchors. Company prose is colocated with the respective template in `render.mjs`; project facts and long technical copy are structured separately in `content.mjs`. The website intentionally has no CMS or client framework. Its small browser script enhances already-rendered HTML. Run `npm run format` for consistent source formatting.

Do not place source records, private materials or external reference screenshots in `public/`. The build copies only deliberate site assets and generated pages. The server cannot serve the repository or `inputs/` directory. Font dependencies are build inputs, not remote browser requests.

## Content and asset provenance

- Source scope: `../inputs/README.md`, project brief, sitemap, decision register, project context, selected colors and supplied reference screenshots. No other run or parent prompt package was consulted.
- The 17-page hierarchy is an implementation choice from the proposed sitemap; it does not turn proposed business claims into confirmed facts. Our Approach explains distinctions supported by the supplied workflow/evidence context and labels its draft status.
- September 2026 research and the 9 October 2026 input review remain dated. ArtiSense concepts, proposed processing, optical feasibility, physical tests and clinical validation are kept distinct. AIFIELD classical functions, assisted workflows and neural research are also separated.
- No funding amounts, customers, traction, team names, partner commitments, clinical claims, benchmark numbers or IP ownership facts have been invented. Missing company and team information is stated where relevant.
- The original vector art illustrates light, conceptual chip geometry and workflow relationships. It is **not** a real product photograph, an AIFIELD interface, a fabricated chip, a measured optical field or an approved research figure. Captions say so in both languages.
- The geometric mark, wordmark treatment, favicon and sharing artwork are provisional original design proposals. Approved identity assets were not supplied.
- WorkOS and THREESIXTY screenshots were inspected as composition references; none is copied into the website.
- Manrope and IBM Plex Mono are served locally from their Fontsource packages. Their supplied OFL license files are copied to `dist/assets/fonts/`.
- Primary colors retain `#662483`, `#087F8C`, `#202438`, white and mist. A derived darker teal (`#076B76`) is used for small text on pale tinted surfaces to meet contrast checks.

## Verification and limits

The final run on 9 October 2026 passed the build, all 7 structural tests and all 9 browser tests. Desktop Home/Investors and mobile Home/Polish project-detail screenshots were inspected. Narrow table overflow and tinted-surface label contrast found during testing were corrected before the final pass.

Verification uses Node 22 and desktop Chrome on this host, automated 320px-wide checks for every page in both languages, a 390px mobile navigation journey, desktop screenshots and axe WCAG 2.2 AA rules on representative templates. The suite verifies no external page requests, missing assets or client exceptions; form validation, no network writes or persistence, copy and copy-failure behavior; localized navigation and errors; redirects and fragment arrivals; and no-JavaScript/reduced-motion operation.

Automated accessibility checks do not replace a screen-reader review or a complete manual audit. Safari, Firefox, real devices, production network conditions, real mailbox delivery and final social-network previews have not been verified. Sharing artwork is supplied as SVG; some social crawlers require an approved raster image before release.

Generated `test-results/` screenshots and failure traces are local and ignored by Git. Structural checks are in `tests/site.test.mjs`; real browser checks are in `tests/browser/journeys.spec.mjs`.

## Publication boundary

No production deployment, external account connection, DNS change, public document sharing or paid service has occurred. The server always adds a `noindex` response header; default builds also have `noindex` metadata, a disallowing `robots.txt` and an empty sitemap. These are discovery controls, not authentication.

An eventual static release can generate the 34-route sitemap only when `CONTENT_APPROVED=true`, `SITE_INDEXABLE=true` and an explicit HTTPS `SITE_ORIGIN` are supplied to the build. Those switches are implementation controls, not evidence of business approval. Do not enable them until the actual release is authorized. A chosen hosting platform must implement the redirects and localized 404 behavior from the local server; simply uploading HTML does not install those HTTP rules.

Specific remaining dependencies are:

1. Technical and company owners approving claims, project stages, company identity, team, investment/IP statements and any public commercial details.
2. Review of English copy and Polish translations; neither is represented as human-approved.
3. Approved real imagery/diagrams and brand assets if required for publication, including share-image approval.
4. A verified form receiver and mailbox operator, data-handling policy, privacy review and delivery tests.
5. Hosting/domain access, release permission, broader historic URL inventory and an operating owner.

For local recovery, reinstall with `npm ci` and rebuild with `npm run build`; `dist/` contains no unique source data. A production rollback procedure depends on the hosting arrangement that is eventually selected.
