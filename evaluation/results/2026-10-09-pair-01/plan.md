# Artifactory website experiment evaluation plan

Protocol version 1.0, prepared on 9 October 2026 for `2026-10-09-pair-01`.

The question is whether the detailed implementation package produces a better Artifactory website, and whether any improvement justifies its additional preparation and execution effort. Evaluate the first autonomous delivery from each run, then compare quality, defects, time, tokens, and human effort. Keep later repairs as a separate result.

This is a pilot with one run per condition. The conditions differ in specification, prescribed engineering choices, workflow, and verification requirements as well as prompt length. Results describe these two packages on this task; they cannot isolate the effect of detailed prompting or establish a general winner.

## Evaluation boundary

The [run manifest](../runs/2026-10-09-pair-01/run-manifest.json) identifies both sessions; the [launch plan](../runs/2026-10-09-pair-01/launch-plan.json) records their instructions. Both requested `gpt-6-astra` with `xhigh` reasoning. Verify observed settings from the completed recordings.

Use three separate assessments:

| Assessment | Basis | Report |
| --- | --- | --- |
| Shared website quality | Shared business requirements, supplied content, palette, visual references, and equivalent visitor tasks | Seven category scores, critical failures, evidence, and unresolved checks |
| Instruction compliance | Each run's own entry prompt and supplied package | Met, partly met, missed, or blocked requirements; no cross-condition compliance percentage |
| Resource use | Observed execution plus attributable preparation and human effort | Separate measurements and missing-data labels; no combined cost-quality score |

The shared [brief](../prompt-sets/02-inputs-only/inputs/docs/project-brief.md), [sitemap](../prompt-sets/02-inputs-only/inputs/docs/sitemap.md), [decision register](../prompt-sets/02-inputs-only/inputs/docs/decision-register.md), [project context](../prompt-sets/02-inputs-only/inputs/content/project-context.md), [palette](../prompt-sets/02-inputs-only/inputs/design-system/palette.json), and [reference captures](../prompt-sets/02-inputs-only/inputs/references/mockup-references.md) define the common evaluation basis. Preserve confirmed versus proposed status. Their detailed-arm counterparts retain additional process instructions; the input packages are not byte-identical.

In particular, assess the 17 proposed page purposes in both languages, including meaningful project subpages. Record actual URLs and permit justified consolidation where subject coverage and navigation survive. Exact 34-route compliance, the prescribed provider adapter, 23 implementation units, and detailed execution records belong to the detailed arm's instruction assessment. Do not reward a framework choice, document count, line count, or compliance with instructions the other run never received.

## Preserve the first delivery

1. Finalize and hash this protocol and its blank scorecard before opening rendered results or reading outcome reports. Record the actual save timestamp and any prior exposure. This protocol is prepared after launch, not a registration made before the experiment began.
2. Let each run reach its first autonomous final delivery or explicit terminal blocker. The baseline includes its own repairs and checks before that point. A status update or temporary tool wait is not completion. Record the first human intervention separately; if it predates delivery, label the result assisted and preserve any recoverable earlier snapshot.
3. Copy each completed website, lockfile, local instructions, reports, and relevant configuration examples into a separate evaluation workspace. Exclude dependency caches and secrets; record necessary local configuration by name. Record source hashes, Git state when available, and final-message timestamps. Do not evaluate a directory while the implementation session is still writing it.
4. Take a final telemetry snapshot for the registered sessions and select the run interval explicitly. Preserve input manifests and protocol hashes with the evidence. Separate setup, website execution, evaluation, and subsequent repairs.
5. Run evaluation only on those copies. Use documented setup commands and supplied configuration. Record an installation or startup failure before any workaround. An evaluator code fix creates a repaired result and cannot change the baseline.

There is no retrospective time limit for the active pair. A still-running or externally interrupted run remains incomplete at the observation cutoff; do not turn that into a completed zero-score result. If future runs use a time or token cap, set it before launch and apply it equally.

## Review order and conditions

Give the two sites randomly assigned labels A and B, with the mapping kept outside the visual review packet. Record the random assignment and alternate presentation order across pages. Complete visual and visitor-task ratings before looking at source code, implementation reports, or telemetry. Record any reviewer who already knows the mapping; such a review is not fully blind.

Prefer two independent reviewers for visual quality and copy, including a Polish-proficient reviewer. Preserve their original scores and reasons. Discuss differences of two or more rating points, record any resolved score, and keep unresolved disagreement visible. With only one reviewer, label the result a single-reviewer assessment. An automated language assessment does not establish human translation approval.

Use the same machine, browser versions, viewport settings, test data, and network conditions. Run performance measurements sequentially after both construction sessions finish, so concurrent builds do not distort the comparison. Record OS, runtime, package manager, audit tool versions, throttling, and cache state in the evidence.

The evaluation viewports are desktop 1440 x 900, mobile 390 x 844, narrow mobile 320 x 640, and a short desktop viewport 1280 x 720, all in CSS pixels. Use the same device scale factor for paired screenshots. Check Chromium throughout, then Firefox and WebKit on the core journeys if available. Record unavailable engines as untested.

For each of the 17 page purposes in each language, capture a full-page screenshot and test navigation at desktop and mobile sizes. Review all unique templates at narrow and short sizes, plus 200 percent zoom and reduced motion. Include open menus, long Polish labels, evidence tables, and form errors. Disable motion only for the matched static captures; inspect actual motion separately.

## Shared quality rubric

These weights are evaluation choices for this pilot, not existing contractual acceptance targets. Each category contains four equally weighted criteria, listed in the blank [scorecard](scorecard-template.json).

| Category | Weight | What earns credit |
| --- | ---: | --- |
| Visual design | 25 | Deliberate composition and hierarchy; typography and spacing; coherent palette and components; useful, honest project visuals and restrained motion |
| Visitor tasks and form behavior | 20 | Investor and partner journeys; working navigation and direct links; useful enquiry context and validation; truthful delivery, failure, and retry behavior |
| Content and bilingual coverage | 20 | Company investment story; substantive coverage of both projects; claim accuracy and maturity limits; equivalent English and Polish copy and interface states |
| Responsive behavior and accessibility | 15 | Reflow and readability; keyboard and focus behavior; semantic names and structure; readable contrast, error feedback, zoom, and reduced motion |
| Engineering and handover | 10 | Reproducible setup; proportionate component/content structure; controlled private data and configuration; useful verification and accurate handover |
| Performance | 5 | Loading responsiveness; stable layout; efficient assets and transfers; consistent behavior under the fixed mobile profile |
| Metadata and discovery | 5 | Localized titles/descriptions; coherent canonical/language relationships; route inventory and recovery; intended preview visibility and source exclusion |

Rate each criterion from 0 to 4: **0** absent or unusable; **1** major defects; **2** usable with clear shortcomings; **3** strong with minor issues; **4** consistently polished and supported by the planned checks. State the observed reason and attach evidence. A 4 requires more than a homepage impression or a passing build.

For a complete rubric, `quality = sum(category_weight * mean(criterion_ratings) / 4)`, on a 0-100 scale. With multiple reviewers, retain their individual totals and report the mean plus range. Do not imply precision beyond the ratings.

Use `not_tested`, `blocked_external`, and `not_applicable` explicitly. An implemented requirement that is demonstrably missing earns 0; missing evaluator evidence earns no rating. Do not redistribute weights or fill unknowns with zero. Instead report an incomplete score interval: earned points from observed criteria through those points plus the maximum available from unresolved criteria. Use a single overall score only when all shared criteria can be rated.

## Critical failures and readiness

Record critical failures separately; a high visual score cannot cancel one. The first delivery is not acceptable as a local website if it cannot start through its documented setup, omits a required language or an entire project branch, makes core navigation/contact unusable, confirms receipt without acceptance, exposes private material, or materially invents business or scientific evidence. A broken primary path on keyboard or mobile is also critical. Cosmetic defects are not critical failures.

Maintain four independent readiness fields: local website, local enquiry handling, real receiver/mailbox delivery, and publication. Missing live credentials, an unassigned factual reviewer, or an unknown production host do not fail the local website by themselves. A clear unavailable state can be truthful but still leaves delivery unverified. Do not award delivery credit just for naming a blocker, and do not fail an otherwise working site solely because production services were not supplied.

## Checks and required evidence

| ID | Check | Evidence and expected observation |
| --- | --- | --- |
| E01 | Clean setup and build | Exact documented commands, environment, exit status, elapsed time, and logs. Serve the production build with its server boundary where applicable. Run supplied checks, then independently verify the result. |
| E02 | Scope and routes | Map every proposed page purpose and both languages to actual URLs or a justified consolidation. Check direct loads, refresh, incoming links, headings, substantive content, and recovery from an unknown route. Missing subject matter remains a gap. |
| E03 | Investor journey | From Home, find the company investment case, distinguish the two projects and their stages, inspect evidence, and reach a relevant enquiry. Record task success, wrong turns, and defects. |
| E04 | Partner and demo journeys | Enter on an ArtiSense technology page and an AIFIELD workflow/example page; locate context, limitations, collaboration/demo access, and contact. Equivalent navigation paths are acceptable. |
| E05 | Language and history | Switch each mapped page to its counterpart and back; test direct Polish entry, browser Back/Forward, visible labels, errors, metadata, and Polish diacritics. The selected language must remain coherent. |
| E06 | Contact states | Test blank/invalid fields, a synthetic valid enquiry, pending state, rejection, unavailable receiver, uncertain/timeout result, duplicate clicks, and retry where safely reproducible. Inspect retained input, editable context, email fallback, and privacy access. |
| E07 | Claim and asset audit | Check every numeric, clinical, commercial, partner, funding, and maturity claim against supplied context in both languages. Inspect concept labels and captions. Review all project pages, not only a sample of the homepage. |
| E08 | Visual comparison | Matched desktop/mobile captures for all mapped purposes; compare composition, hierarchy, typography, density, palette, diagrams, and states against the saved WorkOS/THREESIXTY references. Judge quality rather than pixel similarity. |
| E09 | Responsive and accessible use | Manual keyboard traversal, visible focus, menu closure, labels, headings, landmarks, meaningful image alternatives, form feedback, screen-reader spot checks, zoom/reflow, reduced motion, and contrast checks. Automated findings supplement manual evidence. |
| E10 | Performance | Use one pinned audit configuration on Home, each project overview, the longest evidence page, and Contact in both languages. Run three cold-load measurements per URL and site, alternating order; report median and range for loading, layout shift, blocking, and transferred bytes. |
| E11 | Metadata and visibility | Check all actual localized routes, language annotations, canonicals, sitemap membership, unknown-page responses, and preview visibility. Check the five proposed legacy entries and four ArtiSense fragments as a separate migration assessment. |
| E12 | Source and handover review | Inspect shared layout/content ownership, duplication, dead scaffolding, server/client boundaries, message logging/storage, configuration, dependencies, substantive tests, and setup instructions. Cross-check every claimed verification and listed blocker. |

Do not use Lighthouse scores alone as accessibility certification, translation approval, or evidence of complete functionality. Performance is a comparative lab measurement; preserve its conditions and do not present it as field traffic data.

For E06, use synthetic data and an existing local receiver or configurable stub. Verify acceptance at the receiver, not just a UI toast. Do not send test messages to real mailboxes. If the application offers no safe way to exercise a state, record it as untested or externally blocked and assess the observed fallback. Adding a receiver or adapter to make the test pass is a repair. A detailed-arm-specific adapter contract is checked separately from shared enquiry outcomes.

For E07, pay particular attention to simulated chip results versus fabricated-device measurements, proposed sensing versus validated glucose/clinical performance, classical AIFIELD tooling versus neural-field research, human-reviewed AI workflows versus full autonomy, and dated project budgets versus a current company fundraising ask. Missing approved photos or facts should lead to honest illustrations or qualified copy, not fabricated evidence. No publication-grade approval is inferred from this evaluation.

For E12, a small optional editing exercise can provide diagnostic evidence: on disposable copies, change one bilingual project fact, a navigation label, and one shared color token, then build. Record affected files and regressions. Do not count this as website-generation time, and do not allow that exercise to alter baseline scores after they are finalized.

Every defect needs an ID, severity, affected pages/locales, reproduction steps, expected versus actual behavior, and screenshot/log evidence. Count one underlying defect once and list its scope; report critical, major, and minor totals separately. Identify the primary scoring criterion affected so repeated symptoms do not silently multiply penalties.

## Time tokens cost and human effort

Use the collector's actual [field definitions](../telemetry/collect.py) and [measurement limitations](../telemetry/README.md). The run manifest and timestamped events supersede the telemetry README's older launch-status narrative.

| Measure | Definition and treatment |
| --- | --- |
| Delivery wall time | First website-entry task start to first final delivery or terminal blocker. Include waits; separately annotate known user/tool outages. Also report dispatch-to-start delay. |
| Active recorded intervals | Union of completed/interrupted turn intervals within the selected run boundary. It is not CPU or hidden-reasoning time. |
| Input/output tokens | Response-ID-deduplicated usage within the run boundary. Report input, cached input, cache-write input, output, reasoning output, and total with missing-field counts. Cached/reasoning fields are subcategories; do not add them again. |
| Tool activity | Recorded calls and calls by tool name, completed outputs, and union of observed tool waits. Nested operations inside `functions.exec` are not independently certified by this collector. |
| Interruptions and help | Inspect candidate user messages and classify setup, automatic events, permission handling, clarification, correction, and recovery. Report confirmed human interventions and measured operator minutes separately. |
| Dollar cost | Use only matched, verified gateway accounting or billing evidence. Otherwise leave null. Gateway accounting must be labeled as such; do not treat it as an invoice or invent prices. |
| Preparation effort | Separate common input preparation, detailed-package compilation, and variant-specific packaging. Include attributable model use and human time where observed; otherwise mark unknown. |
| Repair effort | After baseline capture, report corrective turns, time, tokens, operator effort, defects fixed, and new defects as a separate round. |

The current collector leaves exact reasoning duration and gateway cost unavailable. Do not infer reasoning duration by subtracting tool waits from elapsed time. Failed requests without usage and backend retries may be absent; report the coverage gap. A summed token field with missing response values is partial, not an exact complete total.

Show both execution-only and total preparation-plus-execution views. Common preparation can be listed once as shared overhead. If reuse is discussed, show explicit scenarios such as one, five, and ten websites using `common preparation + variant preparation + N * execution cost`; label this an illustrative extrapolation. Unknown preparation or dollar data prevents a complete cost comparison.

## Comparison and decision

The final report should contain a compact table with critical failures, readiness, seven category scores, total or score interval, reviewer agreement, wall time, token usage, confirmed interventions, preparation effort, and available cost. Follow it with the three most consequential differences and linked evidence.

Use these decision rules, chosen before rating:

1. If only one result passes the local critical gates, identify it as the more usable first delivery and list the failures in the other. Keep both quality profiles visible.
2. If both pass and their complete quality scores differ by at least 5 points, describe a provisional quality advantage for this pair. Five points is a practical pilot threshold, not statistical significance. If reviewer disagreement or unresolved checks can reverse that conclusion, call it inconclusive.
3. With a smaller difference, report comparable observed quality and compare resources directly. If quality and resource use favor different packages, state the tradeoff; do not manufacture an overall winner through an unagreed exchange rate.
4. If both fail, report which defects prevent acceptance and the effort needed to correct them. Do not declare a successful method from the less incomplete result.

Check whether the conclusion survives equal category weights and the individual reviewer scores. A conclusion that reverses is preference-sensitive. Report category details even when the weighted total favors one site. Do not calculate score-per-dollar ratios when dollar data is missing or present this single pair as statistically conclusive.

For a follow-up, start with five fresh matched pairs using the frozen input snapshots, evaluator version, and agreed stop rule. Alternate condition order and preserve every completed or failed run. Report paired quality/resource differences and their spread; choose further replication based on observed variation and the decision being made. This pilot does not establish a sufficient sample size for a general claim.

## Evaluation artifacts and next execution

The blank scorecard contains the criterion definitions, 17-purpose route map, check IDs, readiness fields, and empty evidence/measurement records. Copy it for each site and reviewer. The protocol lock records file hashes, input identities, preparation time, and prior exposure. Neither file contains an evaluation result.

When both first deliveries are available, the next action is to freeze their outputs, assign review labels, and run E01-E12. Keep screenshots, logs, defect records, and the comparison report under `evaluation/results/2026-10-09-pair-01/`, outside both implementation repositories. Do not send evaluation feedback into either active run. Any later change to this protocol needs a version, reason, timestamp, and consistent reassessment of both sites.
