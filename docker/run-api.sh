#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

docker run -d \
-p 3000:3000 \
-e MONGO_DB_URI="mongodb://guess-mongo/api" \
--network=guess-network \
public.ecr.aws/q3b8h4t9/guessthename_api:$COMMIT
