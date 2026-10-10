# Interaction and accessibility

Part of the [baseline rule set](README.md#baseline-rules). Apply each rule to the selected scope and record outcomes in the [acceptance report](../templates/acceptance-report.md); record justified exceptions in the [decision register](../templates/decision-register.md).

## Responsive behaviour

<a id="rwd-01"></a>

- **RWD-01** — Specify how each component adapts when space is insufficient: wrap, stack, truncate, collapse or intentionally scroll.

<a id="rwd-02"></a>

- **RWD-02** — Preserve logical reading and keyboard order when the visual arrangement changes.

<a id="rwd-03"></a>

- **RWD-03** — Make hover-revealed information and actions available on touch and keyboard focus.

<a id="rwd-04"></a>

- **RWD-04** — Keep the primary visitor actions reasonably reachable in the selected mobile navigation model.

<a id="rwd-05"></a>

- **RWD-05** — Fit drawers and dialogs to the available viewport, including short landscape screens and changing browser chrome.

<a id="rwd-06"></a>

- **RWD-06** — Account for relevant device safe areas and the combined height of fixed controls.

<a id="rwd-07"></a>

- **RWD-07** — Prevent simultaneous floating surfaces from obscuring each other; define which close or hide when a drawer or dialog opens.

<a id="rwd-08"></a>

- **RWD-08** — Reconcile layout and interaction state after resizing or orientation changes without requiring a refresh.

<a id="rwd-09"></a>

- **RWD-09** — Verify narrow and short viewports, long content, enlarged text and the project's supported input methods.

<a id="rwd-10"></a>

- **RWD-10** — Select breakpoints based on actual content and component fit; document shared breakpoint values instead of duplicating incompatible numbers.

## Navigation and actions

<a id="nav-01"></a>

- **NAV-01** — Use real links for navigation and buttons for actions, with meaningful accessible names.

<a id="nav-02"></a>

- **NAV-02** — Preserve Back, Forward, refresh, direct entry, new-tab navigation and modified clicks for the selected routing strategy.

<a id="nav-03"></a>

- **NAV-03** — Make menus usable with the supported mouse, touch and keyboard inputs.

<a id="nav-04"></a>

- **NAV-04** — Expose selected and expanded/collapsed states; identify the current page or section where useful.

<a id="nav-05"></a>

- **NAV-05** — Dismissible overlays support appropriate closing behaviour and focus recovery.

<a id="nav-06"></a>

- **NAV-06** — Pointer movement from a menu trigger into its content must not cause premature closure.

<a id="nav-07"></a>

- **NAV-07** — Breadcrumbs reflect the actual content hierarchy; long labels follow the shared truncation contract.

<a id="nav-08"></a>

- **NAV-08** — Generate shared navigation from a common source, and define behaviour for zero, one and many content entries.

<a id="nav-09"></a>

- **NAV-09** — New published entries join applicable listings and adjacent-item navigation automatically, in a documented stable order.

<a id="nav-10"></a>

- **NAV-10** — Keep navigation geometry stable during initialisation, route changes and header resizing.

<a id="nav-11"></a>

- **NAV-11** — A single-destination card has one coherent link target without redundant keyboard stops. Multi-action cards must not have a conflicting whole-card link.

<a id="nav-12"></a>

- **NAV-12** — Decorative feedback must not generate duplicate actions or delay critical work. Preserve native timing where animation would conflict with user intent.

## Accessibility and motion

<a id="a11y-01"></a>

- **A11Y-01** — Use meaningful document structure and heading hierarchy, independently of visual font sizes.

<a id="a11y-02"></a>

- **A11Y-02** — Provide keyboard access, visible focus and an understandable focus order for interactive features.

<a id="a11y-03"></a>

- **A11Y-03** — Give controls appropriate labels, names and state information; icon-only controls need understandable names.

<a id="a11y-04"></a>

- **A11Y-04** — Provide appropriate alternatives and captions for informative media; mark purely decorative media accordingly.

<a id="a11y-05"></a>

- **A11Y-05** — Define readable contrast and usable target-size criteria against the project's accessibility target, then verify rendered contexts and interaction states.

<a id="a11y-06"></a>

- **A11Y-06** — Keep dialogs appropriately named, constrained to their intended interaction scope and equipped with a clear close control and focus return.

<a id="a11y-07"></a>

- **A11Y-07** — Respect reduced-motion preferences. Essential information must remain available without decorative animation.

<a id="a11y-08"></a>

- **A11Y-08** — Provide a pause/stop mechanism when appropriate for continuing motion. Keep it discoverable without making it dominate the content.

<a id="a11y-09"></a>

- **A11Y-09** — Pause unnecessary decorative work when the page is inactive or the relevant section is not visible.

<a id="a11y-10"></a>

- **A11Y-10** — Coordinate animations that describe one sequence through a coherent timing model. Pausing must not desynchronise related parts.

<a id="a11y-11"></a>

- **A11Y-11** — Never represent a limited automated check as a complete accessibility audit or conformance certification.
