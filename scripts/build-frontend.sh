#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

echo "Build guessthename_frontend with tag #$COMMIT"

cd frontend
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_frontend" \
  -t "kobbikobb/guessthename_frontend:${COMMIT}"
cd ..
