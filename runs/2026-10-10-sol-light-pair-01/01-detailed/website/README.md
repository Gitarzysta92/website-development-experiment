# Artifactory local preview

A bilingual local draft for Artifactory, ArtiSense and AIFIELD. It implements the 17 selected identities at 34 English/Polish URLs. All copy is unreviewed and the preview is intentionally non-public. The contact form accepts synthetic test data locally; it does not send email.

## Setup and start

From this `website/` directory:

```sh
nvm install 24.21.0
nvm use 24.21.0
npm ci
npm run check
npm run build
npm run start
```

Open `http://127.0.0.1:4321/` (308 to English). `npm run dev` runs the Astro development server, but `npm run start` exercises the built preview host and its actual headers. To use another port, set both `PORT` and `SITE_ORIGIN` to the matching loopback URL. Set `ENQUIRY_MODE=disabled` to test the unavailable form state. Fixture is the default and is restricted to loopback preview.

## Checks

- `npm run test`: route/content and enquiry unit tests.
- `npm run seed:content`: idempotently add missing per-page JSON draft records without overwriting authored records or granting review approval.
- `npm run test:e2e`: Chromium route, form, recovery and representative accessibility checks; start the built server first.
- `npm run test:a11y`: targeted axe checks only; it is not an accessibility certification.
- `npm run check:links`, `npm run check:boundaries`, `npm run test:performance`: inspect the built artifact.
- `npm run build:published`: expected to reject these unreviewed drafts before replacing `dist/`.

See [runtime](docs/runtime.md), [content](docs/content.md), [enquiry](docs/enquiry.md), [acceptance report](docs/acceptance-report.md), and [execution record](docs/execution-record.md). Browser screenshots and Lighthouse JSON are in ignored `artifacts/`.

## Status

This is a local preview, not an approved or deployed public website. `info@artifactory.tech` is a supplied candidate address, not a verified mailbox. Live Resend transport is implemented for isolated protocol testing only; no provider message or mailbox delivery has been observed. Factual, Polish, privacy, asset-rights, domain and publication approvals remain with the responsible owners.
