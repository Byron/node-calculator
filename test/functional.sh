#!/bin/bash
set -e

CLI=./bin/cli

if [[ `$CLI 1 + 1` != 2 ]]; then
  echo "success is no failure"
  exit 1
fi

if $CLI 1 noop 1 >/dev/null 2>&1; then
  echo "errors cause failure"
  exit 1
fi

exit 0