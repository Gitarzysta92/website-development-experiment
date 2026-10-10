# Artifactory website — local editorial build

A bilingual, investor-first website built from the supplied `../inputs/` package. It generates 17 page identities in English and Polish (34 HTML routes) with no runtime dependencies beyond Node.js 20+.

## Start locally

```bash
cd website
npm run build
npm run check
npm run start
```

Open `http://127.0.0.1:3000/` (redirects to `/en/`). Set `PORT` to use a different port. `npm run dev` builds and starts in one command. Content edits in `content.mjs` require another build.

`npm run test:form` checks acceptance and validation against a local mock receiver.

## What works

- English and Polish routes, paired language switching, breadcrumbs, project navigation, responsive menus, local illustrations, contextual links, page metadata, and a 34-route sitemap.
- Known legacy paths redirect to proposed Polish destinations. Old ArtiSense fragment IDs exist on the Polish overview.
- Contact form fields, browser and server validation, status, failure and uncertain-result handling. It remains disabled until a receiver is configured; the public email stays visible.
- No external font, image, analytics, cookie, or CMS dependency. Project illustrations are labeled concepts rather than evidence. The typographic mark and favicon are provisional until an approved logo is supplied.

## Contact receiver

No receiver, privacy operator, provider or test inbox was supplied. Configure a trusted HTTPS endpoint before enabling the form:

```bash
ENQUIRY_ENDPOINT=https://your-receiver.example/endpoint ENQUIRY_TOKEN=your-server-secret npm run start
```

The server sends JSON `{type, project, name, organization, email, message}` as `POST` with optional `Authorization: Bearer ...`. A 2xx response means the configured receiver accepted the request; non-2xx responses do not produce a success message. Verify the actual receiver and delivery separately. The server keeps no enquiry database. It applies basic validation, a size bound, a short timeout and per-IP rate limiting. A production deployment needs a reviewed receiver contract, spam controls, privacy notice, operator, retention and deletion policy. Do not commit a real token; `.env*` is ignored except `.env.example`.

## Publication boundary

This build is a local editorial draft. Pages use `noindex,nofollow`, and `robots.txt` disallows crawling. These controls are not access control. Before any public release, confirm company and technical facts, English/Polish copy, rights for any real assets, team and legal details, domain migration, hosting, receiver operation, and privacy text. Remove draft indexing controls only after those decisions. The generated sitemap records the proposed routes but does not itself make this draft ready to publish.

The canonical domain and migration map are proposals from the input package. This repository changes no DNS or production site. There are no uploaded PDFs, extracted figures, third-party reference screenshots or claims of verified clinical performance, current revenue, customers, pilots, or funding amount.
