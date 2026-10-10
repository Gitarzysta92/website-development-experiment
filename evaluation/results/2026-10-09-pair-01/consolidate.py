"""Consolidate preserved observations; never edit either implementation."""
import copy
import hashlib
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent
WORKSPACE = ROOT.parents[2]


def read(path):
    return json.loads((ROOT / path).read_text())


def write(path, value):
    (ROOT / path).write_text(json.dumps(value, indent=2, ensure_ascii=True) + "\n")


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


raw = read("evidence/interactions/results.json")
rechecks = {item["id"]: item for item in read("evidence/interactions/recheck-results.json")}
assert len(raw) == 170 and len(rechecks) == 37
assert all(item["status"] == "pass" for item in rechecks.values())
adjudicated = []
for item in raw:
    result = copy.deepcopy(item)
    result["original_status"] = item["status"]
    result["source"] = "evidence/interactions/results.json"
    if item["id"] in rechecks:
        assert item["status"] == "fail"
        result.update(rechecks[item["id"]])
        result.pop("error", None)
        result["recheck_source"] = "evidence/interactions/recheck-results.json"
        if "-language-" in item["id"]:
            reason = "Harness selected relative href although initialized application uses an absolute href. Stable hreflang locator passes."
        elif "mobile-menu-keyboard" in item["id"]:
            reason = "Harness located the button by its closed accessible name, which changes on opening. Stable data attribute locator passes."
        else:
            reason = "Immediate value assertion raced client initialization. Auto-waiting toHaveValue assertion passes."
        result["adjudication"] = reason
    elif item["id"].startswith("B-zoom-"):
        result["status"] = "not_tested"
        result["disposition"] = "inconclusive_proxy"
        result["adjudication"] = "CSS zoom overflow is diagnostic only: CSS zoom does not exercise native browser zoom/media-query behavior. Native 200% zoom remains untested on both sites."
    adjudicated.append(result)
assert Counter(x["status"] for x in adjudicated) == {"pass": 166, "not_tested": 4}
write("evidence/interactions/adjudicated-results.json", {
    "summary": {"cases": 170, "pass": 166, "inconclusive_css_zoom_proxies": 4,
                "harness_failures_superseded": 37, "confirmed_app_failures_in_this_harness": 0},
    "caveat": "A passing draft-generation check does not establish a receiving form. Missing receiver B-01 is assessed separately against the shared brief.",
    "cases": adjudicated,
})

control = read("control.json")
template = read("scorecard-template.json")
performance = read("evidence/performance/summary.json")
browser_index = read("evidence/browser/index.json")
final_checks = read("evidence/final-checks/results.json")
assert len(browser_index) == 136 and all(x["status"] == 200 and not x["overflow"] and not x["errors"] for x in browser_index)
assert len(final_checks) == 26 and all(x["status"] == "pass" for x in final_checks)

# Screen-reader use and native zoom remain unresolved. Do not fill those
# criterion ratings with an assumed 3 or turn the incomplete rubric into a total.
ratings = {
    "A": {"visual": [3, 3, 3, 2], "functionality": [3, 3, 4, 4],
          "content": [3, 4, 4, 3], "accessibility": [4, 4, None, None],
          "engineering": [4, 3, 4, 3], "performance": [4, 4, 4, 4], "metadata": [4, 4, 4, 4]},
    "B": {"visual": [4, 3, 4, 3], "functionality": [3, 3, 4, 1],
          "content": [3, 4, 4, 3], "accessibility": [4, 4, None, None],
          "engineering": [4, 3, 4, 4], "performance": [3, 4, 3, 4], "metadata": [4, 4, 4, 4]},
}
shared_notes = {
    "functionality.investor": "Home -> Investors -> project evidence -> investment enquiry works in EN/PL across Chromium, Firefox and WebKit. Useful company/evidence links; the reader still assembles the comparison across several pages. Receipt capability is scored only under enquiry.",
    "functionality.partner_demo": "Technical-entry partnership and AIFIELD demo paths work across all three engines and both locales; intent is editable and demo project is prefilled. Partnership handoff keeps the intent but the visitor must add the particular technical context; demo is an enquiry, not access to a product.",
    "functionality.navigation": "All 34 direct routes render; internal links/fragments, all 17 paired language switches, refresh, Back/Forward, legacy entries, 404 recovery, and mobile keyboard menus pass the observed checks.",
    "content.company": "Company-level investment is clearly distinguished from project proposals. The opportunity is framed cautiously and coherently, but the business narrative remains broad. Missing owner-supplied commercial facts are recorded as external dependencies, not invented or counted as defects.",
    "content.coverage": "Substantive coverage of all 17 purposes in both languages, including separate technology, applications, validation, workflow and neural-research discussions; no placeholder branches or unexplained consolidation.",
    "content.claims": "Reviewed project content preserves simulation/physical/clinical boundaries, classical tools/neural research, human review, proposed relationships and historical budgets. No material unsupported claim found in the reviewed EN/PL copy. Concept illustrations are labeled. This is a source-grounded draft assessment, not scientific or owner approval.",
    "content.bilingual": "Substantive EN/PL pages, localized navigation, metadata and form states are present and coherent under AI review. Technical copy can be dense; publication-quality Polish fluency and terminology await an independent human reviewer.",
    "accessibility.reflow": "All 34 routes at desktop/mobile and all 17 Polish purposes at narrow/short viewports have no horizontal page overflow or observed blocked content. Real devices remain outside this evaluation; native zoom is accounted for separately.",
    "accessibility.keyboard": "Keyboard menu opening/closure passes across three engines in both locales. Skip link, visible focus, form entry/validation and accessible-tree snapshots support keyboard use on the core paths; no blocking trap observed.",
    "accessibility.adaptation": "Contrast checks, localized perceivable errors and reduced-motion behavior pass observed tests. Native 200% browser zoom was not performed. CSS zoom is an inconclusive proxy and is not scored as a native-zoom defect. Criterion left unrated under the frozen missing-evidence rule.",
    "engineering.setup": "Dependency installation, production build and local serving succeed from the evaluation copy with the documented compatible runtime. Setup workarounds concern evaluator cache/sandbox conditions, not application source repairs.",
    "performance.stability": "All 30 cold mobile lab samples have CLS 0 and total blocking time 0. No loading shift observed in the matched captures; these are lab measurements, not field Core Web Vitals.",
    "performance.consistency": "Three measurements of each of five representative page purposes in both languages complete without errors and show tightly repeated per-URL results under the same pinned conditions.",
    "metadata.localized": "All 34 pages have distinct localized titles and nonempty descriptions; supplied structural tests and independent rendered checks agree.",
    "metadata.equivalence": "All 34 pages have matching canonicals and reciprocal en/pl/x-default annotations in the local configuration.",
    "metadata.inventory": "All mapped pages and internal fragments resolve; five legacy entries and four ArtiSense fragments work. Unknown routes return real localized 404s. Preview sitemap is intentionally empty.",
    "metadata.visibility": "Noindex metadata/headers, disallowing robots and empty sitemap match preview intent. Source/private paths tested return 404. This does not certify an untested future deployment.",
}
specific_notes = {
    "A": {
        "visual.composition": "Clear hierarchy, generous space and useful side navigation; company and technical pages rely heavily on the same article/sidebar composition, with limited variation for investor storytelling.",
        "visual.typography": "Readable headings and body copy across inspected viewports; dense explanatory prose and small supporting labels weaken scanability in places.",
        "visual.consistency": "Supplied palette and shared components are coherent across page types and interaction states; polished enough for local review, with repetitive compositions limiting refinement.",
        "visual.visuals": "Honest concept captions and useful workflow relationships, but closely related chip drawings recur across subjects and provide limited project-specific visual explanation.",
        "functionality.enquiry": "Actual local HTTP receiver accepts synthetic data and returns local receipt IDs; duplicate requests reuse the receipt. Supplied tests inspect receiver contents, expiry and idempotency. Browser-injected failures verify retained input, retries and duplicate-click handling. Live mailbox delivery is explicitly excluded from this local grade.",
        "accessibility.semantics": "No axe violations in 68 route/viewport combinations; form names, status semantics and accessibility trees inspected. No actual screen reader was operated, so this criterion remains unrated rather than assuming successful spoken feedback.",
        "engineering.structure": "Explicit content, presentation, domain and receiver ownership and shared components. The number of page wrappers and process layers adds maintenance surface; no credit is awarded merely for framework choice or document volume.",
        "engineering.boundaries": "Private/public projection and server-only receiver configuration are explicit. Synthetic messages use bounded process memory; tests cover validation, trust boundaries, expiry and duplicate behavior. Protected paths are not served. No live credential or publication activation was attempted.",
        "engineering.handover": "Extensive operation and blocker documentation plus 15 passing supplied unit tests and passing Astro/content checks. Documented clean-checkout metadata verification crashes when ignored artifacts/ is absent (A-01); the website itself installs, builds and runs.",
        "performance.loading": "Median LCP 1.052 s (1.051-1.204 s) over 30 mobile lab samples; all Lighthouse performance scores 100 under the saved profile.",
        "performance.resources": "Median transferred bytes 52,493.5 (47,587-61,714); lean local assets and small runtime cost across the representative pages.",
    },
    "B": {
        "visual.composition": "Distinct homepage, investor, overview and editorial compositions; stronger hierarchy and project differentiation across the matched captures and supplied reference direction.",
        "visual.typography": "Clear display/body hierarchy and good long-label wrapping; secondary labels and annotations are small in places.",
        "visual.consistency": "Palette, original identity, diagrams, cards, navigation and contact states form a coherent visual system across inspected purposes and viewports.",
        "visual.visuals": "Distinct sensing/field and workflow illustrations explain project identity more effectively. Concept labels remain honest; graphics repeat within branches and are not real research assets.",
        "functionality.enquiry": "Validation, draft generation, editing and public email fallback work, but no enquiry is submitted or received. The server rejects write requests; users copy text into their email app. This is a major missing shared capability (B-01), distinct from missing live credentials. Partial credit reflects usable preparation and truthful status.",
        "accessibility.semantics": "Labels and accessibility trees are usable in the inspected states. Axe finds preview content outside landmarks across all 68 combinations and a heading-level skip on Projects in both locales/viewports (two underlying best-practice defects). Actual screen-reader operation remains untested; criterion is unrated.",
        "engineering.structure": "Compact generation, shared render helpers, reusable technical content and one browser script suit the static site. Company copy embedded in a large render module makes content/presentation ownership less clear than a uniformly structured content layer.",
        "engineering.boundaries": "Only generated public files are served; tested private/source paths return 404. Draft values stay in page memory, mailto contains only the address, and the server rejects writes. The absent receiver is scored under enquiry, not penalized twice here.",
        "engineering.handover": "README accurately documents setup, local drafting limits, verification scope, publication prerequisites and the work still needed for receipt. Seven supplied structural tests pass. Draft-only behavior is not represented as delivery.",
        "performance.loading": "Median LCP 2.101 s (1.651-2.551 s); median Lighthouse performance score 99 (95-100). Responsive in the lab, with materially more loading delay than A on the same profile.",
        "performance.resources": "Median transferred bytes 181,424 (116,463-282,622), about 3.46 times A. Local fonts/visual assets remain modest in absolute terms but leave a clear efficiency opportunity.",
    },
}

def refs(label, category):
    common = {
        "visual": ["visual-review-notes.md", f"evidence/browser/{label}-en-home-desktop.png", f"evidence/browser/{label}-en-investors-desktop.png", f"evidence/browser/{label}-pl-home-mobile.png"],
        "functionality": ["evidence/interactions/adjudicated-results.json", "evidence/final-checks/results.json", f"snapshots/{label}/README.md"],
        "content": ["evidence/claim-audit-candidates.json", f"evidence/browser/{label}-en-investors-desktop.json", f"evidence/browser/{label}-pl-artisense-validation-desktop.json", "visual-review-notes.md"],
        "accessibility": ["evidence/browser/index.json", "evidence/interactions/adjudicated-results.json", "evidence/final-checks/results.json", f"evidence/final-checks/{label}-pl-contact-aria.txt"],
        "engineering": [f"snapshots/{label}/README.md", f"evidence/setup/{label}-unit.log", "evidence/final-checks/results.json"],
        "performance": ["evidence/performance/conditions.json", "evidence/performance/summary.json"],
        "metadata": ["evidence/final-checks/results.json", f"evidence/browser/{label}-en-home-desktop.json"],
    }
    return common[category]

def defect(id_, severity, criterion, routes, steps, expected, actual, evidence):
    return dict(id=id_, severity=severity, primary_criterion=criterion,
                affected_routes_locales=routes, steps=steps, expected=expected,
                actual=actual, evidence=evidence, baseline_or_repair="baseline")

defects = {
    "A": [defect("A-01", "minor", "engineering.handover", ["Clean-checkout verification; all locales"],
                 ["Use a clean source copy without ignored artifacts/.", "Run the README install/check/test/build sequence.", "Run python3 scripts/check-built.py."],
                 "Documented verification completes and creates its output directory when needed.",
                 "FileNotFoundError writing artifacts/built-metadata.json at scripts/check-built.py:42. The checks before that write and the website build/start succeed.",
                 ["evidence/setup/A-built-check.log", "snapshots/A/scripts/check-built.py"])],
    "B": [defect("B-01", "major", "functionality.enquiry", ["/en/contact/", "/pl/kontakt/"],
                 ["Open Contact and supply valid synthetic enquiry data.", "Choose Prepare email enquiry.", "Inspect network requests and server handling."],
                 "A receiving implementation accepts the enquiry and supplies truthful local receipt/failure states; live services may remain unconfigured.",
                 "Only a copyable draft is generated; no submission occurs and server write requests receive 405. Manual email is available but receiving functionality needs implementation, not just credentials.",
                 ["evidence/interactions/adjudicated-results.json", "snapshots/B/server.mjs", "snapshots/B/README.md", "evidence/browser/B-en-contact-desktop.json"]),
          defect("B-02", "minor", "accessibility.semantics", ["All 34 routes in both tested viewports"],
                 ["Load any page.", "Run unfiltered axe or inspect the landmark tree."],
                 "Meaningful preview notice is contained within an appropriate landmark.",
                 "The preview-strip div is outside landmarks; axe region best-practice finding repeats in 68 captures. Counted once.",
                 ["evidence/browser/B-en-home-desktop.json", "snapshots/B/src/render.mjs"]),
          defect("B-03", "minor", "accessibility.semantics", ["/en/projects/", "/pl/projekty/"],
                 ["Open the project listing.", "Inspect the heading sequence or run axe."],
                 "Project-card heading levels follow the surrounding page hierarchy.",
                 "First project card begins at h3 after page h1 without h2. Axe heading-order best-practice finding repeats in four locale/viewport captures. Counted once.",
                 ["evidence/browser/B-en-projects-desktop.json", "evidence/browser/B-pl-projects-mobile.json", "snapshots/B/src/render.mjs"])],
}

checks = {
    "E01": ("engineering", "Documented install/build/serve and supplied non-browser checks were independently rerun; no website source repairs. A verification helper has a clean-copy defect, separately reported."),
    "E02": ("content", "34 direct localized pages per site and all 17 purposes are present; no consolidation. Both project branches are substantive."),
    "E03": ("functionality", "Investor path and editable investment intent verified in EN/PL across three browser engines. Comprehension assessment is reviewer judgment, not a recruited-user study."),
    "E04": ("functionality", "Technical partnership and AIFIELD demo paths verified in EN/PL across three engines; receiving capability assessed separately."),
    "E05": ("functionality", "All 17 page pairs switched and exercised with refresh/history in Chromium. Cross-engine core journey checks pass after harness corrections."),
    "E06": ("functionality", "A: real local synthetic receipts and duplicate receipt IDs in Chromium; form entry/validation in three engines. Browser response injection tests rejection/unavailable/uncertain/timeout/duplicate UI behavior in EN/PL. Supplied receiver tests independently rerun. B: draft/validation/editing in three engines; no receiving implementation. No live mail sent."),
    "E07": ("content", "Source-grounded AI review of rendered EN/PL scientific/commercial claims and concept labels found no material fabrication. Not owner, scientific, legal or human translation approval."),
    "E08": ("visual", "136 matched full-page screenshots plus interaction-state captures; all 17 desktop purposes and representative full mobile pages reviewed with contact sheets and reference board."),
    "E09": ("accessibility", "Desktop/mobile captures, narrow/short Polish routes, keyboard, focus, reduced motion, axe and accessibility-tree inspection complete. No real screen-reader use, native browser zoom or physical-device testing. CSS zoom outcomes remain diagnostic only."),
    "E10": ("performance", "60 sequential Lighthouse samples: five purposes x two locales x three repetitions x two sites. Saved common mobile throttling and cold-cache conditions; no concurrent construction/build work during measurement."),
    "E11": ("metadata", "All 34 routes per site checked for localized metadata/canonicals/language annotations; links, sitemap/robots, 404s, five legacy redirects and four legacy fragments verified. No public deployment or social-crawler test."),
    "E12": ("engineering", "Inspected source ownership, configuration boundaries, draft/receiver data handling, tests and handover. Reran unit/structural suites and common independent browser checks; did not independently repeat every developer-reported component/recovery check or all detailed-package contracts."),
}

cards = {}
for site in control["sites"]:
    label, variant = site["label"], site["variant"]
    card = copy.deepcopy(template)
    telemetry = read(f"telemetry-baseline/{variant}.json")
    card.update(status="evaluated_with_unresolved_checks", review_label=label, variant=variant)
    card["reviewer"] = {"id": "codex-evaluator-01", "type": "single AI reviewer",
                        "polish_proficiency": "AI language assessment; no independent human Polish approval",
                        "blind_to_condition": False, "prior_exposure": control["review_type"]}
    card["snapshot"].update(path=site["snapshot"], content_manifest_sha256=digest(ROOT/site["manifest"]),
                            captured_at=control["captured_at"], entry_task_started_at=telemetry["baseline_start"],
                            first_delivery_at=telemetry["baseline_end"], terminal_status="completed",
                            assisted_before_delivery=False)
    card["environment"].update(os="macOS 26.6.2 (25G83), arm64", runtime="Build/serve Node 24.21.0; browser/performance harness Node 22.17.1",
        package_manager="npm 11.19.0 for setup", browsers=["Chromium 156.0.8078.4", "Playwright Firefox (version not recorded)", "Playwright WebKit (version not recorded)"],
        audit_tools=["Playwright 1.64.0", "axe 4.13.0", "Lighthouse version stored in individual raw reports"], device_scale_factor=1,
        network_profile="Simulated mobile: rttMs 150, throughputKbps 1638.4; full options in evidence/performance/conditions.json",
        cpu_profile="Lighthouse slowdown multiplier 4", cache_policy="Cold reset for each Lighthouse run; external requests blocked in interaction/capture harnesses")
    earned = unresolved = 0
    for cat in card["categories"]:
        for criterion, rating in zip(cat["criteria"], ratings[label][cat["id"]]):
            cid = criterion["id"]
            criterion.update(rating=rating, status="partial" if rating is None or rating in (1, 2, 3) else "pass",
                             observations=specific_notes[label].get(cid, shared_notes.get(cid)), evidence=refs(label, cat["id"]))
            assert criterion["observations"]
            if rating is None:
                criterion["unresolved_reason"] = "Required actual screen-reader/native zoom evidence missing; observed evidence retained without inventing a complete rating."
                unresolved += cat["weight"] / 4
            else:
                earned += cat["weight"] * rating / 16
        known = sum(c["rating"] or 0 for c in cat["criteria"])
        missing = sum(c["rating"] is None for c in cat["criteria"])
        cat["weighted_score"] = None if missing else cat["weight"] * known / 16
        cat["score_interval"] = [cat["weight"] * known / 16, cat["weight"] * (known + 4*missing) / 16]
    for gate in card["critical_gates"]:
        gate.update(status="pass", evidence=["evidence/final-checks/results.json", "evidence/interactions/adjudicated-results.json", "visual-review-notes.md"])
    card["critical_gates"][3]["observations"] = "A claims only explicitly local synthetic receipt; B claims only draft preparation. Missing receipt in B is a capability gap, not false success."
    for page in card["page_purposes"]:
        for locale in ["en", "pl"]:
            record = read(f"evidence/browser/{label}-{locale}-{page['page_id']}-desktop.json")
            page[f"actual_{locale}"] = urlparse(record["url"]).path
        page.update(subject_coverage="pass", evidence=[f"evidence/browser/{label}-{lang}-{page['page_id']}-desktop.json" for lang in ["en", "pl"]])
    for check in card["checks"]:
        category, observation = checks[check["id"]]
        status = "pass"
        if check["id"] in ["E07", "E09", "E12"] or (label == "A" and check["id"] in ["E01", "E06"]):
            status = "partial"
        if label == "B" and check["id"] == "E06":
            status = "fail"
        check.update(status=status, conditions="Frozen first-delivery copy; synthetic local data only; see harnesses and saved environment.", observations=observation, evidence=refs(label, category))
    card["readiness"] = {
        "local_website": {"status": "pass", "limitations": ["Draft local preview; observed critical gates pass. Full accessibility certification is not claimed."], "evidence": ["evidence/browser/index.json", "evidence/interactions/adjudicated-results.json"]},
        "local_enquiry_handling": {"status": "pass" if label == "A" else "fail", "limitations": ["Synthetic in-memory fixture receipt only; no email; restart removes data." if label == "A" else "Draft preparation only. Receiving implementation absent (B-01)."], "evidence": ["evidence/interactions/adjudicated-results.json", f"snapshots/{label}/README.md"]},
        "real_receiver_mailbox_delivery": {"status": "blocked_external" if label == "A" else "fail", "limitations": ["No approved live configuration, verified mailbox or delivery test."] + ([] if label == "A" else ["Also requires a server-side receiver implementation; not solely an external credential blocker."]), "evidence": [f"snapshots/{label}/README.md"]},
        "publication": {"status": "blocked_external", "limitations": ["Factual/translation/asset and privacy approvals, live delivery configuration, destination and release authorization unresolved."] + ([] if label == "A" else ["Receiving form implementation also incomplete."]), "evidence": [f"snapshots/{label}/README.md"]},
    }
    card["defects"] = defects[label]
    requirements = [
        {"requirement": "Bilingual substantive company and both project branches", "status": "met", "evidence": ["evidence/browser/index.json"]},
        {"requirement": "Preserve source package and keep preview local/unpublished", "status": "met", "evidence": ["control.json", "integrity-verification.json"]},
        {"requirement": "Receiving form plus public email and truthful outcomes", "status": "met locally; live blocked" if label == "A" else "partly met: draft/email only, receiver missed", "evidence": [f"snapshots/{label}/README.md", "evidence/interactions/adjudicated-results.json"]},
    ]
    if label == "A":
        requirements += [
            {"requirement": "Detailed 23-unit process, execution records and checkpoints", "status": "records present and locally complete per developer; independently sampled, not exhaustively recertified", "evidence": ["snapshots/A/docs/acceptance-report.md", "snapshots/A/docs/execution-record.md"]},
            {"requirement": "Specified provider adapter and receipt semantics", "status": "met in source and controlled supplied tests; live integration blocked", "evidence": ["snapshots/A/src/features/enquiry/server/receivers.ts", "snapshots/A/tests/enquiry.test.ts", "evidence/setup/A-unit.log"]},
            {"requirement": "Reproducible verification commands", "status": "partly met: metadata report writer assumes artifacts directory", "evidence": ["evidence/setup/A-built-check.log"]},
        ]
    card["instruction_compliance"].update(source_package=f"prompt-sets/{variant}", requirements=requirements, cross_condition_score=None)
    card["instruction_compliance"]["limitation"] = "Scoped assessment, not an exhaustive contract/rule audit. Detailed-only process and adapter requirements do not raise the shared website score."
    metrics = card["metrics"]
    for key in ["models_observed", "dispatch_to_start_seconds", "delivery_wall_seconds", "completed_or_interrupted_turn_union_seconds", "tool_wait_union_seconds", "tokens", "responses_missing_token_fields", "tool_calls", "tool_calls_by_name", "interrupted_turns", "operator_interventions_confirmed", "human_intervention_records", "pure_reasoning_seconds", "gateway_cost_usd"]:
        metrics[key] = telemetry[key]
    metrics["run_interval"] = {"start": telemetry["baseline_start"], "end": telemetry["baseline_end"], "selection_evidence": ["thread-boundaries.json", f"telemetry-baseline/{variant}.json"]}
    metrics["derived_uncached_input_tokens"] = telemetry["tokens"]["input_tokens"] - telemetry["tokens"]["cached_input_tokens"]
    metrics["cost_evidence_kind"] = "unavailable"
    metrics["performance_measurements"] = performance[label]["pages"]
    metrics["measurement_limitations"] = telemetry["limitations"] + telemetry["evaluation_measurement_notes"] + [
        "Common and variant-specific preparation tokens/operator time/dollars unavailable. Total preparation-plus-execution comparison remains incomplete.",
        "Recorded turn-union time has one-second precision; use recorded duration_ms for delivery wall time.",
        "No actual screen reader, native zoom, independent human Polish review, real device or live mailbox used. Provider failures injected at browser boundary do not establish live provider behavior.",
        "Browser engine versions for Firefox/WebKit were not saved. Playwright package version and installed engine family are known.",
    ]
    card["summary"].update(category_scores={c["id"]: c["weighted_score"] for c in card["categories"]}, quality_score=None,
        incomplete_score_interval=[earned, earned+unresolved], critical_failures=0,
        major_defects=sum(d["severity"] == "major" for d in defects[label]), minor_defects=sum(d["severity"] == "minor" for d in defects[label]),
        most_consequential_differences=(["Working synthetic receiver with retry/idempotency", "Faster and lighter measured runtime", "More repetitive visual treatment and much longer construction"] if label == "A" else ["Stronger visual composition and project illustrations", "Much shorter construction and lower recorded token processing", "Receiving form implementation missing"]))
    card["summary"]["equal_category_weight_interval"] = [sum(c["score_interval"][i]/c["weight"] for c in card["categories"])*100/7 for i in [0, 1]]
    card["summary"]["unrated_criteria"] = [c["id"] for category in card["categories"] for c in category["criteria"] if c["rating"] is None]
    write(f"scorecard-{label}.json", card)
    cards[label] = card

ratios = {
    "delivery_wall_A_over_B": cards["A"]["metrics"]["delivery_wall_seconds"] / cards["B"]["metrics"]["delivery_wall_seconds"],
    "total_tokens_A_over_B": cards["A"]["metrics"]["tokens"]["total_tokens"] / cards["B"]["metrics"]["tokens"]["total_tokens"],
    "uncached_input_A_over_B": cards["A"]["metrics"]["derived_uncached_input_tokens"] / cards["B"]["metrics"]["derived_uncached_input_tokens"],
    "output_tokens_A_over_B": cards["A"]["metrics"]["tokens"]["output_tokens"] / cards["B"]["metrics"]["tokens"]["output_tokens"],
    "median_LCP_B_over_A": performance["B"]["overall"]["lcp_ms"]["median"] / performance["A"]["overall"]["lcp_ms"]["median"],
    "median_transfer_B_over_A": performance["B"]["overall"]["transfer_bytes"]["median"] / performance["A"]["overall"]["transfer_bytes"]["median"],
}
write("comparison.json", {
    "protocol_version": "1.0", "run_group": "2026-10-09-pair-01", "mapping": {"A": "01-detailed", "B": "02-inputs-only"},
    "status": "evaluation_complete_with_disclosed_unresolved_checks", "reviewers": 1, "blind": False,
    "verdict": "No defensible overall quality winner; overlapping incomplete score intervals. Inputs-only is visually stronger and uses less observed construction time/token processing. Detailed provides a more complete enquiry flow and lighter measured runtime.",
    "score_basis": "26 of 28 criteria rated. Screen-reader semantics and native zoom/adaptation remain unrated under the frozen protocol. Intervals are missing-evidence bounds, not confidence intervals; no total score is imputed.",
    "summary": {k: v["summary"] for k,v in cards.items()}, "resource_ratios": ratios,
    "performance": {k: v["overall"] for k,v in performance.items()},
    "replication": "One run per condition; packages differ in workflow, engineering constraints and verification as well as instruction detail. No general causal claim.",
})

# Check original and snapshot authored files, protected inputs, and the frozen protocol.
integrity = {"checked_at": datetime.now(timezone.utc).isoformat(), "protocol": [], "prepared_sources": [], "run_inputs": {}, "websites": {}}
lock = read("protocol-lock.json")
for group, key in [("protocol_files", "protocol"), ("source_files", "prepared_sources")]:
    for entry in lock[group]:
        path = WORKSPACE / entry["path"]
        integrity[key].append({"path": entry["path"], "matches": path.exists() and digest(path) == entry["sha256"]})
manifest = json.loads((WORKSPACE / "runs/2026-10-09-pair-01/run-manifest.json").read_text())
for session in manifest["sessions"]:
    integrity["run_inputs"][session["variant"]] = [{"path": f["path"], "matches": digest(Path(session["repository"])/f["path"]) == f["sha256"]} for f in session["copied_files"]]
for site in control["sites"]:
    entries = [x for x in read(site["manifest"]) if not x["path"].startswith("dist/")]
    details = []
    for entry in entries:
        details.append({"path": entry["path"], "original_matches": digest(Path(site["source"])/entry["path"]) == entry["sha256"],
                        "snapshot_matches": digest(Path(site["snapshot"])/entry["path"]) == entry["sha256"]})
    integrity["websites"][site["label"]] = {"authored_files_checked": len(details), "changed": [x for x in details if not x["original_matches"] or not x["snapshot_matches"]], "generated_dist_excluded": True}
integrity["protocol_copies_match"] = all(digest(ROOT/Path(x["path"]).name) == x["sha256"] for x in lock["protocol_files"])
integrity["passed"] = all(x["matches"] for key in ["protocol", "prepared_sources"] for x in integrity[key]) and all(x["matches"] for v in integrity["run_inputs"].values() for x in v) and all(not v["changed"] for v in integrity["websites"].values()) and integrity["protocol_copies_match"]
write("integrity-verification.json", integrity)
assert integrity["passed"], "Unexpected source/protocol modification: inspect integrity-verification.json and stop."

def validate_evidence(value):
    if isinstance(value, dict):
        for key, child in value.items():
            if key in ["evidence", "selection_evidence"]:
                for reference in child:
                    assert (ROOT/reference).exists(), reference
            validate_evidence(child)
    elif isinstance(value, list):
        for child in value:
            validate_evidence(child)

for label, card in cards.items():
    validate_evidence(card)
    assert sum(cat["weight"] for cat in card["categories"]) == 100
    assert len(card["page_purposes"]) == 17
    assert len(card["summary"]["unrated_criteria"]) == 2
print(json.dumps({"integrity_passed": integrity["passed"], "score_intervals": {k:v["summary"]["incomplete_score_interval"] for k,v in cards.items()}, "equal_weight_intervals": {k:v["summary"]["equal_category_weight_interval"] for k,v in cards.items()}, "ratios": ratios}, indent=2))
