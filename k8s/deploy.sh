#!/bin/bash

cd k8s

COMMIT=$(git rev-parse --verify HEAD)
echo "Fetching images with commit #$COMMIT"

kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo-configmap.yaml
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongo.yaml
kubectl apply -f mongo-express.yaml
kubectl apply -f worker.yaml
cat api.yaml | sed "s/{{COMMIT}}/$COMMIT/g" | kubectl apply -f-
cat frontend.yaml | sed "s/{{COMMIT}}/$COMMIT/g" | kubectl apply -f-
kubectl apply -f ingress-service.yaml
