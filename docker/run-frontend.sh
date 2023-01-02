#!/bin/bash

COMMIT=$(git rev-parse --verify HEAD)

docker run -d \
-p 3001:80 \
-e API_BASE_URL="http://localhost:3000" \
--network=guess-network \
public.ecr.aws/q3b8h4t9/guessthename_frontend:$COMMIT
