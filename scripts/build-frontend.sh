#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

echo "Build guessthename_frontend #$COMMIT and latest"

cd frontend
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_frontend" \
  -t "kobbikobb/guessthename_frontend:${COMMIT}" \
  -t "kobbikobb/guessthename_frontend:latest"
cd ..
