# Structured content and CMS: rules

Apply these rules when the [structured content and cms capability](../../capabilities/cms.md) is selected, alongside the relevant [baseline and technical rules](../README.md). The capability contract supplies its inputs, applicability and verification cases.

<a id="cms-01"></a>

- **CMS-01** — Draft editing preserves the published version until the configured publication step.

<a id="cms-02"></a>

- **CMS-02** — Content export exposes only the authorised publication state; private fields and supporting records remain private.

<a id="cms-03"></a>

- **CMS-03** — Imports/seeding are repeatable and do not overwrite existing content or approve records implicitly.

<a id="cms-04"></a>

- **CMS-04** — Replacements of reviewed media and relevant metadata create a traceable change rather than silently changing a reviewed page.

<a id="cms-05"></a>

- **CMS-05** — Prevent content slugs from colliding with reserved application routes.

<a id="cms-06"></a>

- **CMS-06** — Record authorship/provenance accurately when that workflow is selected. Automated assistance and human review are separate facts.

<a id="cms-07"></a>

- **CMS-07** — Automated editorial checks distinguish pending, failed/unavailable and completed reports; advisory findings do not manufacture factual verification or approval.
