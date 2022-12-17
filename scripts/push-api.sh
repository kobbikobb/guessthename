#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)
echo "Pushing guessthename_api and latest to dockerhub #$COMMIT"

docker push kobbikobb/guessthename_api:$COMMIT
docker push kobbikobb/guessthename_api:latest
