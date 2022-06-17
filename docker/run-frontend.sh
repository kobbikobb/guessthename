#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

docker run -d \
-p 3001:80 \
-e API_BASE_URL="http://localhost:3001" \
--network=guess-network \
kobbikobb/guessthename_frontend:$COMMIT
