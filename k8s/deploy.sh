#!/bin/bash

cd k8s

kubectl apply -f mongo-secret.yaml
kubectl apply -f mongo-configmap.yaml
kubectl apply -f mongo-pvc.yaml
kubectl apply -f mongo.yaml
kubectl apply -f mongo-express.yaml
kubectl apply -f api.yaml
kubectl apply -f frontend.yaml
kubectl apply -f ingress-service.yaml
