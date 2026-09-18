#!/usr/bin/env bash
# Opens the demo pull request that trips the UI review agent.
set -euo pipefail

BRANCH="demo/document-panel-$(date +%H%M%S)"

git checkout -b "$BRANCH"
cp demo/DocumentPanel.tsx src/components/DocumentPanel.tsx
git add src/components/DocumentPanel.tsx
git commit -m "Add document panel"
git push -u origin "$BRANCH"

gh pr create \
  --title "Add document panel" \
  --body "New panel for the documents view. Ready for review." \
  --base main \
  --head "$BRANCH"

echo
echo "PR opened. Watch the run:  gh run watch"
