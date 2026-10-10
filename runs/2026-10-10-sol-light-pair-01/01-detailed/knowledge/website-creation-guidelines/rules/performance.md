# Performance and delivery efficiency

Part of the [baseline rule set](README.md#baseline-rules). Apply each rule to the selected scope and record outcomes in the [acceptance report](../templates/acceptance-report.md); record justified exceptions in the [decision register](../templates/decision-register.md).

## Performance and delivery

<a id="perf-01"></a>

- **PERF-01** — Define project-specific budgets and test conditions for important pages and journeys; do not assume a previous project's targets.

<a id="perf-02"></a>

- **PERF-02** — Primary content and ordinary browsing must not depend on unrelated analytics, monitoring or optional assistants.

<a id="perf-03"></a>

- **PERF-03** — Choose a deliberate font loading and fallback strategy and verify its visual behaviour, including failure.

<a id="perf-04"></a>

- **PERF-04** — Long-lived immutable assets use versioned or content-hashed URLs. Changed bytes require a new URL.

<a id="perf-05"></a>

- **PERF-05** — Keep private content out of public caches. Document cache policy and invalidation for public HTML, assets, APIs and personalised data.

<a id="perf-06"></a>

- **PERF-06** — Assign loading priority by visible need; do not lazy-load the main visible image indiscriminately or eagerly fetch every lower-page image.

<a id="perf-07"></a>

- **PERF-07** — Deliver suitably sized media with reserved layout space and appropriate responsive selection.

<a id="perf-08"></a>

- **PERF-08** — Avoid unnecessary script/style request chains and dependencies. Bundle, split, inline or defer only according to the chosen architecture and measured trade-offs.

<a id="perf-09"></a>

- **PERF-09** — Avoid repeated synchronous layout reads and writes in high-frequency handlers. Use event scheduling or observation appropriate to the problem.

<a id="perf-10"></a>

- **PERF-10** — Check cold and warm loads, transitions, representative slower conditions and failure fallbacks relevant to the project.

<a id="perf-11"></a>

- **PERF-11** — Report measured results and conditions separately from design intentions, configured limits and estimates.
