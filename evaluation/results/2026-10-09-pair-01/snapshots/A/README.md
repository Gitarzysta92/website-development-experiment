# Artifactory local website

AF-D1 revision 1.1 implementation: 17 page identities in English and Polish, 34 editorial routes, localized recovery, and a complete local enquiry workflow. The site is a loopback-only, noindex draft. Factual, translation and asset reviews remain pending. No production publication or real email delivery has occurred.

## Start the built site

Run from this `website/` directory:

```sh
export PATH="$PWD/.runtime/bin:$PATH"
node --version
npm --version
npm start
```

Open `http://127.0.0.1:4321/en/` or `http://127.0.0.1:4321/pl/`. The root redirects to English. Stop with Ctrl-C. Ports 4321 and 4322 must be free. The run-local runtime is Node 24.21.0 with npm 11.19.0. A new checkout must provide these exact versions; the runtime folder itself is ignored.

## Reproduce and verify

```sh
export PATH="$PWD/.runtime/bin:$PATH"
npm ci
npm run check
npm test
npm run build
python3 scripts/check-built.py
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox --project=webkit --grep 'critical demo receipt'
npm run check:links
npm run test:performance
```

Browser verification uses the Playwright-pinned browsers. On a new machine, install them with `npx playwright install chromium firefox webkit`. Local servers and browser launch require host permission if the execution sandbox blocks them. Run browser and performance commands sequentially: each owns ports 4321/4322 and stops its server afterward. `npm run dev` starts the same guarded loopback host for development.

The complete Chromium run skips the four opt-in component-fixture tests because fixture routes are absent from ordinary builds. Exercise them separately, then restore the normal artifact:

```sh
COMPONENT_FIXTURES=1 npm run build
COMPONENT_FIXTURES=1 npm run test:e2e -- --project=chromium tests/browser/components.spec.ts
npm run build
```

`node scripts/verify-recovery.mjs` exercises a failed candidate while the site is running, a temporary draft/caption edit, blocked unapproved publication, exact source restoration, and selecting the previous artifact. It restores the authored record in a finally block. Run only with no other site process or editor modifying that record.

## Enquiries

The default `ENQUIRY_MODE=fixture` receives synthetic enquiries in bounded process memory, returns an explicitly local receipt, and sends no email. A restart deletes receipts; entries expire after 24 hours. Browser values and the retry ID remain only in page memory. The built-in acceptance observer records receipt IDs and counts, never enquiry payloads, under ignored artifacts.

`ENQUIRY_MODE=disabled` gives an unavailable outcome and retains the email alternative. The Resend adapter has isolated protocol tests with injected transports. It requires approved sender/recipient, credentials and the private activation record described in `docs/enquiry.md`. None is supplied. Do not use synthetic receipt evidence as evidence of live mailbox delivery.

`.env.example` lists environment variable names only. Supply values through the process environment; the launcher does not automatically source an `.env` file. Never place credentials in content, public assets or browser code.

## Edit and extend

- `content/pages/{en,pl}/`: authored draft records; stable identities map to `content/shared/routes.json`.
- `src/content/index.ts`: schema, public projection and edit/review invalidation. `src/content/publication.mjs`: review fingerprints and publication eligibility.
- `src/templates/`: page-owned composition; shared `src/partials`, `src/layouts` and `src/components/ui` provide the shell and visual primitives.
- `src/features/enquiry/`: domain → application/receiver port → server adapter; browser controller owns form state only.
- `content/assets/registry.json`: original concept assets and unreviewed publication status.

Use the edit API when changing records; factual edits invalidate both language reviews. Changes to a diagram, caption or template asset require the associated asset review to be renewed. The author scripts seed missing records and refuse to overwrite existing work. Required section identities are enforced in `content/shared/page-contracts.json`. Do not rerun historical bootstrap material in artifacts.

Publication is gated by all 34 reviewed records, HTTPS origin and separate privacy/receiver/asset approval configuration. `PUBLICATION_APPROVAL_FILE` points outside public output to a JSON object with `origin`, `privacyApproved`, `receiverApproved`, and `assetsApproved`; flags must be true and origin must match `SITE_ORIGIN`. This configuration cannot make unreviewed records eligible. The isolated approved fixtures in tests are never applied to real content. This project has no production release configuration or authorization.

## Evidence and operation

Read `docs/acceptance-report.md` for observed outcomes, exact fingerprints, conditions and remaining external prerequisites. `docs/execution-record.md` preserves attempts and repairs. `docs/runtime.md`, `docs/content.md`, `docs/enquiry.md`, `docs/migration.md`, and `docs/pages/` describe their owners and extension procedures.

Raw screenshots, browser traces/results, receipt observations, Lighthouse JSON, and recovery logs are in ignored `artifacts/`. Only `dist/client` is public static output; `dist/server` stays private to the host. `inputs/`, `compiled/`, `knowledge/`, source records and verification material are never public assets. No analytics, remote fonts or scheduled jobs are installed.
