#!/bin/bash

source scripts/variables.sh

echo "Build guessthename_api #$COMMIT and latest"

cd api
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_api" \
  -t "$ECR_BASE_PATH/guessthename_api:${COMMIT}" \
  -t "$ECR_BASE_PATH/guessthename_api:latest"
cd ..
