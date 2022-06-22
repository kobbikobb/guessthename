#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)
echo "Pushing backend image to dockerhub #$COMMIT"

docker push kobbikobb/guessthename_api:$COMMIT

echo "Pushed backend to dockerhub"
