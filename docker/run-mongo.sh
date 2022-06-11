#!/bin/bash

docker run -d \
-p 27017:27017 \
--network=guess-network \
--name guess-mongo mongo