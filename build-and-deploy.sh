#!/bin/bash

./scripts/build-api.sh
./scripts/build-frontend.sh

./scripts/docker-login.sh
./scripts/push-backend.sh
./scripts/push-frontend.sh

./k8s/deploy.sh
