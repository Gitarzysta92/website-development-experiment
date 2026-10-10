# Persistent guided assistant: rules

Apply these rules when the [persistent guided assistant capability](../../capabilities/assistant.md) is selected, alongside the relevant [baseline and technical rules](../README.md). The capability contract supplies its inputs, applicability and verification cases.

<a id="chat-01"></a>

- **CHAT-01** — State what the assistant does, what completes the workflow and whether it is a connected service or a demonstration.

<a id="chat-02"></a>

- **CHAT-02** — Suggested responses, free text and contextual actions have discoverable, usable states for the intended audience.

<a id="chat-03"></a>

- **CHAT-03** — Define what survives navigation, refresh, closing the panel and returning later; choose architecture to fulfil that contract.

<a id="chat-04"></a>

- **CHAT-04** — Persist accepted state before notifying consumers; stale snapshots/responses cannot overwrite a newer revision.

<a id="chat-05"></a>

- **CHAT-05** — Restore small visible state without misleading empty flashes; reconcile caches with the source of truth.

<a id="chat-06"></a>

- **CHAT-06** — Interrupted work becomes retryable or explicitly failed. Retrying preserves accepted inputs and does not duplicate the action.

<a id="chat-07"></a>

- **CHAT-07** — Unread counters represent the defined unit, such as completed replies, and clear under a documented visibility/read rule.

<a id="chat-08"></a>

- **CHAT-08** — Completed artifacts have stable identity and remain distinct from conversation messages and actual submission receipts.

<a id="chat-09"></a>

- **CHAT-09** — Local persistence is not presented as server delivery or guaranteed backup. Define storage clearing and unavailable-storage behaviour.

<a id="chat-10"></a>

- **CHAT-10** — Keep optional assistant failures separate from ordinary browsing. Do not select a service worker or SPA without a project-specific need.
