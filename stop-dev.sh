#!/usr/bin/env bash
# Stop processes listening on dev ports (5002 and 5173-5180)
set -e

echo "Stopping processes on ports 5002 and 5173-5180 (if any)"
for p in 5002 $(seq 5173 5180); do
  pids=$(lsof -ti tcp:$p 2>/dev/null || true)
  if [ -n "$pids" ]; then
    echo "Killing PIDs: $pids on port $p"
    kill -9 $pids || true
  fi
done

echo "Done."
