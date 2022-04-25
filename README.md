# Guess the name
Guess the name of a child or pet to be named.

## Prerequisites

### Install
Git - Ubuntu: sudo apt install git
DockerMachine - https://docs.docker.com/engine/install/ubuntu/
DockerCompose - https://docs.docker.com/compose/install/
Npm - Ubuntu: sudo apt install npm

## Starting the application
- minikube start
- minikube addons enable ingress
- kubectl get pods -n ingress-nginx (verify you have ingress)
- ./build-and-deploy.sh (you will need to login to dockerhub)
- kubectl get ingress
- Navigate to the url in a browser

## Useful commands

### Base64 Encode
- echo -n 'username' | base64
- echo -n 'password' | base64

### Kubernetes dashboard in minikube
- minikube tunnel
- minikube service --url mongo-express-service
- minikube service mongo-express-service
- Note that without minikube tunnel, kubernetes would be showing external IP as "pending".
- https://minikube.sigs.k8s.io/docs/handbook/accessing/

## TODO

- Debug service locally with a reverse proxy
- Use persistent volume for mongo
- Run nodejs with prod builds
- Configure the name to guess
