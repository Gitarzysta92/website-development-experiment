# Artifactory website experiment: first-delivery evaluation

Evaluated on 10 October 2026. Pair: `2026-10-09-pair-01`. Frozen protocol: 1.0. One run per condition, one AI reviewer, not blind. A is the detailed package; B is inputs-only.

Follow-up, 10 October 2026: the separate [evaluation against all 219 guideline rules](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/guidelines/report.md) identifies additional layout, approval and release-path defects. The counts and scores in this earlier report retain their original assessment scope; its four-defect inventory is not the complete inventory after that audit.

**There is no defensible overall quality winner from this pair. Inputs-only produced the stronger visual presentation with substantially less construction time and token processing. The detailed package produced a more complete enquiry implementation and a faster, lighter website.** Both are usable local browsing previews; inputs-only does not implement the selected receiving-form capability.

The score intervals overlap. Two accessibility criteria remain unrated because actual screen-reader operation and native browser zoom were not tested. These are missing-evidence bounds, not statistical confidence intervals. No complete total is imputed.

| Observation | Detailed (A) | Inputs-only (B) |
| --- | --- | --- |
| Substantive EN/PL coverage | 17 purposes / 34 routes | 17 purposes / 34 routes |
| Observed local critical failures | 0 | 0 |
| Confirmed defects | 1 minor | 1 major, 2 minor |
| Visual judgment | Coherent, readable, repetitive | Stronger composition and project-specific illustrations |
| Local enquiry handling | Synthetic receiver with actual local receipts | Copyable email draft; no receiver |
| Real mailbox delivery | Unverified; external configuration required | Unverified; receiver implementation also required |
| First autonomous delivery | 70 min 57 s | 24 min 09 s |
| Reported total tokens | 22,097,213 | 3,233,358 |
| Median mobile lab LCP | 1.05 s | 2.10 s |
| Median transferred bytes | 52,494 | 181,424 |
| Incomplete quality interval / 100 | 78.4-85.9 | 79.4-86.9 |
| Confirmed human implementation interventions | 0 | 0 |
| Preparation effort and dollar cost | Unknown | Unknown |

## Consequential differences

**Inputs-only is visually stronger.** It differentiates sensing and photonic engineering with distinct illustrations and uses more varied compositions across Home, Investors, project overviews and technical pages. The detailed site is readable and consistent, but reuses similar chip drawings and article/sidebar compositions across different subjects. Both use the supplied palette and honestly label concept art. Neither receives a universal top visual rating: secondary labels are small in places, and B also repeats illustrations within project branches.

Evidence: [initial visual notes](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/visual-review-notes.md), [A homepage](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/browser/A-en-home-desktop.png), [B homepage](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/browser/B-en-home-desktop.png), [A investor page](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/browser/A-en-investors-desktop.png), [B investor page](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/browser/B-en-investors-desktop.png). Visual notes were recorded before reviewing resource totals.

**Detailed delivers substantially more enquiry functionality.** A submits synthetic data to `/api/enquiries`, receives an explicitly local receipt, and reuses the receipt for duplicate submissions. Independently rerun supplied tests inspect the receiver's stored request, expiry, concurrent duplicate handling, and controlled provider behavior. Browser tests exercise real local receipts in Chromium and validation/entry in Chromium, Firefox and WebKit. Browser-injected failures verify rejected, unavailable, uncertain, timeout and duplicate-click UI behavior in both languages; these injections do not establish real provider fault behavior.

B validates fields and generates editable, copyable email text. Its email link contains only the public address. Visitors must copy the draft and send it through their email application. The local server rejects write requests, and the README accurately discloses the missing receiver. Missing live credentials are an external dependency for both implementations; **B also needs receiving code**, which is a shared-functionality gap. It receives partial credit for its useful and truthful draft flow, but no receipt credit.

Evidence: [adjudicated interaction results](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/interactions/adjudicated-results.json), [failure-state checks](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/final-checks/results.json), [A receiver tests](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/A/tests/enquiry.test.ts), [B delivery disclosure](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/B/README.md:38).

**Inputs-only costs less observed execution effort; detailed has a lighter runtime.** A took 2.94 times as long, reported 6.83 times the total tokens, 4.61 times the uncached input and 2.24 times the output. These ratios describe different measurements and are not interchangeable with dollar cost. At runtime, A's median LCP was approximately half B's, and B transferred 3.46 times as many bytes. Both still performed well in the fixed lab profile.

## Defects and readiness

| ID | Severity | Finding and reproduction | Primary scoring criterion |
| --- | --- | --- | --- |
| B-01 | Major | Fill either localized Contact form and prepare the enquiry. It produces only a draft; no receiving request occurs. Server write requests return 405. Shared objective OBJ-05 requires receiving and routing enquiries. | Enquiry functionality |
| B-02 | Minor | Load any page and inspect landmarks or run unfiltered axe. The preview strip is outside landmarks. Same underlying `region` best-practice issue occurs in all 68 page/viewport captures. | Semantics, currently unrated |
| B-03 | Minor | Inspect either Projects listing. The first card uses h3 immediately after page h1 without an intervening h2. Same `heading-order` best-practice issue appears in four locale/viewport captures. | Semantics, currently unrated |
| A-01 | Minor | Follow the documented install/check/test/build sequence in a clean copy without ignored `artifacts/`, then run `python3 scripts/check-built.py`. Line 42 raises FileNotFoundError while writing `artifacts/built-metadata.json`. | Engineering handover |

These are four underlying defects, not one defect per repeated finding. Axe labels B's two best-practice findings moderate; evaluator severity is minor because no task-blocking behavior was observed. They are not presented as an accessibility certification result. A-01 affects verification reproducibility; the site itself builds and starts successfully.

Source/log evidence: [B server](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/B/server.mjs:61), [B preview strip](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/B/src/render.mjs:38), [B project-card heading](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/B/src/render.mjs:83), [A failing writer](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/snapshots/A/scripts/check-built.py:42), [A verification log](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/setup/A-built-check.log). Scorecards retain affected routes, exact steps, expected/actual outcomes and evidence per defect.

Both pass the observed local website gates: startup, both languages and project branches, usable navigation/contact access, truthful receipt claims, no observed private-source exposure and no material invented claims found in the reviewed copy. B's draft is honestly labeled, so it does not fail the false-success gate. It does fail local enquiry readiness.

A is ready for synthetic local enquiry testing. Its in-memory fixture is not durable production storage and sends no email. Real receiver/mailbox delivery remains externally blocked. B is ready for local browsing and drafting; receiving functionality is incomplete in addition to external configuration. Both remain unready for publication pending factual, translation, asset, privacy, hosting and release decisions.

## Rubric and uncertainty

Each category has four equally weighted 0-4 criteria. The recorded reasons and evidence are in [scorecard A](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/scorecard-A.json) and [scorecard B](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/scorecard-B.json). Detail is retained for auditability; decimal arithmetic does not imply equally precise reviewer judgment.

| Category | Weight | A weighted points | B weighted points |
| --- | ---: | ---: | ---: |
| Visual design | 25 | 17.19 | 21.88 |
| Visitor tasks and enquiries | 20 | 17.50 | 13.75 |
| Content and bilingual coverage | 20 | 17.50 | 17.50 |
| Accessibility and responsive behavior | 15 | 7.50-15.00 | 7.50-15.00 |
| Engineering and handover | 10 | 8.75 | 9.38 |
| Performance | 5 | 5.00 | 4.38 |
| Metadata and discovery | 5 | 5.00 | 5.00 |
| **Incomplete total** | **100** | **78.44-85.94** | **79.38-86.88** |

Twenty-six of 28 criteria are rated. Reflow and keyboard operation have substantial observed evidence. Semantics includes actual screen-reader feedback, and adaptation includes native zoom; those two criteria stay unrated instead of receiving assumed middle scores. Partial automated/tree evidence and B's observed semantic defects remain visible in their records. The upper bounds conservatively allow all unresolved points; they do not predict that either site will earn them.

Across rated criteria B earns 0.94 more weighted points. Equal category weighting reverses that small ordering: incomplete intervals become A 83.04-90.18 and B 82.14-89.29. Neither comparison supports an overall winner or a robust five-point advantage. Reviewer agreement cannot be calculated because there is only one reviewer.

Content ratings recognize complete substantive branches and careful treatment of uncertain claims. A explains limitations at greater length; B is more concise. Word count itself earns no credit. Reviewed content in both languages preserves simulated design versus physical or clinical measurement, classical tooling versus neural research, human review versus autonomy, proposed collaborations versus established relationships, and historical project budgets versus current company investment. Neither is human-approved copy.

## Verification coverage

- **Routes and rendering:** 136 matched desktop/mobile captures, 34 routes per site. All return 200, with no page-level horizontal overflow or browser script exceptions. All 17 Polish purposes also pass 320 x 640 and 1280 x 720 viewport checks.
- **Journeys:** investor, technical partner and demo paths in EN/PL across Chromium, Firefox and WebKit; mobile keyboard menus and localized validation; all 17 page-pair language switches, refresh and Back/Forward in Chromium.
- **Interactions:** 170 original cases yield 166 passes after justified harness corrections and four inconclusive CSS-zoom proxies. A passing B draft test verifies drafting, not receipt. The missing receiving requirement is separately recorded as B-01.
- **Additional checks:** 26 checks pass, including internal links/fragments, metadata, legacy redirects, private-path rejection, no-JavaScript email fallback, focus/reduced motion and controlled A failure states.
- **Accessibility:** A has zero axe violations in 68 combinations. B has two underlying best-practice issues. Actual screen-reader use, native 200% zoom and real devices were not tested.
- **Build/source checks:** both install/build/start; A passes Astro/content checks and 15 supplied unit tests, B passes seven supplied structural tests. The evaluator uses independent browser harnesses rather than claiming every developer-reported browser/component/recovery test was rerun.

Thirty-seven original harness failures were superseded by targeted passing rechecks: A language links used absolute URLs after initialization; B's menu button changed its accessible name when opened; and some immediate form-prefill assertions raced client initialization. Corrected selectors and auto-waiting assertions resolved these without application changes. Raw failures remain preserved alongside the [adjudications](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/interactions/adjudicated-results.json).

Four B cases overflowed under CSS `zoom: 2`. This is retained as diagnostic evidence only because CSS zoom does not exercise the same media-query behavior as native browser zoom. It is not counted as a confirmed native-zoom defect. Native zoom remains unverified on A as well, despite passing the proxy there.

## Performance conditions

Lighthouse ran sequentially after construction and browser checks: Home, both project overviews, the longest validation page, and Contact, each in EN/PL with three repetitions and alternating A/B order. All 60 runs completed without errors. The common profile was 390 x 844 at DPR 1, simulated network RTT 150 ms and throughput 1,638.4 Kbps, CPU slowdown 4, and cold storage/cache reset per run. Full options and individual compressed reports are preserved.

| Lab measurement, 30 samples per site | A median (range) | B median (range) |
| --- | --- | --- |
| Lighthouse performance score | 100 (100-100) | 99 (95-100) |
| LCP | 1.052 s (1.051-1.204) | 2.101 s (1.651-2.551) |
| CLS | 0 (0-0) | 0 (0-0) |
| Total blocking time | 0 ms (0-0) | 0 ms (0-0) |
| Transferred bytes | 52,493.5 (47,587-61,714) | 181,424 (116,463-282,622) |

These are pooled lab medians and ranges, not field traffic or production-host measurements. Per-URL medians are retained in the [performance summary](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/performance/summary.json); configuration is in [conditions](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/performance/conditions.json).

## Execution and measurement limits

Both recordings show `gpt-6-astra`, `xhigh`. Boundaries are the first autonomous website task only; B's later language question and preview-start turn are excluded. Recorded duration milliseconds determine elapsed time.

| First-delivery measure | A | B |
| --- | ---: | ---: |
| Start, UTC on 9 October 2026 | 21:27:00.367 | 21:27:05.304 |
| End, UTC on 9 October 2026 | 22:37:57.883 | 21:51:14.010 |
| Delivery wall seconds | 4,257.477 | 1,448.697 |
| Completed-turn union, rounded seconds | 4,257 | 1,449 |
| Input tokens | 21,942,936 | 3,164,458 |
| Cached input, included above | 21,253,632 | 3,014,912 |
| Uncached input, derived subtraction | 689,304 | 149,546 |
| Cache-write input | 0 | 0 |
| Output tokens | 154,277 | 68,900 |
| Reasoning output, included above | 30,821 | 7,681 |
| Total input + output | 22,097,213 | 3,233,358 |
| Recorded wrapper tool calls | 140 | 28 |
| Wrapper calls with observed outputs | 139 | 28 |
| Observed tool-wait union, seconds | 229.24 | 23.12 |
| Interrupted baseline turns | 0 | 0 |
| Confirmed human implementation interventions | 0 | 0 |

A's tool calls comprise 139 exec wrappers and one web search; B has 28 exec wrappers. Nested operations are not separately certified, and the observed wait union is not CPU or model reasoning time. Neither baseline has missing token fields in recorded responses. Repeated/cached context processing dominates input totals; totals are not unique text volume. Requests or retries without usage may be absent. No dollar ratio is inferred.

The telemetry collector did not parse numeric Unix lifecycle timestamps, initially reporting zero turn-union duration. Evaluation normalized timestamps in measurement copies and used recorded `duration_ms` for delivery time; the original collector was not modified. Manifest dispatch timestamps postdate actual start, so queue delay remains unknown. Automatic user-role environment/time messages are not counted as human help. Preparation tokens, common/variant packaging effort, operator minutes, exact reasoning time and verified gateway dollars remain unavailable; total preparation-plus-execution cost cannot be calculated.

Evidence: [A first-delivery telemetry](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/telemetry-baseline/01-detailed.json), [B first-delivery telemetry](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/telemetry-baseline/02-inputs-only.json), [thread boundaries](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/thread-boundaries.json).

## Integrity, compliance and interpretation

The protocol was frozen after launch and before inspecting outcomes, not registered before the experiment began. Review labels were assigned, but setup/status tools exposed the condition and A's self-reported result. This is explicitly a nonblind assessment. Preferred independent reviewers, human Polish review and some manual accessibility checks were unavailable.

Evaluation used separate copies and made no authored website repairs. Final hashes confirm original authored files, copied authored files, protected run inputs, prepared source packages and frozen protocol files remain unchanged. Generated `dist/` files are excluded from authored-source comparison. Dependency caches, local runtime and ignored verification artifacts were excluded from snapshot manifests. The existing Node 24.21.0 runtime was used externally to run the copies. An evaluator cache/overlapping-install problem temporarily affected B's font dependencies; a clean reinstall and build succeeded without source changes. The [successful B build record](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/evidence/setup/B-build-confirmed.json) supersedes the earlier setup failure log. See [integrity verification](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/integrity-verification.json).

Instruction compliance is recorded separately in each scorecard. A supplies the 23-unit execution/acceptance records and prescribed adapter with controlled tests; this evaluation sampled those records and did not independently recertify every detailed rule or checkpoint. B fulfills the broad bilingual content/design/navigation scope but leaves the selected receiving form incomplete. Detailed-only documents, framework choices and adapter prescriptions do not directly increase the shared quality score.

This pair does not show that the detailed package's additional execution effort produced a broad website-quality advantage. It does show additional functional completion and runtime efficiency, while inputs-only achieved a stronger visual result much faster. A follow-up should preserve those as separate outcomes. The existing protocol proposes five fresh matched pairs with fixed stopping rules and the same evaluation inputs; add independent visual/Polish reviewers and complete native zoom/screen-reader checks before drawing a general conclusion. A proposed compact prompt with explicit receiving acceptance criteria would be a new experimental condition, not something this pair has already established.

Machine-readable results: [comparison](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/comparison.json). Reproducible consolidation: [consolidate.py](/Users/michal.lukasiewicz/Programming/website-development-experiment/evaluation/results/2026-10-09-pair-01/consolidate.py).
