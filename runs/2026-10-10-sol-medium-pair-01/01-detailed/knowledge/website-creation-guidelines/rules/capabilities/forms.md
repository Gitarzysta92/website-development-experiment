# Forms and enquiries: rules

Apply these rules when the [forms and enquiries capability](../../capabilities/forms.md) is selected, alongside the relevant [baseline and technical rules](../README.md). The capability contract supplies its inputs, applicability and verification cases.

<a id="form-01"></a>

- **FORM-01** — Fields have visible labels, connected hints and useful validation messages.

<a id="form-02"></a>

- **FORM-02** — Show progress, prevent accidental repeated submission and preserve input after failure.

<a id="form-03"></a>

- **FORM-03** — Success means confirmed acceptance by the intended receiving system, not merely an attempted network request.

<a id="form-04"></a>

- **FORM-04** — Retries of an uncertain operation do not create duplicates where duplication would harm the user or business.

<a id="form-05"></a>

- **FORM-05** — Requests have bounded waiting and understandable failure/retry behaviour, plus the configured alternative contact path.

<a id="form-06"></a>

- **FORM-06** — Preview/test submissions cannot become unmarked real enquiries.

<a id="form-07"></a>

- **FORM-07** — Attribution follows the applicable privacy policy and never sends the form body to analytics.

<a id="form-08"></a>

- **FORM-08** — Confirm delivery and configured notifications separately. A stored record does not prove an email notification was sent.
