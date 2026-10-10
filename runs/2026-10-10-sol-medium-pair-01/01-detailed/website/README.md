# Artifactory local website preview

This is a bilingual, unreviewed local draft built from package AF-D1 revision 1.1. It has 17 page identities and 34 English/Polish routes. It is not published. The only working receiver in the supplied local setup stores synthetic enquiries in process memory and sends no email.

## Run the built preview

From this `website/` directory:

```sh
nvm install 24.21.0
nvm use 24.21.0
npm exec --yes --package=npm@11.19.0 -- npm ci
npm exec --yes --package=npm@11.19.0 -- npm run build
AF_PROFILE=preview AF_RECEIVER=fixture npm start
```

Open `http://127.0.0.1:4321/`. The host binds to `127.0.0.1` and redirects `/` to `/en/`. Use synthetic information in Contact. To stop, press Ctrl-C; local fixture receipts disappear on restart. If port 4321 is occupied, set `PORT=4322` for `npm start` and `AF_PUBLIC_ORIGIN=http://127.0.0.1:4322` for the build. The scripts use the selected local origin in metadata.

`npm run dev` is a content development convenience. The built `npm start` path applies the actual local response headers and is the verified preview topology. `npm run build` validates all records, checks Astro types and regenerates `dist/`. `npm test` runs pure domain/receiver/publication tests. With the built server running, `npm run e2e` and `npm run verify:output` reproduce browser and output checks. Run `npm run test:http` after a fresh server start because its expected rate-limit sequence assumes a clean process. Browser checks need Playwright Chromium, Firefox and WebKit installed; install the pinned browser binaries with `npx playwright install` if absent.

## Editing and structure

- `content/pages/en/` and `content/pages/pl/`: one structured draft per identity and locale. Page-specific edit notes are in `docs/pages/`. Run `node scripts/seed-content.mjs` only to fill missing files; it does not overwrite authored edits.
- `src/content/`: validated record loader, public projection, review invalidation and publication gate. `content/evidence/review-ledger.json` is private status/provenance; all reviews are pending. A factual change invalidates affected translations, and a localized or media change needs its own review before publication.
- `src/navigation/`, `src/layouts/`, `src/partials/`, `src/components/ui/`, `src/templates/`: route identity, frame, shared navigation, concept visuals and page composition. The palette comes from the supplied selection unchanged.
- `src/features/enquiry/`: pure schema/use case, server receiver implementations and browser form. Only the server imports privileged configuration and the Resend adapter.
- `scripts/serve.mjs`: loopback host for prerendered pages and the API. It adds preview cache, security and robots headers to files that Astro otherwise serves outside middleware. It hashes the built inline scripts for CSP on startup.
- `public/`: only original preview assets. Supplied source material, design reference screenshots, the compiled package and review evidence remain outside this folder.

The build refuses `AF_PROFILE=published` because factual and language review, asset permission, live privacy/receiver configuration and public origin are not approved. Do not change draft records to published merely to bypass this gate. The known historic URL map is in `docs/migration.md`; the full prior URL inventory still requires the domain operator.

## Evidence and unresolved work

See `docs/components.md` for shared component contracts, `docs/acceptance-report.md` for observed local checks and `docs/execution-record.md` for repairs and status. Raw browser screenshots, Lighthouse JSON and command outputs are under `artifacts/`. Local fixture acceptance, provider protocol tests, real provider acceptance, operator mailbox receipt, content review and publication have distinct statuses there.
