# Second evaluation pass: runtime boundaries and NFRs

10 October 2026. Same frozen first deliveries, pair `2026-10-09-pair-01`: A = detailed; B = inputs-only. This pass adds executed failure/recovery checks to the source review. All mutations and fault injection are confined to disposable copies.

**Two additional finding entries are confirmed: both sites can lose their active artifact during failed activation, and detailed's gateway crashes on malformed HTTP input.** These narrow earlier positive assessments. Detailed still has stronger enquiry implementation and testability evidence; that does not imply stronger behavior at every runtime boundary.

## New findings

### G-03: Both builders leave no active artifact when promotion fails

**Major availability defect; REL-04 changes from not checked to fail for both sites.** Both builders move `dist` to a backup path, then rename the prepared candidate into `dist`. Neither restores the backup if that second operation fails.

The evaluator injects `EACCES` only at candidate-to-`dist` rename, after a valid build. This deliberately tests a failure boundary; it is not an observed production incident or an estimate of its frequency. No authored application code is changed to produce the failure.

| Observation | Detailed (A) | Inputs-only (B) |
| --- | --- | --- |
| Build exit | 1 | 1 |
| Active `dist` after the fault | Absent | Absent |
| Prior artifact | Retained, identical hash | Retained, identical hash |
| Request to the already-running homepage | HTTP 500 | Connection fails; server exits 1 |
| Additional server failure detail | An imported generated server chunk is missing | The fallback read of `dist/en-404.html` raises an unhandled ENOENT |
| Stop, restore retained artifact, restart | HTTP 200, identical HTML/artifact | HTTP 200, identical HTML/artifact |

Ordinary invalid-source failures pass on both sites: the candidate is rejected, the active artifact stays byte-identical, and the running homepage remains HTTP 200 with identical content. The new defect is therefore specifically the activation step. Recovery should preserve a usable active selection or restore it when promotion fails; retaining a backup alone does not keep the running site available.

Source: [A two-step activation](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/A/scripts/runtime/build.mjs:15), [B two-step activation](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/B/build.mjs:117), [B unhandled fallback read](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/B/server.mjs:125), [REL-04](/Users/michal.lukasiewicz/Programming/website-creation-guidelines/rules/operations-and-lifecycle.md:63). Evidence: [runtime results](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/results.json), [fault-injection hook](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/fail-promotion.mjs), [probe harness](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/probes.mjs).

### GA-04: Detailed's gateway crashes on an invalid request target

**Major local availability defect; SEC-03 changes from pass to fail for A.** The earlier pass established the enquiry endpoint's validation but missed the gateway that executes first.

Send a local HTTP GET whose request target is `http://[` with the gateway's expected Host header. `new URL(req.url, config.origin)` throws `ERR_INVALID_URL` outside error handling. The gateway exits with code 1, the request resets, and the next ordinary homepage request is refused. This reproduction requires no application-source mutation or injected exception.

B contains URL parsing inside a try/catch. Under the same input it returns HTTP 400 and the next homepage request returns 200. B's existing SEC-03 pass therefore has additional negative-input evidence. These results concern the evaluated loopback previews; no internet-exposed deployment is asserted.

The gateway should reject malformed targets with a controlled client-error response while preserving service availability.

Source: [A unguarded parse](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/A/scripts/runtime/launch.mjs:16), [B guarded parse](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/B/server.mjs:69), [SEC-03](/Users/michal.lukasiewicz/Programming/website-creation-guidelines/rules/data-privacy-and-security.md:49). Evidence: [runtime results](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/results.json), [A crash log](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/A-server-1791621786336.log).

## Stronger positive evidence

- **Actual local enquiry boundary:** Four concurrent identical requests through A's gateway all receive the same local receipt ID. A changed payload under that ID returns 409 conflict; the next attempt returns 429 with retry guidance. This supplements the earlier injected-service tests and supports FORM-04 for the local synthetic receiver. It does not establish distributed or live-provider idempotency.
- **A's documented local recovery:** The supplied recovery exercise passes five checks: failed preparation while serving, visible content/caption changes, rejection of unapproved publication, source restoration with identical rendered HTML, and previous-artifact selection/start followed by final-artifact reselection. Only its hardcoded fetch port is adapted to reserved evaluation port 4601. REL-06 moves from not checked to pass for this local scope. Production data recovery remains unverified. Passing rejection of drafts does not resolve the previously reproduced GA-03 approved-content blocker.
- **Font-failure behavior:** B's web fonts are blocked on Home, Polish neural research and Polish Contact at widths 390 and 1280. All six comparisons preserve main text with no horizontal page overflow. Saved Home/Contact screenshots were inspected; no new visible fallback defect was found there. PERF-03 moves from not checked to pass for representative fallback behavior. Six equivalent A controls encounter no web-font requests and also preserve text and fit.
- **Warm reloads:** Twelve page/viewport cases preserve main content. Browser routing is enabled to inject font failures and disables normal caching, so the recorded resource sizes cannot establish warm-cache efficiency. PERF-10 remains not checked for the complete warm/slow/failure matrix.
- **Small concurrency smoke check:** Each site serves 24 simultaneous EN/PL homepage requests with HTTP 200. This is useful availability evidence for the tested local request burst, not a capacity measurement, stress test or production SLO result.

Evidence: [network/runtime observations](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/results.json), [A recovery results](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/A-recovery-results.json), [recovery adaptation record](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/recovery-adaptation.json), [browser results](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/browser-results.json), [B mobile Home fallback](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/B-font-fallback-390-en.png), [B desktop Polish Contact fallback](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/evidence/B-font-fallback-1280-kontakt.png).

## Changes to the rule matrix

| Rule | Site | Before | Now | Reason |
| --- | --- | --- | --- | --- |
| REL-04 | Both | Not checked | Fail | Injected promotion failure removes the active artifact. |
| SEC-03 | A | Pass | Fail | Malformed target crashes the actual gateway. |
| REL-06 | A | Not checked | Pass, local scope | The documented source/previous-artifact recovery exercise now passes independently. |
| PERF-03 | B | Not checked | Pass, representative scope | Blocked-font rendering has automated and inspected screenshot evidence. |

| Site | Pass | Fail | Not checked | Not applicable | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Detailed (A) | 135 | 10 | 20 | 54 | 219 |
| Inputs-only (B) | 100 | 17 | 40 | 62 | 219 |

Counts are coverage diagnostics, not weighted scores or independent defect totals. G-03 is a shared finding entry observed in two implementations. Earlier quality scores remain frozen; new evidence is recorded in this separate guideline audit.

The previous [matrix](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/before-rule-matrix.json) and [report](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/pass-02/before-report.md) are preserved. The [current matrix](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/rule-matrix.md) and [combined report](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/report.md) incorporate this pass.

## Scope and integrity

The runtime harness records 13 observations, the A recovery exercise five checks, and the browser harness twelve page/viewport comparisons. Node is 24.21.0; Chromium is 156.0.8078.4. Initial sandbox refusal to bind a port was an evaluation-environment limitation, not an application failure; the checks ran with authorized loopback access afterward.

No real approvals, email, publication or source repairs occurred. Original and frozen authored files remain unchanged: 173 A files and 14 B files verified in each location. Temporary servers used ports 4601/4602 and 4611 and were stopped by their owning harnesses. Existing user previews were not used. See the [integrity record](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/integrity.json).

Actual screen-reader operation, native browser zoom, real devices, broad collection extension, production throughput, public-proxy security, live receiver/provider behavior and production observability/recovery remain outside the established evidence. The new local checks do not certify those NFRs.
