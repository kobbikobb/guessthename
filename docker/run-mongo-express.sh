#!/bin/bash

docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_SERVER=guess-mongo \
--network=guess-network \
--name guess-mongo-express mongo-express