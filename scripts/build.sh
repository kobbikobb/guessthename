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
  --build-arg "REACT_APP_API_BASE_URL=http://localhost:3000" \
  -t "kobbikobb/guessthename_frontend:${COMMIT}"

#   --build-arg "REACT_APP_API_BASE_URL=http://localhost:3000" \
  