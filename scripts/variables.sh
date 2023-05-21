#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)
echo "Commit #$COMMIT"

if [ -z "${REGISTRY_BASE_PATH+x}" ]; then
  export REGISTRY_BASE_PATH="public.ecr.aws/q3b8h4t9"
else
  export REGISTRY_BASE_PATH="$REGISTRY_BASE_PATH"
fi
echo "REGISTRY_BASE_PATH: $REGISTRY_BASE_PATH"
