#!/bin/bash

./scripts/build.sh
./scripts/docker-login.sh
./scripts/push-backend.sh
./scripts/push-frontend.sh
./k8s/deploy.sh
