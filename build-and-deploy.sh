#!/bin/bash

./scripts/build-api.sh
./scripts/build-frontend.sh
./scripts/build-worker.sh

./scripts/docker-login.sh
./scripts/push-api.sh
./scripts/push-frontend.sh
./scripts/push-worker.sh

./k8s/deploy.sh
