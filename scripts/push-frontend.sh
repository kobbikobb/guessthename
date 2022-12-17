#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)
echo "Pushing guessthename_frontend image and latest to dockerhub #$COMMIT"

docker push kobbikobb/guessthename_frontend:$COMMIT
docker push kobbikobb/guessthename_frontend:latest
