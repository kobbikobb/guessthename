#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)
echo "Pushing guessthename_api to dockerhub #$COMMIT"

docker push kobbikobb/guessthename_api:$COMMIT
