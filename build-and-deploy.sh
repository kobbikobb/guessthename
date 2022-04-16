#!/bin/bash

./build/build.sh
./build/push.sh
./k8s/deploy.sh
