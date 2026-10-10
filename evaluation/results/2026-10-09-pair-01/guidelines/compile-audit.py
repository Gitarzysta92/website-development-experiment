"""Record a scoped, evidence-backed assessment of every authoritative rule."""
import hashlib
import json
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
RESULTS = ROOT.parent
WORKSPACE = RESULTS.parents[2]
LIBRARY = Path('/Users/michal.lukasiewicz/Programming/website-creation-guidelines')
DELIVERED = WORKSPACE / 'prompt-sets/01-detailed/knowledge/website-creation-guidelines'


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def save(name, data):
    (ROOT / name).write_text(json.dumps(data, indent=2, ensure_ascii=True) + '\n')


def expand(ids):
    result = []
    for item in ids.split():
        if '..' in item:
            first, last = item.split('..')
            family, number = first.rsplit('-', 1)
            result.extend(f'{family}-{i:02d}' for i in range(int(number), int(last)+1))
        else:
            result.append(item)
    return result


rules = {}
for file in sorted((LIBRARY / 'rules').rglob('*.md')):
    for line, text in enumerate(file.read_text().splitlines(), 1):
        match = re.match(r'- \*\*([A-Z][A-Z0-9]*-\d+)\*\*\s+\S+\s+(.*)', text)
        if match:
            id_, definition = match.groups()
            assert id_ not in rules
            rules[id_] = {'id': id_, 'family': id_.rsplit('-', 1)[0], 'definition': definition,
                          'source': str(file), 'line': line, 'assessment': {}}
assert len(rules) == 219

sources = []
for group in ['rules', 'guides']:
    for file in sorted((LIBRARY/group).rglob('*.md')):
        rel = file.relative_to(LIBRARY)
        sources.append({'path': str(file), 'sha256': sha(file), 'delivered_copy': str(DELIVERED/rel),
                        'same_as_delivered': file.read_bytes() == (DELIVERED/rel).read_bytes()})
save('source-manifest.json', {'captured_at': datetime.now(timezone.utc).isoformat(), 'files': sources,
    'numbered_rules': len(rules), 'all_identical_to_detailed_run_knowledge': all(x['same_as_delivered'] for x in sources)})

E = {
    'render': ['../evidence/browser/index.json', '../visual-review-notes.md'],
    'journeys': ['../evidence/interactions/adjudicated-results.json', '../evidence/final-checks/results.json'],
    'newbrowser': ['evidence/browser-probes.json'],
    'publication': ['evidence/source-probes.json', 'source-probes.mjs'],
    'content': ['../evidence/claim-audit-candidates.json', '../scorecard-A.json', '../scorecard-B.json'],
    'performance': ['../evidence/performance/conditions.json', '../evidence/performance/summary.json'],
    'Areadme': ['../snapshots/A/README.md'], 'Breadme': ['../snapshots/B/README.md'],
    'Adesign': ['../snapshots/A/src/styles/global.css', '../snapshots/A/src/styles/colors.css', '../snapshots/A/docs/presentation.md'],
    'Bdesign': ['../snapshots/B/public/styles.css', '../snapshots/B/src/render.mjs'],
    'Acontent': ['../snapshots/A/src/content/index.ts', '../snapshots/A/src/content/publication.mjs', '../snapshots/A/tests/content.test.ts', '../evidence/setup/A-unit.log'],
    'Bcontent': ['../snapshots/B/src/content.mjs', '../snapshots/B/src/render.mjs', '../snapshots/B/build.mjs', '../evidence/setup/B-unit.log'],
    'Anav': ['../snapshots/A/src/navigation/index.ts', '../snapshots/A/src/partials/site-header.ts', '../snapshots/A/docs/header.md'],
    'Bnav': ['../snapshots/B/src/content.mjs', '../snapshots/B/src/render.mjs', '../snapshots/B/public/client.js'],
    'Aform': ['../snapshots/A/src/features/enquiry/domain/index.ts', '../snapshots/A/src/features/enquiry/application/index.ts', '../snapshots/A/src/features/enquiry/server/index.ts', '../snapshots/A/src/features/enquiry/server/receivers.ts', '../snapshots/A/tests/enquiry.test.ts', '../snapshots/A/docs/enquiry.md', '../evidence/setup/A-unit.log'],
    'Bform': ['../snapshots/B/public/client.js', '../snapshots/B/server.mjs', '../snapshots/B/README.md'],
    'Aruntime': ['../snapshots/A/scripts/runtime/config.mjs', '../snapshots/A/scripts/runtime/launch.mjs', '../snapshots/A/scripts/runtime/build.mjs', '../snapshots/A/docs/runtime.md'],
    'Bruntime': ['../snapshots/B/build.mjs', '../snapshots/B/server.mjs', '../snapshots/B/README.md'],
    'Arecord': ['../snapshots/A/docs/acceptance-report.md', '../snapshots/A/docs/execution-record.md'],
    'inputs': [str(WORKSPACE/'prompt-sets/02-inputs-only/inputs/docs/project-brief.md'), str(WORKSPACE/'prompt-sets/02-inputs-only/inputs/docs/decision-register.md'), str(WORKSPACE/'prompt-sets/02-inputs-only/inputs/docs/sitemap.md')],
    'Aspec': [str(WORKSPACE/'runs/2026-10-09-pair-01/01-detailed/compiled/specification.md'), str(WORKSPACE/'runs/2026-10-09-pair-01/01-detailed/compiled/solution-structure.md')],
}


def set_rules(labels, ids, status, reason, evidence=(), findings=()):
    for id_ in expand(ids):
        assert id_ in rules, id_
        for label in labels:
            refs = [p for key in evidence for p in E.get(key, [key])]
            rules[id_]['assessment'][label] = {'status': status, 'reason': reason,
                'evidence': list(dict.fromkeys(refs)), 'findings': list(findings)}


# Conditions with no selected feature or no performed release are not failures.
set_rules('AB', 'CHAT-01..10 SEARCH-01..06 THEME-01..05 EXT-01..03', 'not applicable',
          'Assistant, search/filtering, theme preference, accounts, commerce and booking are outside the selected website scope.', ['inputs'])
set_rules('AB', 'DATA-02..06 OBS-02..04 OBS-07..08 OBS-10', 'not applicable',
          'No analytics/consent system, audience event pipeline, recurring jobs, alerts or dashboard is enabled. Synthetic verification is assessed separately.', ['Areadme','Breadme'])
set_rules('AB', 'A11Y-06 A11Y-08..10', 'not applicable',
          'No custom modal dialogs or continuing coordinated animations. B uses brief entry animations; reduced motion is tested separately.', ['Adesign','Bdesign'])
set_rules('AB', 'VIS-06', 'not applicable', 'No selected search/filter state or tag combinations.', ['inputs'])
set_rules('AB', 'OBS-06 REL-02 REL-05 REL-07 REL-09 REL-10', 'not applicable',
          'No production release, domain migration, persistent customer store or urgent public removal is performed. Future release verification is not certified.', ['Areadme','Breadme'])
set_rules('AB', 'CMS-07 COL-02 COL-05..06 COL-08 STR-10', 'not applicable',
          'No automated editorial approval workflow, previous/next sequence, image gallery, separately scoped project palette or module migration is selected.', ['inputs','Areadme','Breadme'])
set_rules('B', 'CMS-03 ARC-04 ARC-11 ARC-15..16 TECH-07', 'not applicable',
          'B implements a static preview and local draft preparation with no seed/import operation, protected actor operations, receiver adapter, backend job or shared request cache. Missing receiving functionality is a separate failure, not a reason to demand empty architecture layers.', ['Bform','Bruntime'])
set_rules('A', 'ARC-11', 'not applicable', 'No user accounts or administrative HTTP operations; local publication approval and endpoint trust checks are assessed under their implemented contracts.', ['Aruntime','Aform'])

# Content and visitor paths: use prior rendered evidence, not the implementation's own pass list.
set_rules('AB', 'PUR-01..07', 'pass',
          'Shared brief/sitemap identify investor-first purpose, page purposes, sources, editing rights and conflict ownership. Stable IDs, meaningful onward paths, qualified claims and labeled concept illustrations are present in reviewed EN/PL pages; unknown facts remain explicit.', ['inputs','content','render','journeys'])
set_rules('A', 'PUR-08', 'pass',
          'Shared company/contact data has an authoritative company export; footer/contact consume it. Page records own their prose. This confirms the inspected shared data path, not universal semantic deduplication of all prose.', ['Acontent'])
set_rules('B', 'PUR-08', 'fail',
          'The public mailbox is independently hardcoded in render.mjs footer/contact/privacy and client.js draft generation. A mailbox change needs several edits and can leave the draft destination inconsistent.', ['Bnav'], ['GB-07'])

set_rules('AB', 'LAY-01..02 LAY-04..05 LAY-09..10', 'pass',
          'Shared containers, bounded prose, responsive/wrapping rules and reserved inline media space are present. Existing matched captures and narrow-view checks show no horizontal page overflow or decorative interception in inspected paths.', ['render','journeys','Adesign','Bdesign'])
set_rules('A', 'LAY-03', 'pass', 'Root scrollbar-gutter:stable reserves the scrollbar space centrally; matched rendering is stable.', ['Adesign','render'])
set_rules('B', 'LAY-03', 'not checked', 'No explicit scrollbar-gutter reservation was found. Overlay-scrollbar captures do not prove behavior when a classic scrollbar appears; lack of a declaration alone is not recorded as a reproduced failure.', ['Bdesign'])
set_rules('AB', 'LAY-06..07 LAY-12', 'not checked', 'Offsets/responsive rules exist and ordinary journeys pass, but all sticky combinations, anchor occlusion and delayed/restored-state geometry were not independently verified against this full rule.', ['render','journeys','newbrowser'])
set_rules('A', 'LAY-08 COL-07', 'fail',
          'The Polish neural-research reading panel remains sticky at 1280x720 and ends at y=799.34. Its max-height:600px fallback misses this longer panel. It has no intentional internal scroll region.', ['newbrowser'], ['G-01'])
set_rules('B', 'LAY-08 COL-07', 'fail',
          'At 1280x480, technical panels end at y=573.47 and the Approach graphic at y=652.19. They remain sticky when they cannot fit and have no intentional internal scroll region.', ['newbrowser'], ['G-01'])
set_rules('AB', 'LAY-11', 'pass', 'Layer values are owned by the central stylesheet and scoped header rules; inspected header/menu/content ordering is coherent. This does not require every value to be a CSS variable.', ['Adesign','Bdesign','render'])
set_rules('A', 'DES-01', 'fail', 'Surface/text/action/focus tokens exist, but status and overlay semantics are not defined as tokens. Actual form errors/acceptance reuse raw purple/teal brand roles. This is a design-system contract gap, not a demonstrated contrast defect.', ['Adesign','../snapshots/A/src/features/enquiry/presentation/EnquiryForm.astro'], ['G-02'])
set_rules('B', 'DES-01', 'fail', 'Surface/text/action/focus tokens exist, but status and overlay semantics are not defined as tokens. Actual form errors use hardcoded color values. This is a design-system contract gap, not a demonstrated contrast defect.', ['Bdesign'], ['G-02'])
set_rules('A', 'DES-02..03', 'pass', 'The supplied specification and presentation owner define shared typography/spacing/width/motion values; common stylesheet and reusable controls consume them, with page-local presentation. Not a requirement for a specific framework.', ['Aspec','Adesign'])
set_rules('B', 'DES-02', 'not checked', 'Typography and common geometry live in one stylesheet, but no documented spacing/geometry/motion scale or exception audit establishes the full centralization contract.', ['Bdesign'])
set_rules('B', 'DES-03', 'pass', 'Render helpers and a shared stylesheet consistently own reusable presentation. Literal CSS values do not by themselves prove a violation.', ['Bdesign'])
set_rules('AB', 'DES-04', 'not checked', 'Observed default/focus/hover and form states are covered, but a complete component-by-state inventory (including all active/disabled/empty variants) was not independently verified.', ['journeys','render'])
set_rules('AB', 'DES-05 DES-08', 'pass', 'Consistent arrows/icons accompany accessible text. Essential content is rendered as document text, headings or labeled diagrams, and form errors contain textual explanation.', ['render','journeys'])
set_rules('AB', 'DES-06', 'not applicable', 'Separate project/product palette themes are not required by the chosen shared palette.', ['inputs'])
set_rules('A', 'DES-07', 'pass', 'Opt-in real component fixtures plus presentation documentation provide a reference tied to the actual UI. They are excluded from normal public output.', ['../snapshots/A/src/pages/checks-components/[locale].astro','../snapshots/A/docs/presentation.md'])
set_rules('B', 'DES-07', 'fail', 'No component/state reference is supplied beyond source and ordinary pages. README maps files but does not document the actual reusable control states.', ['Breadme','Bdesign'], ['GB-08'])

set_rules('AB', 'RWD-01..04 RWD-08 NAV-01..07 NAV-10 NAV-12', 'pass',
          'Native links/disclosures, wrapped/stacked layouts, logical document order, accessible state and keyboard closure are present. Prior multilingual cross-engine journeys pass. Targeted resize with settled media-query changes closes the menu on both sites.', ['journeys','newbrowser','Anav','Bnav'])
set_rules('AB', 'RWD-05..07 RWD-09', 'not checked',
          'Existing narrow/short and input checks are useful, but browser-chrome changes, safe-area geometry, all open-surface combinations, enlarged text/native zoom and supported physical-device input combinations remain incompletely verified.', ['journeys','newbrowser'])
set_rules('A', 'RWD-10', 'pass', 'Shared 48rem/72rem values and the Polish-fit reason for header collapse are documented; stylesheet/header use that contract.', ['Aspec','Adesign','../snapshots/A/docs/header.md'])
set_rules('B', 'RWD-10', 'not checked', 'CSS contains the common breakpoints and JS agrees on 960px, but a shared documented fit contract and all consumer agreement were not fully audited.', ['Bdesign','Bnav'])
set_rules('AB', 'NAV-08..09 COL-01..01 COL-03 REL-12', 'not checked',
          'Current fixed two-project/17-page collection works and project child navigation derives from registries. Complete zero/one/new-published-entry behavior across real listings was not independently exercised. Helper tests alone do not establish rendered collection extensibility.', ['Anav','Bnav','Acontent','Bcontent'])
set_rules('A', 'NAV-11', 'pass', 'Project cards have distinct overview/evidence targets without a conflicting whole-card link. The inspected project listing has no duplicate target within each card.', ['newbrowser'])
set_rules('B', 'NAV-11', 'fail', 'Each project card has three tabbable links (image, heading, Explore) pointing to exactly the same destination. Direct rendered probe confirms the redundant keyboard stops.', ['newbrowser','../snapshots/B/src/render.mjs'], ['GB-02'])
set_rules('A', 'A11Y-01', 'pass', 'Prior heading/landmark inspection and 68 unfiltered axe route/viewport audits have no reported structural violation. Scope is document structure, not real screen-reader certification.', ['render','../evidence/final-checks/A-en-contact-aria.txt'])
set_rules('B', 'A11Y-01', 'fail', 'Projects skips from h1 to h3 and the preview notice sits outside landmarks. These two underlying findings are independently recorded; repeating them across pages does not create new defects.', ['../evidence/browser/B-en-projects-desktop.json','../evidence/browser/B-en-home-desktop.json'], ['B-02','B-03'])
set_rules('AB', 'A11Y-02..04 A11Y-07 A11Y-11', 'pass', 'Core keyboard/focus paths, labels/expanded state, media alternatives, reduced motion and truthful audit limitations are supported by rendered evidence. Actual screen-reader use remains unverified.', ['journeys','render','Areadme','Breadme'])
set_rules('AB', 'A11Y-05', 'not checked', 'Contrast checks and control sizes have partial evidence, but full target-size/contrast coverage across every component state and supported input condition is not established.', ['render','journeys'])

set_rules('A', 'PERF-01', 'pass', 'Project-specific resource and mobile lab budgets/conditions are explicitly selected in specification/verification; they are not copied as universal rules.', ['Aspec',str(WORKSPACE/'runs/2026-10-09-pair-01/01-detailed/compiled/verification.md')])
set_rules('B', 'PERF-01', 'fail', 'No implementation-owned numeric performance budget and corresponding measurement profile is recorded. Good evaluator Lighthouse results do not retroactively create the missing contract.', ['Breadme','../snapshots/B/package.json'], ['GB-09'])
set_rules('AB', 'PERF-02 PERF-06..09 PERF-11', 'pass', 'Ordinary static browsing is independent of optional services; inline/local media avoids indiscriminate network loading, scripts are small, and inspected event handlers do not thrash layout. Saved measured performance includes explicit conditions and limitations.', ['performance','Adesign','Bdesign','Anav','Bnav'])
set_rules('A', 'PERF-03', 'pass', 'System font stack avoids external font dependency; fallbacks and language coverage are declared and captured.', ['Adesign','render'])
set_rules('B', 'PERF-03', 'not checked', 'Local fonts use swap and a fallback stack. An independent blocked-font visual test was not performed.', ['Bdesign'])
set_rules('A', 'PERF-04', 'pass', 'The runtime gives immutable caching only to the content-hashed Astro asset path; other responses use no-store.', ['Aruntime'])
set_rules('B', 'PERF-04', 'not applicable', 'The local server marks every response no-store; it does not promise long-lived immutable assets. Future static hosting cache policy is unverified.', ['Bruntime'])
set_rules('AB', 'PERF-05', 'pass', 'Local HTML/private-data responses use no-store and private-source paths are rejected. A limits immutable public caching to hashed assets; B stores no form payload.', ['Aruntime','Bruntime','newbrowser','journeys'])
set_rules('AB', 'PERF-10', 'not checked', 'Independent cold mobile samples are complete; a matched full warm-load/transition/dependency-fallback matrix is not. Developer-authored checks are not treated as independent reruns.', ['performance','Arecord','Breadme'])

set_rules('AB', 'VIS-01..05 VIS-07 VIS-09..10 LANG-01..05', 'pass',
          'Local preview classification, noindex, localized metadata, canonical/alternate relationships, empty preview sitemap, route/fragment migration and default/equivalent language behavior are verified. No production crawler/rendering or human translation approval is implied. Missing-translation behavior is evidenced by build/record constraints rather than a live absent locale.', ['journeys','render','Acontent','Bcontent'])
set_rules('AB', 'VIS-08', 'not checked', 'HTML metadata escaping is implemented. Full untrusted image/URL validation and effective post-publication social-artwork cache refresh were not exercised.', ['../snapshots/A/src/metadata/index.ts','Bcontent'])
set_rules('A', 'LANG-06 REL-03 CMS-04', 'fail',
          'JSON-record edits invalidate reviews, but the approval fingerprint excludes separately rendered diagram/template/media dependencies, including translated diagram text. A disposable diagram mutation leaves page eligibility and the direct publication gate unchanged.', ['publication','Acontent'], ['GA-02'])
set_rules('B', 'LANG-06 REL-03 CMS-04', 'fail',
          'Approval consists of unversioned global flags with no per-language/shared revision invalidation or reviewed-media revision binding. In a disposable fixture, changed copy remains indexable under the same flags.', ['publication','Bcontent'], ['GB-03'])

set_rules('AB', 'DATA-01 DATA-07..08 SEC-01 SEC-03 SEC-05..08 OBS-01 OBS-09 REL-01', 'pass',
          'Local data handling is documented and matches inspected behavior: synthetic bounded in-memory A receipt versus memory-only B draft; no payload analytics/logging or actual external send. Browser/server boundaries and effective headers are checked. Local preview/build/synthetic receipt are distinguished from release and business success. Future live policy remains unresolved.', ['Aform','Bform','newbrowser','journeys'])
set_rules('A', 'SEC-02 SEC-04', 'pass', 'No administrative HTTP operation is exposed. Server-only activation, method/origin/schema/byte checks, direct-loopback rate limits and bounded enquiry timeouts are implemented and covered by independently rerun supplied tests; not a distributed production claim.', ['Aform','Aruntime'])
set_rules('B', 'SEC-02', 'not applicable', 'No administrative service or agent account is configured; local builder access is the operating boundary.', ['Bruntime'])
set_rules('B', 'SEC-04', 'not applicable', 'Preview only serves static GET/HEAD and rejects writes. No submission function exists to protect; B-01 records that missing capability. Future receiving code will require its own controls.', ['Bform'])
set_rules('AB', 'OBS-05', 'not checked', 'Local console messages distinguish startup/build errors, but a complete health contract including publication failure is not independently certified.', ['Aruntime','Bruntime'])
set_rules('AB', 'REL-04 REL-06', 'not checked', 'Candidate-directory builds and local recovery instructions are present; B deletes the previous artifact after selection. Full failed-activation/crash/restore behavior was not independently rerun in this audit. No persistent production state or deployment exists.', ['Aruntime','Bruntime'])
set_rules('A', 'REL-08', 'pass', 'Controlled receiver failures, bounded waits, retry IDs, duplicate requests and input retention pass the saved tests. This covers local/injected failures, not a real provider outage.', ['Aform','journeys'])
set_rules('B', 'REL-08', 'not checked', 'Static/draft fallback is truthful, but the selected receiving capability has no outage/retry implementation; see B-01 rather than treating absence as resilience.', ['Bform'])
set_rules('AB', 'REL-11', 'pass', 'READMEs describe local editing/configuration/recovery and identify external operating/approval limits. Unknown production owners are disclosed. Specific command failures and approval defects are separately recorded; this row concerns presence and scope of handover.', ['Areadme','Breadme'])

set_rules('AB', 'QA-01 QA-04', 'pass', 'Supplied structural/unit and rendered suites address consequential behavior; saved evaluation adds matched pages, journeys and failure checks. No claim of universal conformance is made here.', ['render','journeys','Arecord','Breadme'])
set_rules('A', 'QA-02', 'fail', 'The actual approved-record state fails the build prerequisite because a test asserts every record is still draft with null reviews. The successful isolated gate test does not protect this real build boundary.', ['evidence/A-approved-content-check.log','publication'], ['GA-03'])
set_rules('B', 'QA-02', 'not checked', 'Current fixed content and invalid forms are tested; zero/one/new-record and invalid publication-input cases are not comprehensively verified.', ['Bcontent','Bform'])
set_rules('AB', 'QA-03', 'not checked', 'Both report important limits. A supplies detailed revision evidence and B a concise README; this audit did not validate every historical check-to-revision association. Neither author report is accepted wholesale as a guideline pass list.', ['Arecord','Breadme'])
set_rules('AB', 'QA-05', 'not checked', 'Historical repairs/checks are reported, but their full change-to-recheck sequence was not independently audited. Current evaluation evidence is separate.', ['Arecord','Breadme'])

set_rules('AB', 'ARC-01..02 ARC-06..08 ARC-10 ARC-14 STR-01..02 STR-04 STR-06..08 TECH-04..05 TECH-08..12 TECH-15', 'pass',
          'Inspected module maps, imports, build/server entrypoints, static page composition, owned local state and public output distinguish implemented responsibilities. A uses an enquiry feature/receiver composition; B uses compact content/render/preview modules. Different folder counts/frameworks are not compliance criteria. No real service/deployment is inferred from fixtures.', ['Aspec','Areadme','Breadme','Acontent','Bcontent','Aform','Bform','Aruntime','Bruntime'])
set_rules('A', 'ARC-03..05 ARC-09 ARC-12..13 ARC-15..16 STR-03 TECH-01..03 TECH-06..07 TECH-14', 'pass',
          'Pure enquiry/domain contracts, typed/validated content and route inputs, injected receiver port, server composition, mapped outcomes, request-local/fixture state and idempotent retry boundaries are present. Supplied boundary and meaningful unit tests were rerun previously; import review supports direction. Publication-specific defects are separately recorded.', ['Aform','Acontent','../snapshots/A/scripts/check-boundaries.mjs','../evidence/setup/A-check.log'])
set_rules('A', 'STR-05 STR-09', 'pass', 'Presentation styles remain co-located with Astro components while global tokens/layout are shared; docs identify page registration, edit APIs and receiver extension/verification owners. Separate service packages are not required.', ['Aspec','../snapshots/A/docs/content.md','../snapshots/A/docs/enquiry.md','../snapshots/A/docs/presentation.md'])
set_rules('B', 'ARC-03 ARC-12..13 TECH-01..03 TECH-06 TECH-14', 'not checked',
          'The implemented draft controller has a simple local contract and tests, but full selected-enquiry domain/orchestration/adapter contracts are absent. Avoid inventing an architecture failure for every missing layer; the functional gap is B-01. These broader guarantees are not certified.', ['Bform','Breadme'])
set_rules('B', 'ARC-05 ARC-09 STR-03 STR-05 STR-09', 'not checked',
          'The compact module structure is legitimate and current imports/exports are identifiable. Documented permitted-import/public-API rules, explicit route schema, co-location choices and complete extension procedures have insufficient evidence for a full pass.', ['Bcontent','Breadme'])
set_rules('A', 'TECH-13', 'fail', 'Documented verification fails without artifacts/ and the published build prerequisite rejects approved content. Both failures are reproduced in clean/disposable copies, independent of live credentials.', ['../evidence/setup/A-built-check.log','evidence/A-approved-content-check.log'], ['A-01','GA-03'])
set_rules('B', 'TECH-13', 'pass', 'Documented npm install/build/start and structural tests succeed under the compatible runtime; README identifies draft-only scope and external dependencies.', ['Breadme','../evidence/setup/B-build-confirmed.json','../evidence/setup/B-unit.log'])

set_rules('AB', 'CMS-01', 'not checked', 'Repository-managed draft/preview behavior is present, but no full approved production edit-preview-publish preservation cycle was completed; A has a confirmed valid-publication-path blocker.', ['Acontent','Bcontent','publication'])
set_rules('A', 'CMS-02..03 CMS-05..06', 'pass', 'Explicit public projection excludes private source/review fields; seed is exclusive and unreviewed; reserved/unknown identities and missing pairs are validated; AI versus human review is recorded accurately. This scoped export-boundary pass does not certify the separate published build command.', ['Acontent','journeys'])
set_rules('B', 'CMS-02 CMS-06', 'pass', 'Build/preview serve deliberate public assets and rendered copy only, and README states AI-drafted/unapproved content. Per-record publication eligibility is absent and separately recorded as an approval failure.', ['Bcontent','Breadme','journeys'])
set_rules('B', 'CMS-05', 'not checked', 'Existing route uniqueness is tested, but boundary rejection of a new content slug colliding with reserved application routes was not exercised.', ['Bcontent'])
set_rules('AB', 'COL-04', 'pass', 'Missing business/team/product evidence is omitted or qualified; conceptual visuals are labeled and no customer outcome is invented in reviewed copy.', ['content','render'])

set_rules('AB', 'FORM-01 FORM-06..07', 'pass', 'Visible labels and validation work; synthetic receipt/draft status is explicit; no browser payload analytics or background submission is used. B draft preparation does not count as receipt.', ['journeys','Aform','Bform'])
set_rules('A', 'FORM-02..05 FORM-08', 'pass', 'Actual synthetic receiver acceptance, duplicate/retry semantics and bounded failure UI are verified locally; notification email is explicitly absent and not inferred from receipt. Live provider/mailbox acceptance remains unverified.', ['Aform','journeys'])
set_rules('B', 'FORM-02..05 FORM-08', 'fail', 'The selected receiving form has no submission, pending/acceptance/failure/retry path or receiver/notification verification. It truthfully prepares a draft; no false delivery claim is alleged. These rule failures share one missing-capability finding.', ['Bform','journeys'], ['B-01'])

# Retain the classifications while making technical evidence and scope specific.
set_rules('A', 'ARC-03 ARC-12', 'pass',
          'The enquiry domain defines the authoritative strict request schema and validation with no Astro, DOM, filesystem or provider import. The application imports this domain contract and invokes validateEnquiry before dispatch. Browser validation is supplementary. This inspected boundary does not certify the separate publication mechanism.', ['../snapshots/A/src/features/enquiry/domain/index.ts','../snapshots/A/src/features/enquiry/application/index.ts','../snapshots/A/tests/enquiry.test.ts','../evidence/setup/A-unit.log'])
set_rules('A', 'ARC-04 TECH-02', 'pass',
          'EnquiryReceiver is an explicit port. createEnquiryService accepts the selected receiver; server/index.ts alone selects fixture, disabled or Resend. Tests substitute receivers/transports without changing page code. Missing live activation disables receipt instead of silently selecting a fixture. A real provider was not contacted.', ['Aform','../snapshots/A/src/config/server.ts','../snapshots/A/docs/enquiry.md'])
set_rules('A', 'ARC-05 STR-04', 'pass',
          'The compiled module map declares permitted dependencies, and source inspection plus the rerun import/cycle check support the current graph. The checker is regex-based and not proof against every future dynamic import or alias; public-output scanning is a separate control.', ['Aspec','../snapshots/A/scripts/check-boundaries.mjs','../evidence/setup/A-check.log'])
set_rules('B', 'STR-04', 'pass',
          'Current source imports follow the inspected static graph: build imports content/render, render imports content/visuals, preview server imports content, and the browser controller is standalone. This confirms current direction only; the missing documented permitted-import contract remains not checked under ARC-05.', ['../snapshots/B/build.mjs','../snapshots/B/server.mjs','../snapshots/B/src/content.mjs','../snapshots/B/src/render.mjs','../snapshots/B/src/visuals.mjs','../snapshots/B/public/client.js'])
set_rules('A', 'ARC-09', 'pass',
          'Navigation declares Locale/PageId/ProjectId/Intent and the route-record shape. The route wrapper has explicit PageView props and composes templates from validated content. This establishes the current typed contract; it does not prove arbitrary new-record registration or malformed route-registry recovery.', ['../snapshots/A/src/navigation/index.ts','../snapshots/A/src/pages/[...path].astro','../snapshots/A/src/content/index.ts'])
set_rules('A', 'ARC-13', 'pass',
          'PageRecord explicitly contains private source/review data while publicView returns an allowlisted PageView. The receiver adapter maps validated Enquiry into provider-specific fields and maps replies into Outcome. Raw provider responses are not the UI contract.', ['../snapshots/A/src/content/index.ts','../snapshots/A/src/features/enquiry/domain/index.ts','../snapshots/A/src/features/enquiry/server/receivers.ts','../snapshots/A/tests/content.test.ts','../snapshots/A/tests/enquiry.test.ts'])
set_rules('A', 'ARC-15', 'pass',
          'Runtime launch/config own the gateway and child process; enquiry server composition owns adapter selection and private activation. Documentation describes local topology, unavailable startup/receiver behavior and external requirements. This is source/local-runtime evidence, not deployed supervision or availability evidence.', ['Aruntime','../snapshots/A/src/features/enquiry/server/index.ts','../snapshots/A/src/config/server.ts'])
set_rules('A', 'ARC-16', 'pass',
          'The declared local workflow uses bounded process-memory state and receiver IDs; it does not claim a database/mail transaction. Controlled tests cover pending duplicates, stable retry bytes/keys, conflicting payloads and uncertain outcomes. Restart clears local state. Provider acceptance, mailbox receipt and multi-instance recovery remain unverified.', ['../snapshots/A/docs/enquiry.md','../snapshots/A/src/features/enquiry/application/index.ts','../snapshots/A/src/features/enquiry/server/receivers.ts','../snapshots/A/tests/enquiry.test.ts'])
set_rules('A', 'TECH-01 TECH-03', 'pass',
          'Strict Enquiry validation and the Outcome union distinguish rejected, pending, conflict, unavailable, uncertain, throttled and accepted results. The endpoint maps those to HTTP responses and the controller to localized messages. The Resend adapter checks for a receipt ID and does not return raw diagnostics to visitors. Controlled malformed-response checks passed.', ['Aform','../snapshots/A/src/features/enquiry/presentation/controller.ts','../evidence/setup/A-unit.log'])
set_rules('A', 'TECH-06', 'pass',
          'The controller owns an AbortController, generation counter, original retry payload and request ID. pagehide aborts work and invalidates late responses; the use case has an upstream timeout. Saved tests cover uncertainty, retries and interruption. This is scoped to the implemented local enquiry flow.', ['../snapshots/A/src/features/enquiry/presentation/controller.ts','../snapshots/A/src/features/enquiry/application/index.ts','journeys','../snapshots/A/tests/enquiry.test.ts'])
set_rules('A', 'TECH-07', 'pass',
          'The submissionId keys process-local idempotency entries; normalized payload equality detects conflicts. Pending requests are not redispatched, accepted outcomes are reused, automatic retries stop at 23h and entries expire at 24h. Capacity is capped at 1000 entries. Supplied tests check duplicate/conflict/expiry behavior; this is neither a durable nor distributed cache.', ['../snapshots/A/src/features/enquiry/application/index.ts','../snapshots/A/src/features/enquiry/server/receivers.ts','../snapshots/A/docs/enquiry.md','../snapshots/A/tests/enquiry.test.ts'])
set_rules('A', 'SEC-03 SEC-04', 'pass',
          'The declared direct-loopback endpoint checks POST, exact Origin, JSON content type, actual body bytes and strict payload schema, then applies a bounded peer map (5 attempts/minute) and a 10s upstream timeout. Supplied boundary tests passed. This does not establish appropriate controls behind a public proxy, slow-client resistance, load capacity or production TLS.', ['../snapshots/A/src/features/enquiry/server/index.ts','../snapshots/A/scripts/runtime/launch.mjs','../snapshots/A/tests/enquiry.test.ts','../snapshots/A/docs/enquiry.md','../evidence/setup/A-unit.log'])
set_rules('B', 'SEC-03', 'pass',
          'The preview accepts only GET/HEAD, parses and confines paths to generated routes/public assets, and returns 405 for writes. This passes the implemented static-serving boundary only; B has no receiving API to validate or protect.', ['../snapshots/B/server.mjs','journeys'])
set_rules('AB', 'SEC-07', 'pass',
          'Saved local response probes verify effective CSP, content-type protection, referrer/permissions policy and preview noindex headers. Both bind the preview to loopback. Production HTTPS, reverse-proxy configuration and deployed response headers were not assessed.', ['newbrowser','Aruntime','Bruntime'])
set_rules('A', 'DATA-07', 'pass',
          'Documentation discloses synthetic process-memory retention and restart deletion. Receipt/idempotency stores have access-time cleanup and active 24h expiry timers; supplied clock-based tests cover receipt expiry/restart. No live customer-retention system or long-running wall-clock retention audit is certified.', ['../snapshots/A/docs/enquiry.md','../snapshots/A/src/features/enquiry/application/index.ts','../snapshots/A/src/features/enquiry/server/receivers.ts','../snapshots/A/tests/enquiry.test.ts'])
set_rules('B', 'DATA-07', 'pass',
          'The site discloses page-memory drafting with no server receipt, database or browser persistence. Controller inspection and saved form checks support that local scope. User-triggered clipboard copying or email sending transfers control to those applications; their retention is outside this site audit.', ['Bform','journeys'])

# Second pass: independent runtime fault injection and narrower evidence gaps.
set_rules('AB', 'REL-04', 'fail',
          'Invalid-source preparation correctly preserves the active artifact. However, both builders first move dist aside and then promote the candidate without rollback if that second rename fails. Injecting EACCES only at promotion leaves no active dist; A responds 500 and B exits after its missing 404 file is read. The retained prior artifact remains intact and manual restoration succeeds. This is a local injected-failure result, not a production incident.', ['pass-02/probes.mjs','pass-02/fail-promotion.mjs','pass-02/evidence/results.json','../snapshots/A/scripts/runtime/build.mjs','../snapshots/B/build.mjs'], ['G-03'])
set_rules('A', 'SEC-03', 'fail',
          'The enquiry endpoint validates methods/payloads, but the actual gateway parses an untrusted request target outside error handling. A local GET with target http://[ and the expected Host raises ERR_INVALID_URL, exits the gateway with code 1 and makes the next request fail with ECONNREFUSED. This corrects the earlier endpoint-only pass; no public deployment exposure is claimed.', ['pass-02/probes.mjs','pass-02/evidence/results.json','../snapshots/A/scripts/runtime/launch.mjs'], ['GA-04'])
set_rules('B', 'SEC-03', 'pass',
          'The preview confines GET/HEAD to generated routes/public assets and rejects writes. The second pass also sends the same malformed request target used against A: B returns 400 and a following normal request returns 200. This establishes the tested static-serving boundary, not security for a receiving API that does not exist.', ['../snapshots/B/server.mjs','journeys','pass-02/evidence/results.json'])
set_rules('A', 'REL-06', 'pass',
          'Documented local source/artifact recovery is now exercised independently on a disposable copy: a content/caption edit appears, source restoration restores identical HTML, and the previous artifact can be selected, started and then replaced with the final artifact. The supplied exercise changes only its hardcoded fetch port to the reserved evaluation port. Manual recovery after an injected promotion failure also succeeds. No production backup, persistent customer data or migration compatibility is certified.', ['../snapshots/A/docs/runtime.md','../snapshots/A/scripts/verify-recovery.mjs','pass-02/evidence/recovery-adaptation.json','pass-02/evidence/A-recovery-results.json','pass-02/evidence/results.json'])
set_rules('B', 'REL-06', 'not checked',
          'Manual restoration of the retained old artifact succeeds after the injected promotion failure. However, normal successful builds delete that old artifact, and the README defers production rollback to future hosting. The complete documented rollback/rebuild contract remains unverified; the narrow successful rescue is not a full pass.', ['Bruntime','pass-02/evidence/results.json'])
set_rules('B', 'PERF-03', 'pass',
          'Local web fonts use swap and declared fallbacks. The second pass blocks all font requests on Home, the long Polish research page and Polish Contact at widths 390/1280: six cases preserve visible main text with no horizontal page overflow. Saved Home/Contact screenshots were visually inspected. This establishes representative fallback behavior, not every device or font environment.', ['Bdesign','pass-02/browser-probes.mjs','pass-02/evidence/browser-results.json','pass-02/evidence/B-font-fallback-390-en.png','pass-02/evidence/B-font-fallback-1280-kontakt.png'])
set_rules('AB', 'PERF-10', 'not checked',
          'Independent cold mobile samples are complete. The second pass adds warm reloads and blocked-font comparisons for three pages at two widths per site, preserving content. Request interception disables normal browser caching, so those transfer sizes are not cache-efficiency evidence. A complete warm-cache, slow-transition and dependency-fallback matrix remains unverified.', ['performance','pass-02/evidence/browser-results.json','pass-02/browser-probes.mjs'])
set_rules('A', 'FORM-04', 'pass',
          'The original controlled tests verify pending/uncertain retries and duplicate handling. The second pass also posts four concurrent identical requests through the real local gateway: all receive the same receipt ID; a changed payload under that ID receives 409 conflict, and the next attempt receives 429. This demonstrates local synthetic receipt semantics only, not distributed or live-provider deduplication.', ['Aform','journeys','pass-02/evidence/results.json'])

missing = [(id_, label) for id_, rule in rules.items() for label in 'AB' if label not in rule['assessment']]
assert not missing, missing
for rule in rules.values():
    for result in rule['assessment'].values():
        for reference in result['evidence']:
            assert (ROOT/reference).exists(), reference

counts = {label: dict(Counter(rule['assessment'][label]['status'] for rule in rules.values())) for label in 'AB'}
families = defaultdict(lambda: {label: Counter() for label in 'AB'})
for rule in rules.values():
    for label in 'AB': families[rule['family']][label][rule['assessment'][label]['status']] += 1
save('rule-matrix.json', {'scope': 'Frozen first delivery, pair 2026-10-09-pair-01. Current rules/guides identical to delivered A knowledge. B assessed as an external benchmark, not disobedience.',
    'outcomes': ['pass','fail','not checked','not applicable'], 'rule_count': len(rules), 'counts': counts,
    'interpretation': 'Counts are coverage diagnostics, not quality weights or independent defect counts. One defect can affect several rules. Passes are bounded by the explicit local scope and evidence in each row; no production certification.',
    'families': {k:{label:dict(c) for label,c in v.items()} for k,v in families.items()}, 'rules': list(rules.values())})

lines = ['# Guidelines rule matrix', '', 'Pair `2026-10-09-pair-01`. A = detailed; B = inputs-only. Every one of the 219 numbered rules is assessed once for each site. Guides explain applicability and examples; they add no separate numbered obligations.', '',
         'Statuses are exactly those in the library: pass, fail, not checked, not applicable. Pass is limited to the stated local scope. Counts are not quality scores and repeated rule failures may share one underlying defect.', '',
         '| Site | Pass | Fail | Not checked | Not applicable |', '| --- | ---: | ---: | ---: | ---: |']
for label in 'AB': lines.append(f"| {label} | " + ' | '.join(str(counts[label].get(s,0)) for s in ['pass','fail','not checked','not applicable']) + ' |')
for family in sorted(families):
    lines += ['', f'## {family}', '', '| Rule | A | B |', '| --- | --- | --- |']
    for rule in rules.values():
        if rule['family'] != family: continue
        label = f"[{rule['id']}]({rule['source']}:{rule['line']})"
        cells=[]
        for site in 'AB':
            row=rule['assessment'][site]
            refs=[]
            for ref in row['evidence']:
                target=(ROOT/ref).resolve()
                refs.append(f'[{target.name}]({target})')
            reason=row['reason'].replace('|','\\|')
            cells.append(f"**{row['status']}** - {reason} Evidence: "+', '.join(refs))
        lines.append('| '+label+' | '+' | '.join(cells)+' |')
(ROOT/'rule-matrix.md').write_text('\n'.join(lines)+'\n')

integrity = {}
for label, variant in [('A','01-detailed'),('B','02-inputs-only')]:
    baseline=json.loads((RESULTS/f'snapshot-{label}.json').read_text())
    changed=[]
    for item in baseline:
        if item['path'].startswith('dist/'):continue
        for kind, directory in [('original',WORKSPACE/f'runs/2026-10-09-pair-01/{variant}/website'),('snapshot',RESULTS/f'snapshots/{label}')]:
            if sha(directory/item['path']) != item['sha256']:changed.append({'kind':kind,'path':item['path']})
    integrity[label]={'authored_files_checked':sum(not x['path'].startswith('dist/') for x in baseline),'changed':changed}
assert not any(x['changed'] for x in integrity.values()), integrity
save('integrity.json', {'originals_and_snapshots_unchanged':True,'websites':integrity,'fixture_mutations':'Only guidelines/fixtures/ contains intentionally changed synthetic copies; these are not release-ready artifacts.'})
print(json.dumps({'rules':len(rules),'counts':counts,'source_files':len(sources),'sources_match':all(x['same_as_delivered'] for x in sources),'integrity':integrity},indent=2))
