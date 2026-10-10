#!/usr/bin/env python3
"""Summarize only explicitly selected Codex recordings, without exporting content."""
import argparse
from collections import Counter
from datetime import datetime, timezone
import json
from pathlib import Path
import time

TOKEN_KEYS = ('input_tokens', 'cached_input_tokens', 'cache_write_input_tokens',
              'output_tokens', 'reasoning_output_tokens', 'total_tokens')


def timestamp(value):
    if not isinstance(value, str):
        return None
    try:
        return datetime.fromisoformat(value.replace('Z', '+00:00')).timestamp()
    except ValueError:
        return None


def union_seconds(intervals):
    merged = []
    for start, end in sorted(intervals):
        if end < start:
            continue
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return sum(end - start for start, end in merged)


def read_records(path):
    records, incomplete = [], 0
    with path.open() as stream:
        for line in stream:
            try:
                records.append(json.loads(line))
            except json.JSONDecodeError:
                incomplete += 1  # A running process can leave a partial final line.
    return records, incomplete


def summarize(records):
    calls, outputs, requests, turns, models = {}, {}, {}, {}, set()
    events, normalized, messages = Counter(), [], []
    seen = set()
    session = {}
    for record in records:
        ordinal = record.get('ordinal')
        if ordinal is not None:
            if ordinal in seen:
                continue
            seen.add(ordinal)
        kind, p = record.get('type'), record.get('payload', {})
        if not isinstance(p, dict):
            continue
        at = record.get('timestamp')
        if kind == 'session_meta':
            session = {k: p[k] for k in ('id', 'cwd', 'cli_version', 'model_provider') if k in p}
        elif kind == 'turn_context':
            models.add((p.get('model'), p.get('effort', p.get('reasoning_effort'))))
        elif kind == 'token_usage_record':
            response_id = p.get('response_id')
            if response_id:
                usage = {k: p.get('usage', {}).get(k) for k in TOKEN_KEYS}
                requests[response_id] = {'response_id': response_id, 'turn_id': p.get('turn_id'),
                                         'timestamp': at, 'usage': usage}
        elif kind == 'response_item':
            sub = p.get('type')
            call_id = p.get('call_id', p.get('id'))
            if sub in ('function_call', 'custom_tool_call') and call_id:
                calls.setdefault(call_id, {'call_id': call_id, 'tool': p.get('name'),
                                           'timestamp': at, 'kind': sub})
            elif sub in ('function_call_output', 'custom_tool_call_output') and call_id:
                outputs[call_id] = at
            elif sub == 'web_search_call' and call_id:
                calls.setdefault(call_id, {'call_id': call_id, 'tool': 'web_search',
                                           'timestamp': at, 'kind': sub})
            elif sub == 'message' and p.get('role') == 'user':
                # These can include setup/context messages, not necessarily human interventions.
                messages.append({'timestamp': at, 'ordinal': ordinal})
        elif kind == 'event_msg':
            sub = p.get('type', 'unknown')
            events[sub] += 1
            if sub in ('task_started', 'task_complete', 'turn_aborted'):
                tid = p.get('turn_id', p.get('root_turn_id', str(ordinal)))
                turn = turns.setdefault(tid, {'turn_id': tid})
                if sub == 'task_started':
                    turn['started_at'] = p.get('started_at', at)
                    turn.setdefault('status', 'running')
                else:
                    turn.update(status='interrupted' if sub == 'turn_aborted' else 'completed',
                                completed_at=p.get('completed_at', at),
                                duration_ms=p.get('duration_ms'))
                    if p.get('started_at'):
                        turn['started_at'] = p['started_at']
                normalized.append({'kind': sub, 'timestamp': at, 'turn_id': tid})

    intervals = []
    for call_id, call in calls.items():
        completed = outputs.get(call_id)
        start, end = timestamp(call['timestamp']), timestamp(completed)
        call['completed_at'] = completed
        call['observed_wait_seconds'] = end - start if start is not None and end is not None and end >= start else None
        if call['observed_wait_seconds'] is not None:
            intervals.append((start, end))
    totals = {k: sum(r['usage'][k] for r in requests.values() if isinstance(r['usage'][k], int)) for k in TOKEN_KEYS}
    missing = {k: sum(not isinstance(r['usage'][k], int) for r in requests.values()) for k in TOKEN_KEYS}
    if not requests:
        totals = {k: None for k in TOKEN_KEYS}
    turn_intervals = []
    for turn in turns.values():
        start, end = timestamp(turn.get('started_at')), timestamp(turn.get('completed_at'))
        if start is not None and end is not None:
            turn_intervals.append((start, end))
    return {
        'schema_version': 1, 'session': session,
        'models_observed': [{'model': m, 'reasoning_effort': e} for m, e in sorted(models, key=str)],
        'model_responses_with_usage': len(requests), 'tokens': totals,
        'responses_missing_token_fields': missing,
        'tool_calls': len(calls), 'tool_calls_by_name': dict(Counter(c['tool'] for c in calls.values())),
        'tool_calls_with_observed_output': sum(c['completed_at'] is not None for c in calls.values()),
        'tool_wait_union_seconds': union_seconds(intervals),
        'completed_or_interrupted_turn_union_seconds': union_seconds(turn_intervals),
        'interrupted_turns': sum(t.get('status') == 'interrupted' for t in turns.values()),
        'user_role_messages': len(messages), 'user_message_candidates': messages,
        'operator_interventions_confirmed': None, 'event_counts': dict(events),
        'pure_reasoning_seconds': None, 'gateway_cost_usd': None,
        'requests': list(requests.values()), 'calls': list(calls.values()),
        'turns': list(turns.values()), 'lifecycle_events': normalized,
        'limitations': [
            'Counts tool calls visible in the recording. Nested operations inside functions.exec are not separately certified.',
            'Tool wait uses recording timestamps and is not a precise CPU execution timer; overlapping waits are merged.',
            'Response records exclude failed/retried requests without usage; gateway logs are needed for total request attempts.',
            'User-role messages and interrupted turns are observations, not an automatic count of human interventions.',
            'Reasoning tokens are a subset of output tokens. Exact hidden-reasoning duration is unavailable.',
            'No dollar cost is inferred. Correlate response IDs with verified gateway spend records.',
        ]
    }


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + '.tmp')
    temporary.write_text(json.dumps(value, indent=2) + '\n')
    temporary.replace(path)


def collect_manifest(manifest_path, output_dir, sessions_root):
    manifest = json.loads(manifest_path.read_text())
    results = []
    for session in manifest['sessions']:
        tid = session.get('thread_id')
        if not tid:
            results.append({'variant': session['variant'], 'status': 'not started'})
            continue
        files = list(sessions_root.glob(f'*/*/*/*{tid}*.jsonl'))
        if len(files) != 1:
            results.append({'variant': session['variant'], 'status': 'recording unavailable or ambiguous', 'matches': len(files)})
            continue
        records, incomplete = read_records(files[0])
        result = summarize(records)
        if result['session'].get('id') != tid:
            raise ValueError('Recording identity does not match the selected thread')
        result.update(variant=session['variant'], source_recording=str(files[0]), incomplete_lines=incomplete,
                      collected_at=datetime.now(timezone.utc).isoformat())
        write_json(output_dir/session['variant']/'summary.json', result)
        results.append({'variant': session['variant'], 'status': 'collected', 'thread_id': tid})
    write_json(output_dir/'collector-status.json', {'sessions': results})
    return results


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--sessions-root', type=Path, default=Path.home()/'.codex/sessions')
    parser.add_argument('--watch', action='store_true')
    parser.add_argument('--interval', type=float, default=5)
    args = parser.parse_args()
    if args.interval <= 0:
        parser.error('--interval must be positive')
    while True:
        results = collect_manifest(args.manifest, args.output, args.sessions_root)
        if not args.watch:
            print(json.dumps(results))
            return
        time.sleep(args.interval)


if __name__ == '__main__':
    main()
