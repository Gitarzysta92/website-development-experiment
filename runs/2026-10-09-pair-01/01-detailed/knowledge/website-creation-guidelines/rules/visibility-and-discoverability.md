# Visibility and discoverability

Part of the [baseline rule set](README.md#baseline-rules). Apply each rule to the selected scope and record outcomes in the [acceptance report](../templates/acceptance-report.md); record justified exceptions in the [decision register](../templates/decision-register.md).

## Visibility, search and sharing

<a id="vis-01"></a>

- **VIS-01** — Explicitly classify content as public/indexable, public/unindexed or private. Noindex is not access control.

<a id="vis-02"></a>

- **VIS-02** — Public indexable pages have meaningful titles, descriptions, canonical URLs and crawlable primary content.

<a id="vis-03"></a>

- **VIS-03** — Canonical, social and sitemap URLs agree with the configured public domain; preview origins must not leak into production metadata.

<a id="vis-04"></a>

- **VIS-04** — Published discoverable pages join the sitemap automatically; drafts, private routes and internal files remain excluded.

<a id="vis-05"></a>

- **VIS-05** — Missing and deliberately retired content use appropriate responses. Route renames have an explicit redirect or retirement decision.

<a id="vis-06"></a>

- **VIS-06** — Filters, search states and tag combinations must not create accidental indexable duplicates.

<a id="vis-07"></a>

- **VIS-07** — Shareable pages receive coherent social metadata with an appropriate image or deliberate fallback, sourced from their content records.

<a id="vis-08"></a>

- **VIS-08** — Escape metadata and validate image/URL inputs. Social artwork changes need an effective cache-refresh strategy.

<a id="vis-09"></a>

- **VIS-09** — Validate local destinations and required assets during release preparation.

<a id="vis-10"></a>

- **VIS-10** — Treat crawler findings as evidence to triage; successful technical checks are not proof of rankings, audience growth or editorial quality.
