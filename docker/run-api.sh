#!/bin/bash

source scripts/variables.sh

docker run -d \
-p 3000:3000 \
-e MONGO_DB_URI="mongodb://guess-mongo/api" \
--network=guess-network \
"$REGISTRY_BASE_PATH/guessthename_api:${COMMIT}" 
