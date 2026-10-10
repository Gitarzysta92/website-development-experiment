# Search and filtering: rules

Apply these rules when the [search and filtering capability](../../capabilities/search.md) is selected, alongside the relevant [baseline and technical rules](../README.md). The capability contract supplies its inputs, applicability and verification cases.

<a id="search-01"></a>

- **SEARCH-01** — Search includes the intended fields and handles the project's language/diacritic rules.

<a id="search-02"></a>

- **SEARCH-02** — Ranking is predictable and returns representative known queries correctly; aliases are curated rather than invented silently.

<a id="search-03"></a>

- **SEARCH-03** — Combined filters, result counts, empty results and clearing have explicit behaviour.

<a id="search-04"></a>

- **SEARCH-04** — Clearing restores a useful state and sensible focus. A directly linked result must not remain hidden behind an unrelated filter.

<a id="search-05"></a>

- **SEARCH-05** — Search remains understandable before enhancement or during service failure, using the fallback chosen for the architecture.

<a id="search-06"></a>

- **SEARCH-06** — Measurement excludes raw query text by default and records only approved categories or result buckets.
