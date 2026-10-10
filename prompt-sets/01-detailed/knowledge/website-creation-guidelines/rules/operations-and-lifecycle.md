# Operations and lifecycle

Part of the [baseline rule set](README.md#baseline-rules). Apply each rule to the selected scope and record outcomes in the [acceptance report](../templates/acceptance-report.md); record justified exceptions in the [decision register](../templates/decision-register.md).

## Observability and measurement

<a id="obs-01"></a>

- **OBS-01** — Define business outcomes separately from proxies: a click, form start, accepted submission and qualified lead are distinct.

<a id="obs-02"></a>

- **OBS-02** — Give events clear semantics and stable content/action identities rather than relying only on changeable labels.

<a id="obs-03"></a>

- **OBS-03** — Avoid unnecessary event loss during navigation and duplicate emission from overlapping interaction handlers.

<a id="obs-04"></a>

- **OBS-04** — Document consent, blocking, cross-device and implementation gaps in measurement. Operational totals need not equal tracked-session totals.

<a id="obs-05"></a>

- **OBS-05** — Health information distinguishes serving availability from failing publication or critical background work.

<a id="obs-06"></a>

- **OBS-06** — Identify deployed code/content versions and retain suitable release receipts.

<a id="obs-07"></a>

- **OBS-07** — Important jobs expose their last result or another verifiable execution record; a configured schedule is not proof of execution.

<a id="obs-08"></a>

- **OBS-08** — Alerts describe actionable failures, with an owner and response path appropriate to the project.

<a id="obs-09"></a>

- **OBS-09** — Separate synthetic checks from audience measurement and avoid adding personal data to telemetry for convenience.

<a id="obs-10"></a>

- **OBS-10** — Verify collection and dashboards against known events before treating reports as reliable.

## Publishing, recovery and maintenance

<a id="rel-01"></a>

- **REL-01** — Distinguish draft, preview and released states. Follow the project's publication authority and existing authorisation.

<a id="rel-02"></a>

- **REL-02** — Publish the intended code, content, configuration and assets together; unrelated work must not enter a release accidentally.

<a id="rel-03"></a>

- **REL-03** — If approval is required, bind it to the revision being published and invalidate it when relevant content changes.

<a id="rel-04"></a>

- **REL-04** — Validate a coherent release before activation. Failed preparation must not replace a working release with partial output.

<a id="rel-05"></a>

- **REL-05** — Verify the public destination after deployment; build success, queue acceptance and backend health do not independently prove rollout completion.

<a id="rel-06"></a>

- **REL-06** — Define rollback for code/content and recovery for persistent data. Identify compatibility constraints before migrations.

<a id="rel-07"></a>

- **REL-07** — Preserve unrelated domain dependencies, including email, during routing changes.

<a id="rel-08"></a>

- **REL-08** — Define behaviour for dependency outages and interrupted operations, with bounded waits and useful recovery paths.

<a id="rel-09"></a>

- **REL-09** — Back up necessary persistent state and verify restoration according to the project's recovery targets.

<a id="rel-10"></a>

- **REL-10** — Urgent content removal requires confirming absence at the public destination; retaining the last good release may retain the removed content.

<a id="rel-11"></a>

- **REL-11** — Document ownership, editing, configuration, deployment, recovery, recurring work and known limitations.

<a id="rel-12"></a>

- **REL-12** — Keep repeated structures reusable and verify that additions of supported content do not require unrelated code edits.
