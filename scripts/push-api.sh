#!/bin/bash

source scripts/variables.sh

echo "Pushing guessthename_api and latest #$COMMIT"

docker push $REGISTRY_BASE_PATH/guessthename_api:$COMMIT
docker push $REGISTRY_BASE_PATH/guessthename_api:latest