#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)
echo "Pushing the image $ECR_REGISTRY/guessthename_api:$COMMIT"

docker push $ECR_REGISTRY/guessthename_api:$COMMIT
docker push $ECR_REGISTRY/guessthename_api:latest

echo "Image pushed $ECR_REGISTRY/guessthename_api:$COMMIT"
