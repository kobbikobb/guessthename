#!/bin/bash

source scripts/variables.sh

echo "Pushing guessthename_api and latest #$COMMIT"

docker push $ECR_BASE_PATH/guessthename_api:$COMMIT
docker push $ECR_BASE_PATH/guessthename_api:latest
