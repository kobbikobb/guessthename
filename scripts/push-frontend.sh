#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)
echo "Pushing the image $ECR_REGISTRY/guessthename_frontend:$COMMIT"

docker push $ECR_REGISTRY/guessthename_frontend:$COMMIT
docker push $ECR_REGISTRY/guessthename_frontend:latest

echo "Image pushed $ECR_REGISTRY/guessthename_frontend:$COMMIT"
