#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)
echo "Pushing frontend image to dockerhub #$COMMIT"

docker push kobbikobb/guessthename_frontend:$COMMIT

echo "Pushed frontend to dockerhub"
