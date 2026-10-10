# Website Development Experiment

An experiment comparing two approaches to AI-assisted website development using
the same Artifactory website brief:

- **Detailed:** source inputs plus a compiled specification, implementation plan,
  and website creation guidelines.
- **Inputs only:** source inputs and an entry prompt, with implementation choices
  left to the agent.

The experiment compares website quality, instruction compliance, execution time,
and token usage across paired runs.

## Repository structure

| Folder | Contents |
| --- | --- |
| [prompt-sets/](prompt-sets/) | Reusable prompts, source inputs, and detailed implementation guidance. |
| [runs/](runs/) | Individual run manifests, generated websites, and telemetry snapshots. |
| [evaluation/](evaluation/) | Evaluation protocol, scorecards, screenshots, and results. |
| [telemetry/](telemetry/) | Scripts for collecting session usage and timing metadata. |
| [deployment/](deployment/) | Coolify deployment scripts and verification artifacts. |

## Getting started

Read the [evaluation plan](evaluation/plan.md) for the comparison criteria.
Generated websites are under `runs/<run-id>/<variant>/website/`; each has its own
README with setup, build, and test instructions.

See the [detailed prompt package](prompt-sets/01-detailed/README.md) and
[inputs-only entry prompt](prompt-sets/02-inputs-only/prompt.txt) for the two
approaches, and the [telemetry guide](telemetry/README.md) for data collection.

Results describe these specific runs and prompt packages; they do not establish
a general winner for all website development tasks.
