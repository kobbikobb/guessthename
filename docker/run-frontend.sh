#!/bin/bash

source scripts/variables.sh

docker run -d \
-p 3001:80 \
-e API_BASE_URL="http://localhost:3000" \
--network=guess-network \
"$REGISTRY_BASE_PATH/guessthename_frontend:${COMMIT}" 
