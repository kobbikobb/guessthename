#!/bin/bash

source scripts/variables.sh

echo "Pushing guessthename_frontend image and latest #$COMMIT"

docker push $ECR_BASE_PATH/guessthename_frontend:$COMMIT
docker push $ECR_BASE_PATH/guessthename_frontend:latest
