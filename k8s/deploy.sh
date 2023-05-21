#!/bin/bash

cd k8s

COMMIT=$(git rev-parse --verify HEAD)
echo "Commit #$COMMIT"

if [ -z "${REGISTRY_BASE_PATH+x}" ]; then
  export REGISTRY_BASE_PATH="public.ecr.aws/q3b8h4t9"
else
  export REGISTRY_BASE_PATH="$REGISTRY_BASE_PATH"
fi
echo "REGISTRY_BASE_PATH: $REGISTRY_BASE_PATH"

kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo-configmap.yaml
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongo.yaml
kubectl apply -f mongo-express.yaml

cat api.yaml | sed "s/{{COMMIT}}/$COMMIT/g" | sed "s/{{REGISTRY_BASE_PATH}}/$REGISTRY_BASE_PATH/g" | kubectl apply -f-
cat frontend.yaml | sed "s/{{COMMIT}}/$COMMIT/g" | sed "s/{{REGISTRY_BASE_PATH}}/$REGISTRY_BASE_PATH/g" | kubectl apply -f-
cat worker.yaml | sed "s/{{COMMIT}}/$COMMIT/g" | sed "s/{{REGISTRY_BASE_PATH}}/$REGISTRY_BASE_PATH/g" | kubectl apply -f-

kubectl apply -f ingress-service.yaml
