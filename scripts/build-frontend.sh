#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

echo "Build guessthename_frontend #$COMMIT and latest"

cd frontend
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_frontend" \
  -t "$ECR_REGISTRY/guessthename_frontend:${COMMIT}" \
  -t "$ECR_REGISTRY/guessthename_frontend:latest"
cd ..

echo "Image guessthename_frontend #$COMMIT and latest built"
echo "Nice!"