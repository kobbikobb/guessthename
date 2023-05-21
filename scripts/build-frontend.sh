#!/bin/bash

source scripts/variables.sh

echo "Build guessthename_frontend #$COMMIT and latest"

cd frontend
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_frontend" \
  -t "$REGISTRY_BASE_PATH/guessthename_frontend:${COMMIT}" \
  -t "$REGISTRY_BASE_PATH/guessthename_frontend:latest"
cd ..
