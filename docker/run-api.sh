#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

docker run -d \
-p 3000:3000 \
-e MONGODB_SERVER_URI="mongodb://guess-mongo" \
--network=guess-network \
kobbikobb/guessthename_api:$COMMIT
