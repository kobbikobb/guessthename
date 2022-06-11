#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

docker run -d \
-p 3001:80 \
-e REACT_APP_API_BASE_URL="http://localhost:3005" \
--network=guess-network \
kobbikobb/guessthename_frontend:$COMMIT