#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

echo "Build guessthename_api with tag #$COMMIT"

cd api
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_api" \
  -t "kobbikobb/guessthename_api:${COMMIT}"
cd ..
