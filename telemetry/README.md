# Website experiment telemetry

The prepared pair is in `../runs/2026-10-09-pair-01/`. Both requested sessions use `gpt-6-astra` with `xhigh` reasoning. Neither entry prompt has started. The two repositories contain byte-identical copies of their prepared prompt packages and separate empty private Node projects under `website/`.

The installed Codex user configuration selects the existing `litellm-coolify` provider. Its configured host is `litellm.coolify.threesixty.dev`. Authentication values remain in the existing user configuration and are not copied into this repository. Provider selection alone does not prove that gateway logging, cost attribution or these future sessions work.

## Local collection

`collect.py` reads only thread IDs explicitly registered in the pair's `run-manifest.json`. It writes metadata summaries without copying prompts, code, tool arguments, tool outputs, account identifiers or credentials. It makes no network requests and changes no Codex settings. It can run alongside the sessions or after them because the original local recordings persist.

From this experiment repository:

```sh
python3 telemetry/collect.py --manifest runs/2026-10-09-pair-01/run-manifest.json --output runs/2026-10-09-pair-01/telemetry --watch
```

Omit `--watch` for a single snapshot. Stop the watcher with Ctrl-C. Website sessions do not need to know about this observer or follow a telemetry-specific implementation workflow.

The collector preserves model/effort, per-response token usage and response IDs, recorded tool names/call IDs, call/output timestamps, turn boundaries, interruptions and user-role message counts. It deduplicates response usage and merges overlapping tool waits.

## Interpretation and remaining verification

- Token usage is observed provider-reported usage. Cached and reasoning tokens are subcategories, not additional tokens to add to totals. Missing fields are counted explicitly.
- Tool counts describe calls visible in the session recording. Nested operations inside `functions.exec` need separate telemetry for authoritative per-operation counts; parsing JavaScript text would not prove execution.
- Call/output timestamps measure observed waiting intervals, not precise CPU execution. The difference between wall time and tool waits is not pure reasoning time.
- Interrupted turns and user-role messages are recorded separately. Setup messages, automatic messages and human interventions require attribution; the collector does not equate them.
- Failed/retried backend requests without usage do not appear as successful response records. Gateway request logs are needed to count all attempts.
- Exact hidden-reasoning duration is unavailable in these recordings. Keep it null; backend request latency includes other work.
- Cost remains null until matched gateway spend evidence is available. Gateway-reported cost can be an estimate or configured accounting value and must not be described as an actual bill without supporting billing evidence.

## Launch gate

Before either website entry prompt runs, verify the existing gateway connection, the requested model, session/request correlation and logging/usage/cost availability. Verify local collection for the new thread IDs, and explicitly record any measurement gaps. Keep preflight/setup measurements separate from the two website runs.

On 9 October 2026 the sandboxed gateway probe could not resolve its hostname. Automatic approval review then rejected an elevated read-only probe because sending the configured authentication credentials to this particular external host required explicit user authorization. No network workaround was attempted. The credential values were not printed or stored here. Both website sessions remain unstarted pending authorization and successful verification.

## References

- Official Codex configuration and telemetry: `https://learn.chatgpt.com/docs/config-file/config-advanced`
- Official ChatGPT gateway authentication: `https://learn.chatgpt.com/docs/enterprise/sign-in-with-chatgpt-through-a-gateway`
- LiteLLM Codex setup: `https://docs.litellm.ai/docs/proxy/client_setup/codex_cli`
- LiteLLM spend logs and request-ID filtering: `https://docs.litellm.ai/docs/proxy/cost_tracking`

Local recording schema was inspected in the current preparation chat using Codex CLI `0.162.0-alpha.17.2`. This preparation chat is not either website experiment run.
