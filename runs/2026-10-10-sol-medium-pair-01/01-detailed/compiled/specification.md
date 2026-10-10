# Artifactory implementation specification

Record `AF-SPEC-1.1`; decisions [AF-DEC-1.1](decisions.md); source [HP-1.1](../inputs/README.md). All requirements below are implementation targets, not claims about completed work.

## Scope and content authority

Build a polished local website that helps an investor understand Artifactory, assess ArtiSense and AIFIELD, and make an informed company-level investment enquiry. Support partners and demo enquiries as secondary journeys. The [source sitemap](../inputs/docs/sitemap.md) owns each page's purpose and subject coverage; [routes.json](routes.json) selects its exact 17 identities and 34 localized paths for this experiment.

Use [project-context.md](../inputs/content/project-context.md) as the supplied factual background. Source PDFs are intentionally unavailable and are not prerequisites. Draft complete English copy and equivalent Polish copy, including UI, forms, metadata, diagrams, captions, and meaningful alternatives. No lorem ipsum, duplicated filler, empty “coming soon” pages, or fabricated evidence. Explain each technical subject in plain language before specialist detail.

Preserve the distinction between ArtiSense's proposed analog interpretation processor and AIFIELD's neural field research. Describe the glucose work as design/simulation unless stronger evidence is supplied. Describe partial agent assistance with human review; do not claim autonomous chip design. Preserve September 2026 context where referring to that snapshot. Omit current funding ask, revenue, clinical accuracy, actual customers/pilots, ownership/IP claims, biographies, legal identifiers, or partner logos when unsupported. AIFIELD demo CTA requests a conversation; it does not promise instant product access.

Missing evidence must produce useful qualified explanation, not invented measurements. Use “what the supplied work supports / what remains to be validated” tables without fabricated numbers. About can explain company focus and the two projects without an invented roster. Our Approach explains evidence categories and the proposed development approach, without claiming a confirmed company procedure. Partnerships describes possible discussion topics as proposals, not active commitments.

Content provenance and editorial status remain in private records. Visitor-facing copy carries scientifically meaningful uncertainty naturally; do not scatter compilation IDs, agent instructions, or engineering notes through the pages. The local preview has one unobtrusive draft indicator and a clear test-mode notice at the form.

## Information architecture and navigation

Implement the supplied header, footer, breadcrumbs, project-local navigation, contextual links, and visitor journeys. The route registry is authoritative for link generation, page identity, language equivalents, hierarchy, and stable project order (ArtiSense then AIFIELD). Use native links; preserve direct entry, refresh, Back/Forward, modified clicks and new tabs.

Every technical child has a brief project introduction, overview link, sibling links, breadcrumb and relevant onward action. The Projects menu links to the index and both overviews; technical children stay in project-local navigation. The global primary CTA opens Contact with investment intent. Partnership and demo CTAs visibly preselect editable context. Allowlisted query values are `intent=investment|partnership|demo|general` and `project=artisense|aifield`; invalid values are ignored. Do not put names, email, message, or other personal data in URLs.

Language switching uses page IDs, preserving a corresponding section anchor where defined. English is default only at `/`; explicit EN/PL routes never redirect based on browser locale. All selected pages must have both languages. For an intentionally missing translation in a robustness fixture, disable that alternative with an explanation instead of serving the wrong language under its path. No persisted preference cookie.

Keep the input sitemap's five legacy mappings and four Polish ArtiSense alias anchors. Use a single-hop 308 redirect for known replaced paths; serve real 404 responses for unknown routes, with localized recovery when a language prefix is known. Do not blanket-redirect unknown paths to Home. Final historic migration inventory remains a launch prerequisite.

## Content and asset contracts

Author structured records with stable IDs, locale, page type, title, description, sections, related IDs, project context, source references, source revision, editorial state, and modification time. Keep shared company/project summaries and UI messages in one authority. Separate `draft`, `reviewed`, and `published` intent from the actual build/release outcome. A record may be previewable without being approved for publication.

Keep factual and translation reviews separate. A factual change invalidates factual review and affected translations; changing localized wording invalidates that locale's language review; changing a media asset/caption invalidates the affected asset/content review. No seeding/import action can set human approvals. Local generation can be repeated without overwriting subsequent authored edits. Validate unique IDs, locale pairs, slugs, reserved paths, relationships, required page sections, and asset existence before rendering.

Public rendering consumes an explicit public view model, excluding preparation references, private notes, owner contact details, approval evidence, and unpublished content. The local build may render draft editorial text on loopback but must not expose whole source records or input folders. Production export requires approved facts, both translations, asset permissions, origin, privacy and receiver configuration; fail clearly when prerequisites are absent.

Use the supplied colors unchanged. Create a restrained text wordmark, favicon/share fallback derived from the selected colors, and original explanatory vector diagrams. Register every new asset with ID, source/author, file, placement, concept/evidence status, EN/PL caption/alternative text and publication status. Concept diagrams may explain a proposed system; they must not masquerade as real interface screenshots, measured plots, or approved product renders. The WorkOS/THREESIXTY screenshots remain private design references.

## Visual and interaction contract

Use the reference board's strong typography, intentional spacing, substantial visual sections, clear actions and detailed product presentation. The palette remains predominantly white/mist with ink text, purple actions and selective teal technical accents. Avoid turning every paragraph into the same card. Give company pages an editorial composition and project detail pages readable prose, diagrams and evidence callouts.

| Property | Selected value / behavior |
| --- | --- |
| Fonts | `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`; system monospace only for technical labels; no remote font request |
| Body typography | Base 18px, 1.6 line height; compact UI 16px minimum; reading width 68ch |
| Heading scale | Responsive H1 40–76px and H2 30–48px, tight but non-overlapping leading; size never substitutes for semantic hierarchy |
| Containers | Shared standard max 1200px, wide visual max 1440px, prose 68ch; page gutters clamp from 20px to 48px |
| Spacing | 4px base; shared steps 4/8/12/16/24/32/48/64/96/128px; section spacing 64px mobile and 96px desktop |
| Geometry | 12px controls/cards and 20px large visual panels; consistent thin decorative dividers and stronger control borders |
| Breakpoints | Shared 48rem and 72rem starting values; adjust within IU-FRAME if actual Polish content does not fit, record once and update every consumer |
| Controls | Aim for at least 44×44 CSS px for standalone controls; text links remain clearly spaced; focus ring 2px with 3px offset using the supplied normal/inverse tokens |
| Contrast | Project target WCAG 2.2 AA: 4.5:1 normal text, 3:1 large text and applicable non-text controls/focus; verify actual state/background combinations |
| Layering | Content 0, sticky header 20, open navigation 30, dialog if needed 40; decoration cannot intercept events |
| Motion | Subtle transition up to 180ms; no autoplay video, looping decorative motion or parallax; reduced-motion removes nonessential transitions |

Keep widths stable across scrollbar changes. Wrap long Polish labels and URLs; intentional data-table scrolling stays in a labeled focusable container. Reserve media dimensions. Offset anchors for the sticky header. A technical contents/sidebar panel becomes normal flow on narrow or short viewports; do not trap reading in a tiny internal scroll area.

Prefer a mobile disclosure navigation over a modal drawer: button with expanded state, same logical link order, Escape close/focus recovery, touch access, and resize reconciliation. The menu must remain within short viewports, with safe areas respected if fixed positioning is used. No hover-only actions. Single-destination cards have one coherent link, without nested conflicting links.

Provide a skip link, one meaningful H1, semantic landmarks/headings, visible labels, keyboard focus, current-page states, informative diagram alternatives and captions. Expose status/error messages accessibly. Automation complements manual keyboard/rendered checks; it is not a conformance certificate.

## Enquiry contract ENQ-1.0

The browser sends JSON to same-origin `POST /api/enquiries`. A pure validated request contract and receiver port separate presentation from delivery. Live provider selection happens in the server composition root only.

| Field | Contract |
| --- | --- |
| `intent` | Required enum: investment, partnership, demo, general |
| `email` | Required, trimmed, valid email syntax, maximum 254 characters; reject CR/LF |
| `message` | Required, trimmed, 20–5000 Unicode code points |
| `project` | Optional enum artisense/aifield; absence means unspecified |
| `name`, `organization` | Optional plain text, max 100 / 150 code points; no markup interpretation |
| `locale` | Required en/pl |
| `submissionId` | Required random UUID, one per new submission; same ID for an unchanged uncertain retry |
| `website` | Empty honeypot field, hidden from visual and assistive reading; filled value is rejected, never falsely acknowledged |

The endpoint accepts only JSON POST, limits actual streamed bytes to 32 KiB, validates the schema server-side, rejects unknown fields and inappropriate Origin, and uses no public CORS grant. Requests without Origin are rejected for this browser-only endpoint; integration tests supply it. Only a fixed server allowlist can select sender, recipient or provider endpoint. Do not trust arbitrary forwarded-host/IP headers.

Rate-limit to 5 attempts per minute per direct peer with a process-local bounded map in the selected single-process localhost topology; 429 includes Retry-After. Never claim that this protects a distributed/proxied public deployment. Its shared rate-limit topology is a live activation prerequisite. Apply a 10-second upstream abort budget and a 12-second browser wait limit; a timeout after dispatch is uncertain, never success.

| Outcome | HTTP / UI behavior |
| --- | --- |
| Accepted | 200 only after adapter confirmation and nonempty receipt ID; JSON includes `status`, `receiptId`, `mode`; inline localized confirmation identifies local test receipt or provider acceptance precisely |
| Rejected | 422 with allowlisted field errors; 400 malformed request, 413 too large, 415 wrong media, 405 wrong method; preserve editable input |
| Pending duplicate | 409 `pending`; keep the same ID and unchanged payload for a later user-initiated retry |
| Conflicting duplicate | 409 `conflict` for reused ID with different payload; do not resend automatically |
| Unavailable | 503 `unavailable` when disabled/unconfigured, before dispatch, or known safe service refusal; explain email alternative |
| Uncertain | 504 `uncertain` when acceptance cannot be established after dispatch; keep input, ID, and original payload; bounded manual retry within the idempotency window |
| Throttled | 429 with useful delay; prevent repeated clicks and retain input |

Browser states: idle, validating, submitting, accepted, rejected, unavailable, uncertain. Only one submission is in flight. The page owns form values in memory; no local/session storage, cookies or URLs contain form content. Ignore late results after the owner ends or a newer operation replaces it. Keep the public email link visible in every state, using the input candidate `info@artifactory.tech`; record its unverified operator before launch. A no-JavaScript notice exposes this alternative.

### Receiver implementations

`fixture`: owned by the local executor, synthetic data only, process-local receipt map, no external network. An atomic check/reserve operation coalesces concurrent matching IDs; the same payload returns the same receipt, changed payload conflicts. Expire entries after 24 hours with bounded cleanup; all clear on restart. A test-only inspection API in the test process, not a public HTTP route, proves receipt. EN confirmation: “Test enquiry received locally. No email was sent.” Translate faithfully into Polish. Fault injection stays in test composition, never query parameters accepted from public visitors.

`disabled`: returns unavailable without sending or storing anything. Use it for invalid or missing live configuration; never substitute a successful fixture silently.

`resend`: server-only HTTP `POST https://api.resend.com/emails` using server-held Bearer key, configured verified `from`, fixed recipient `to`, sanitized enum-based subject, plain-text body and validated `reply_to`. Forward `Idempotency-Key: enquiry/<submissionId>`. Accept only a successful response with the documented ID; malformed success is uncertain. Preserve the same provider request bytes on retry. The provider's documented idempotency window is 24 hours; offer retries only within 23 hours of initial attempt, then show email assistance without automatic resend. Abort/network/ambiguous upstream errors are uncertain; explicit validation/auth refusals are safe failures. Do not expose upstream bodies or keys to the browser. Provider acceptance means queued by the delivery provider; mailbox receipt/notification is a separate unverified event. See the pinned technical references in source-lock.json.

Use `fixture` only on loopback and only in preview/test mode; fail startup for fixture plus public host or published mode. `resend` cannot activate until the external-send and data prerequisites in [decisions.md](decisions.md) are supplied. Implement and test its mapping with controlled transports during the experiment; do not send real email. No auto-reply, webhook, queue, CRM, upload, or database is selected.

## Visibility, privacy and delivery

Use separate preview and published build profiles. Preview is loopback-only, `noindex, nofollow`, and excluded from discoverable XML output; it may show all 34 draft routes for evaluation. `robots.txt` disallows preview crawling, but actual protection is loopback binding and absence of public deployment. All preparation inputs, guidelines, compiled records and test fixtures stay outside served assets.

For an eligible published record, generate localized title/description, self-canonical, reciprocal en/pl alternatives, English x-default, and coherent Open Graph metadata using its configured public origin. Generate sitemap entries from published records only, excluding redirects, API/error/utility states and drafts. Produce one content-derived share fallback with explicit dimensions and a versioned asset URL. Escape metadata and allowlist local/HTTPS asset links.

Set actual local response headers: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, frame protection through CSP, and a CSP allowing only the required self-hosted scripts/styles/images and form connections. Prefer bundled scripts; any generated inline style allowance must be specific and verified. Disable camera/microphone/geolocation through Permissions-Policy. No HSTS on plain HTTP localhost. Public HTTPS/proxy policy is documented for later verification.

Preview HTML and all enquiry responses are `no-store`. Published HTML revalidates; content-hashed public assets may use long immutable caching. Do not cache personal payloads. Build-time approval/provenance records cannot appear in page JSON, source maps, public manifests or assets. Keep browser and server configurations separate.

Local Privacy explains synthetic receipt behavior, in-memory retention/restart cleanup, lack of external sending/tracking, and that an email link opens the visitor's own client. Do not invent a legal controller, live provider retention promise, privacy certification, or finalized production notice. Record missing live policy as a launch prerequisite.

## Quality and completion

The full [verification contract](verification.md) is mandatory. Performance budgets for a built local server: at most 60 KiB gzip of first-party JS and 100 KiB gzip CSS per route, at most 1 MiB initial transferred page resources, and at most 350 KiB for one hero raster if used. No font network request. On three cold mobile Lighthouse runs of EN Home and the longest PL technical page, median performance score at least 90, LCP at most 2.5 seconds and CLS at most 0.1 under the recorded default simulated mobile profile. Report lab measurements as lab measurements, with tool/runtime conditions; do not claim field performance.

Complete every selected local page and all required unit/check outputs. Confirm the form's local synthetic receiver, bilingual journeys, meaningful technical copy, accessibility states, route/link integrity, build reproducibility and module boundaries. Finish with a runnable artifact, screenshots/evidence and runbook. External delivery, owner review and production publication remain separately reported as not checked / not performed until their real prerequisites and evidence exist.
