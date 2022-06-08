#!/bin/bash

# See: https://www.bluematador.com/blog/building-and-deploying-to-kubernetes

COMMIT=$(git rev-parse --verify HEAD)
echo "Tagging images with commit #$COMMIT"

echo "Build guessthename_api"
cd api
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_api" \
  -t "kobbikobb/guessthename_api:${COMMIT}"

cd ..

echo "Build guessthename_frontend"
cd frontend
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_frontend" \
  -t "kobbikobb/guessthename_frontend:${COMMIT}"
  