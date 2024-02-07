#!/bin/bash

source scripts/variables.sh

echo "Build guessthename_worker #$COMMIT and latest"

cd worker
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_worker" \
  -t "$REGISTRY_BASE_PATH/guessthename_worker:${COMMIT}" \
  -t "$REGISTRY_BASE_PATH/guessthename_worker:latest"
cd ..
