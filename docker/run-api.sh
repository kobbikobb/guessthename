#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

docker run -d \
-p 3000:3000 \
-e MONGO_DB_URI="mongodb://guess-mongo/api" \
--network=guess-network \
kobbikobb/guessthename_api:$COMMIT
