# Guess the name
Guess the name of a child or pet to be named.

## Prerequisites

### Install
Git - Ubuntu: sudo apt install git
DockerMachine - https://docs.docker.com/engine/install/ubuntu/
DockerCompose - https://docs.docker.com/compose/install/
Npm - Ubuntu: sudo apt install npm

## Run the application
- Make sure docker is installed and running
- Run: docker-compose up --build
- Navigate to: http://localhost:8080/

## Base64 Encode
echo -n 'username' | base64
echo -n 'password' | base64

## Commands
minikube service mongo-express-service
- Note that without minikube tunnel, kubernetes would be showing external IP as “pending”.
- minikube tunnel
- minikube service --url mongo-express-service
- https://minikube.sigs.k8s.io/docs/handbook/accessing/
minikube dashboard

## TODO

- Move to Kubernetes
- Add Nginx
- Debug service locally

## Next:

- Build and use image of commit only
- Run nodejs with prod builds
- Use persistent volume for mongo