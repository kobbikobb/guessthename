#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

echo "Build guessthename_api #$COMMIT and latest"

cd api
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_api" \
  -t "kobbikobb/guessthename_api:${COMMIT}" \
  -t "kobbikobb/guessthename_api:latest"
cd ..
