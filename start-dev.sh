#!/usr/bin/env bash
# Start both services in the current shell using concurrently
set -e
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"

echo "Starting backend and frontend (this will run in the foreground)."
npx concurrently "npm:dev:backend" "npm:dev:frontend"
