# Visual design and layout

Part of the [baseline rule set](README.md#baseline-rules). Apply each rule to the selected scope and record outcomes in the [acceptance report](../templates/acceptance-report.md); record justified exceptions in the [decision register](../templates/decision-register.md).

## Layout and visual stability

<a id="lay-01"></a>

- **LAY-01** — Use declared layout grids and width variants. Different page templates must not introduce unexplained outer-container widths.

<a id="lay-02"></a>

- **LAY-02** — Control readable prose width inside the appropriate layout container rather than narrowing the entire site shell accidentally.

<a id="lay-03"></a>

- **LAY-03** — Keep horizontal alignment stable when scrollbars appear or disappear.

<a id="lay-04"></a>

- **LAY-04** — Components must shrink within their containers. Horizontal scrolling must be intentional, contained and usable, such as for a wide data table.

<a id="lay-05"></a>

- **LAY-05** — Define wrapping or truncation for long titles, links, addresses, labels and identifiers. Provide access to important full values when truncating.

<a id="lay-06"></a>

- **LAY-06** — Reserve space for fixed controls so they do not cover essential content or the final actionable element.

<a id="lay-07"></a>

- **LAY-07** — Keep anchor destinations visible relative to fixed headers and navigation.

<a id="lay-08"></a>

- **LAY-08** — A sticky reading/sidebar panel must return to normal flow when it cannot fit vertically. An internal scroll region is allowed only as an explicit, verified design choice.

<a id="lay-09"></a>

- **LAY-09** — Reserve media space with dimensions or aspect ratios before loading.

<a id="lay-10"></a>

- **LAY-10** — Decorative layers must not intercept pointer input, obscure content or appear as unexplained accessibility content.

<a id="lay-11"></a>

- **LAY-11** — Define layering for headers, menus, dialogs, notices and decoration centrally rather than escalating arbitrary z-index values.

<a id="lay-12"></a>

- **LAY-12** — Loading, hydration, navigation and restored state must not introduce avoidable jumps, flashes or misleading temporary states.

## Design-system contract

<a id="des-01"></a>

- **DES-01** — Define semantic tokens for surfaces, text, borders, actions, focus, status and overlays.

<a id="des-02"></a>

- **DES-02** — Centralise typography, spacing, geometry, shadows, content widths and motion values.

<a id="des-03"></a>

- **DES-03** — Reusable components consume the shared system; intentional exceptions are named variants or scoped themes.

<a id="des-04"></a>

- **DES-04** — Specify default, hover, focus, active and disabled states, plus applicable loading, empty, success and error states.

<a id="des-05"></a>

- **DES-05** — Use consistent icon geometry and meaning. Colour alone must not carry essential information.

<a id="des-06"></a>

- **DES-06** — Where project or product palettes are needed, scope them without breaking global focus, contrast and interaction rules.

<a id="des-07"></a>

- **DES-07** — Keep a reference of actual reusable components and states appropriate to the project's size. It must not drift into an unrelated showcase.

<a id="des-08"></a>

- **DES-08** — Keep text needed for reading, navigation and search as accessible content rather than embedding it only in decorative images.
