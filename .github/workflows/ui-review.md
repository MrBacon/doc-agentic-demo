---
emoji: ⚛️
name: DocConnect UI Review
description: Reviews React changes against team front-end standards
engine: claude
on:
  pull_request:
    types: [opened, synchronize]
    paths:
      - "src/**/*.tsx"
      - "src/**/*.ts"
permissions:
  contents: read
  pull-requests: read
strict: true
network:
  allowed: [defaults, github]
tools:
  github:
    mode: gh-proxy
    toolsets: [default]
safe-outputs:
  add-comment:
---

# DocConnect front-end review

Review the React files changed in this pull request against our team standards.

## Standards

- **Data fetching lives in hooks, not components.** Components render; a hook
  in `src/hooks/` owns loading. No `fetch` inside a component body or JSX file.
- **Network access goes through `src/api/client.ts`.** Nothing else calls
  `fetch` or hardcodes a URL. The UI never talks to the API directly — it goes
  through the BFF client layer.
- **Types are explicit.** No `any`. Props and return types are declared.
- **Async UI handles all three states**: loading, error, and empty. An empty
  result is not an error and should say what to try next.
- **Interactive elements are real controls.** A `div` with an `onClick` is not a
  button. Keyboard users must be able to reach and activate it.
- **Styling belongs in CSS**, using the tokens already in `src/index.css`. No
  inline style objects for anything a token covers.

## How to respond

Post a single comment.

1. Open with a one-line verdict.
2. List at most five findings. For each: the file, roughly where, what rule it
   breaks, and a concrete fix. Be specific enough to act on without opening the
   standards doc.
3. Close by noting anything genuinely well done.

Be useful, not pedantic — skip nits that a formatter would catch. Call `noop`
if no front-end files changed or you found nothing worth saying.
