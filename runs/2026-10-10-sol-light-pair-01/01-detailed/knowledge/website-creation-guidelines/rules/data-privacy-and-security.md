# Data, privacy and security

Part of the [baseline rule set](README.md#baseline-rules). Apply each rule to the selected scope and record outcomes in the [acceptance report](../templates/acceptance-report.md); record justified exceptions in the [decision register](../templates/decision-register.md).

## Privacy and exposure boundaries

<a id="data-01"></a>

- **DATA-01** — Inventory collected data, purpose, destination, access, retention and deletion mechanism before enabling collection.

<a id="data-02"></a>

- **DATA-02** — Optional measurement follows the project's documented consent/privacy policy. Refusal must not disable unrelated website functionality.

<a id="data-03"></a>

- **DATA-03** — Where consent is used, define expiry, version changes, malformed-state handling and cross-tab updates.

<a id="data-04"></a>

- **DATA-04** — Withdrawal stops subsequent optional collection and clears applicable local identity. Late responses cannot reactivate withdrawn tracking.

<a id="data-05"></a>

- **DATA-05** — Use allowlisted analytics properties; exclude raw messages, email addresses and arbitrary search text by default.

<a id="data-06"></a>

- **DATA-06** — Decide deliberately whether URL parameters, fragments and referrers are collected; do not inherit them accidentally.

<a id="data-07"></a>

- **DATA-07** — Retention statements must match actual enforcement. Identify manual procedures as manual and provide evidence for automated jobs.

<a id="data-08"></a>

- **DATA-08** — Keep personal form contents out of ordinary diagnostic logs and analytics. Document any narrowly justified exception.

<a id="sec-01"></a>

- **SEC-01** — Keep privileged credentials out of public assets, source control and untrusted client execution.

<a id="sec-02"></a>

- **SEC-02** — Protect administrative operations separately from public endpoints and apply least privilege to service/agent accounts.

<a id="sec-03"></a>

- **SEC-03** — Accept only intended methods, payloads and operations on public endpoints; validate untrusted inputs at the relevant boundary.

<a id="sec-04"></a>

- **SEC-04** — Configure abuse controls, request limits and timeouts appropriate to exposed functions and the actual proxy topology.

<a id="sec-05"></a>

- **SEC-05** — Apply content sanitisation, output escaping and safe URL handling where untrusted content is rendered.

<a id="sec-06"></a>

- **SEC-06** — Protect private previews and their assets. Keep internal manifests and operational details out of public delivery.

<a id="sec-07"></a>

- **SEC-07** — Define security headers and transport policy appropriate to the deployment; verify effective responses rather than configuration alone.

<a id="sec-08"></a>

- **SEC-08** — Distinguish synthetic fixtures and test submissions from actual customer records, and define their cleanup.
