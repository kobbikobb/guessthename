#!/bin/bash

cd k8s

kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo-configmap.yaml
kubectl apply -f mongo.yaml
kubectl apply -f mongo-express.yaml
kubectl apply -f api.yaml

# minikube service mongo-express-service