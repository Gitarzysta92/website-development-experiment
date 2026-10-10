# Website acceptance and release report

Project:
Guidelines version/reference:
Brief/decision-register versions:
Related implementation-document links/versions, if used:
Implementation-plan reference/revision and exact unit manifest:
Execution-policy reference/version and mode:
Execution-record references/attempts:
Code/content/configuration version:
Environment and URL:
Verification date:
Verifier:

This report separates planned coverage from actual evidence. It is not a declaration that every baseline rule passes by default. It may be opened during compilation; execution details and results remain unfilled or `not checked` until verified.

## Scope and applicability

- Workflow/change scope and requested outcome:
- Objective inventory and compiled objective-to-structure-to-unit mapping references:
- Page templates and representative URLs:
- Selected capability modules:
- Chosen project structure and mapping to the selected tools:
- Critical visitor journeys:
- Applicable baseline/module/technical rules, including `ARC-*`, `STR-*` and `TECH-*`:
- Not-applicable rules and reasons:
- Accepted exceptions (decision IDs):
- Quality budgets and supported browser/device targets:

## Compilation coverage

Record planning coverage here or link an existing authoritative matrix. Follow the [compilation guide](../compilation/README.md#coverage-and-traceability) to account for applicable rules, project requirements, shared consumers and later lifecycle work.

- Coverage source versions and compilation scope:
- Complete-package gate and mode-specific acceptance reference in the plan:
- Existing coverage-matrix location/version, if used instead of the table:

| Rule ID(s), capability or project requirement reference | Objective reference and structural targets | Applicability and reason | Owning unit/output and owner | Planned check reference | Decision/gap reference |
| --- | --- | --- | --- | --- | --- |
| To define | | Unresolved | | | |

Applicability is `applies`, `not applicable` with a reason, or `unresolved`. Resolve consequential coverage gaps before package completion. These are planning states, not verification outcomes. An accepted exception retains its rule reference and impact. Link planned checks to unit contracts or the evidence table; unexecuted checks remain `not checked`. The plan owns package completeness/acceptance and the execution records own progress; link those records instead of maintaining competing states here.

## Requirement evidence

| Rule ID(s), objective or project requirement | Plan/unit revision, output and check reference | Concrete check | Conditions/input and implementation version | Outcome | Evidence | Issue/owner |
| --- | --- | --- | --- | --- | --- | --- |
| To define | | | | Not checked | | |

Outcomes: `pass`, `fail`, `not checked`, `not applicable` with a reason. A configured control without an execution check is not automatically a pass.

Include shared-consumer and combined-journey checks from the plan's integration checkpoints. Identify reused evidence by its original scope, implementation version and conditions; preserve prior results and record rechecks when a revision changes their applicability. A revised plan does not automatically inherit a previous pass.

## Architecture and technical evidence

- Implementation revision and module map compared with the brief and its linked documentation:
- Representative page/use-case/adapter/data-source trace, where applicable:
- Public API/import boundaries and dependency-cycle checks:
- Browser/server separation, privileged configuration and request/user state isolation, where applicable:
- Feature setup, real/mock adapter selection and state/cache lifetime checks:
- Route/layout contracts and async cleanup/stale-response checks:
- Relevant domain, feature and adapter checks, with isolated versus real integrations identified:
- Install/build/check/preview commands actually run, conditions and results:
- Generated-output regeneration/source-of-truth checks, where applicable:
- Temporary architecture exceptions, owner and removal/revisit trigger:
- Unchecked integrations or technical boundaries:

A structure description, type check or mock-backed test alone does not prove the real integration or rendered journey works. Mark absent responsibilities `not applicable` with a reason.

## Representative state matrix

Select combinations relevant to the website; exhaustive cross-products are not required.

| Dimension | Applicable conditions | Tested conditions/evidence | Gaps |
| --- | --- | --- | --- |
| Viewport | Narrow/wide, short/tall, orientation, safe areas | | |
| Input | Mouse, touch, keyboard | | |
| Readability | Enlarged text/zoom, long labels, contrast | | |
| Content | Zero/one/many entries, missing optional data, invalid input | | |
| Appearance | Default/alternate themes, reduced motion | | |
| Operation | Loading, empty, success, error, disabled | | |
| Navigation | Direct entry, refresh, Back/Forward, new tab, anchors | | |
| Dependencies | Slow/unavailable services, interrupted requests | | |
| Persistence | Available/blocked/cleared storage, stale response, another tab | | |
| Visibility | Public/private, preview/production, metadata and redirects | | |
| Privacy | No consent, permitted collection, withdrawal/expiry where used | | |

## Critical outcomes

- Navigation and primary visitor journey:
- Content fidelity and supported claims:
- Form/transaction delivery and duplicate protection, if applicable:
- Search/collection completeness, if applicable:
- Access and privacy boundaries:
- Metadata, sitemap and link/asset checks:
- Performance measurements and test conditions:
- Monitoring/measurement validation:
- Recovery and rollback evidence:
- Known limitations and unresolved failures:

## Release

- Release status and outstanding work/checks:
- Publication authorisation/process:
- Exact release contents:
- Relevant checks and their results:
- Persistent-data migration/backup needs:
- Previous version and recovery route:
- Deployment receipt and completion result:
- Publicly observed version:
- Important routes/assets verified:
- Real functional outcome verified:
- Domain/email dependencies preserved:

Do not mark publication complete from build success, a queued deployment or backend health alone.

## Handover and open work

- Editing and content owner:
- Deployment/configuration operator:
- Enquiry/transaction owner:
- Monitoring and alert owner:
- Retention/background-job owner and last verified execution:
- Backup/restore owner and last verified restoration:
- Runbook locations:
- Module-map location and contributor instructions, as linked from the brief:
- Remaining work, impact and responsible owner:
- Post-launch work authorised/scheduled (or explicitly not scheduled):
