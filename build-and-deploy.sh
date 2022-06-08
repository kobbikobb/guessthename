#!/bin/bash

./scripts/build.sh
./scripts/push.sh
./k8s/deploy.sh
