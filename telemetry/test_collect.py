import unittest
from collect import summarize, union_seconds


def record(kind, payload, at='2026-10-09T10:00:00Z', ordinal=None):
    r = {'type': kind, 'payload': payload, 'timestamp': at}
    if ordinal is not None:
        r['ordinal'] = ordinal
    return r


class CollectorTests(unittest.TestCase):
    def test_deduplicates_responses_without_double_counting_reasoning(self):
        usage = {'input_tokens': 100, 'cached_input_tokens': 20, 'cache_write_input_tokens': 0,
                 'output_tokens': 40, 'reasoning_output_tokens': 30, 'total_tokens': 140}
        r = record('token_usage_record', {'response_id': 'resp_1', 'usage': usage})
        summary = summarize([r, r])
        self.assertEqual(summary['model_responses_with_usage'], 1)
        self.assertEqual(summary['tokens']['total_tokens'], 140)
        self.assertEqual(summary['tokens']['output_tokens'], 40)
        self.assertIsNone(summary['gateway_cost_usd'])
        self.assertIsNone(summary['pure_reasoning_seconds'])

    def test_overlapping_tool_waits_are_not_summed(self):
        rows = [
            record('response_item', {'type': 'function_call', 'call_id': 'a', 'name': 'shell'}, '2026-10-09T10:00:00Z'),
            record('response_item', {'type': 'function_call', 'call_id': 'b', 'name': 'shell'}, '2026-10-09T10:00:02Z'),
            record('response_item', {'type': 'function_call_output', 'call_id': 'a', 'output': 'secret'}, '2026-10-09T10:00:04Z'),
            record('response_item', {'type': 'function_call_output', 'call_id': 'b'}, '2026-10-09T10:00:06Z'),
        ]
        s = summarize(rows)
        self.assertEqual(s['tool_calls'], 2)
        self.assertEqual(s['tool_wait_union_seconds'], 6)
        self.assertNotIn('secret', str(s))

    def test_interruption_and_missing_output_remain_explicit(self):
        rows = [
            record('event_msg', {'type': 'task_started', 'turn_id': 't'}),
            record('response_item', {'type': 'custom_tool_call', 'call_id': 'c', 'name': 'functions.exec'}),
            record('event_msg', {'type': 'turn_aborted', 'turn_id': 't'}, '2026-10-09T10:00:05Z', 3),
            record('event_msg', {'type': 'turn_aborted', 'turn_id': 't'}, '2026-10-09T10:00:05Z', 3),
        ]
        s = summarize(rows)
        self.assertEqual(s['interrupted_turns'], 1)
        self.assertEqual(s['event_counts']['turn_aborted'], 1)
        self.assertEqual(s['tool_calls_with_observed_output'], 0)
        self.assertIsNone(s['calls'][0]['observed_wait_seconds'])
        self.assertIsNone(s['operator_interventions_confirmed'])
        self.assertIsNone(s['tokens']['total_tokens'])

    def test_inverted_and_nested_intervals(self):
        self.assertEqual(union_seconds([(0, 10), (2, 3), (9, 12), (15, 14)]), 12)

    def test_missing_usage_fields_are_not_reported_complete(self):
        s = summarize([record('token_usage_record', {'response_id': 'r', 'usage': {'input_tokens': 1}})])
        self.assertEqual(s['responses_missing_token_fields']['output_tokens'], 1)
        self.assertEqual(s['responses_missing_token_fields']['input_tokens'], 0)


if __name__ == '__main__':
    unittest.main()
