# Verification discipline

Part of the [baseline rule set](README.md#baseline-rules). Apply each rule to the selected scope and record outcomes in the [acceptance report](../templates/acceptance-report.md); record justified exceptions in the [decision register](../templates/decision-register.md).

## Verification discipline

<a id="qa-01"></a>

- **QA-01** — Test the actual rendered experience as well as data/build correctness. Apply representative devices, inputs and failure states.

<a id="qa-02"></a>

- **QA-02** — Verify zero, one, many, long, missing and invalid values where they change behaviour.

<a id="qa-03"></a>

- **QA-03** — Record test conditions, version, evidence, failures and untested areas. Do not translate "not checked" into "pass".

<a id="qa-04"></a>

- **QA-04** — Scale verification to impact and risk. Do not add tests that merely duplicate trivial implementation details.

<a id="qa-05"></a>

- **QA-05** — Recheck changed behaviour and affected shared patterns; repeat broader checks when new changes or unresolved risks justify them.
