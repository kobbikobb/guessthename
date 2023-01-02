#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

echo "Build guessthename_api #$COMMIT and latest"

cd api
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_api" \
  -t "$ECR_REGISTRY/guessthename_api:${COMMIT}" \
  -t "$ECR_REGISTRY/guessthename_api:latest"
cd ..

echo "Image guessthename_api #$COMMIT and latest built"
