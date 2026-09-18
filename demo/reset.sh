#!/usr/bin/env bash
# Back to a clean main after a demo run.
set -euo pipefail
git checkout main
git branch | grep 'demo/document-panel' | xargs -r git branch -D
echo "Back on main. Close the PR on GitHub if you want it gone."
