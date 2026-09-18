# DocConnect Agent Demo

A small React app used to demo [GitHub Agentic Workflows](https://github.github.com/gh-aw/).
Open a pull request, an AI agent reviews it against the team's front-end
standards and posts a comment. Read-only token, no secrets in the agent, and a
comment is the only thing it is permitted to write.

## Setup (once, before the demo)

```bash
npm install
npm run dev            # optional — confirms the app runs

gh repo create docconnect-agent-demo --private --source=. --push

gh extension install github/gh-aw
gh aw compile
git add .github/workflows/ui-review.lock.yml
git commit -m "Compile UI review workflow"
git push
```

Pick an engine when prompted. Copilot uses your existing subscription with no
extra secret. For Claude, set the key yourself:

```bash
gh secret set ANTHROPIC_API_KEY
```

**Rehearse once.** Run `./demo/open-bad-pr.sh`, confirm the comment lands, then
`./demo/reset.sh`. A run takes two to three minutes.

## Running the demo

```bash
./demo/open-bad-pr.sh
```

That branches, drops `demo/DocumentPanel.tsx` into `src/components/`, pushes,
and opens the PR. The workflow fires on the path filter. Talk through the job
graph in the Actions tab while it works — the six boxes are the security story:

| Job | What it does |
| --- | --- |
| `pre_activation` | Decides whether this should run at all |
| `activation` | Builds the prompt from repo and PR context |
| `agent` | The sandboxed run — read-only token, network firewall, no secrets |
| `detection` | Scans what the agent proposed for anything suspicious |
| `safe_outputs` | Applies only the writes declared in the frontmatter |
| `conclusion` | Reports the run |

Afterwards: `./demo/reset.sh`, and close the PR.

## What the agent should find

`demo/DocumentPanel.tsx` breaks six rules on purpose:

1. `fetch` called inside the component instead of a hook
2. Hardcoded API URL, bypassing `src/api/client.ts`
3. `any` on props, state, and callback parameters
4. No loading, error, or empty state
5. A clickable `div` instead of a button — unreachable by keyboard
6. Inline styles where `src/index.css` already has tokens

The clean equivalent is `src/components/DocumentList.tsx` and
`src/components/DocumentRow.tsx` with `src/hooks/useDocuments.ts`. Good contrast
to put side by side on screen.

It is a model, not a linter, so it may raise something you did not plant. Don't
script your narration to an exact finding.

## Structure

```
src/api/client.ts        The only module that touches the network
src/hooks/useDocuments.ts  Owns loading, error, and empty state
src/components/          Presentational only
.github/workflows/ui-review.md    The agentic workflow (source)
demo/                    The bad file and the demo scripts
```

## Changing the review rules

Edit the markdown body of `.github/workflows/ui-review.md`, then:

```bash
gh aw compile
```

Commit both the `.md` and the generated `.lock.yml` — the lock file is what
Actions actually runs.
