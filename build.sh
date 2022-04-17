#!/bin/bash

# See: https://www.bluematador.com/blog/building-and-deploying-to-kubernetes

COMMIT=$(git rev-parse --verify HEAD)
echo "Tagging images with commit #$COMMIT"

echo "Build guessthename_api"
cd api
docker image build -f "Dockerfile" . \
  --build-arg "app_name=guessthename_api" \
  -t "kobbikobb/guessthename_api:latest" \
  -t "kobbikobb/guessthename_api:${COMMIT}"

echo "Pushing images to dockerhub"
docker login 
docker push kobbikobb/guessthename_api --all-tags
echo "Pushed all images to dockerhub"