# Guess the name
Guess the name of a child or pet to be named.

## Prerequisites
- DockerMachine: https://docs.docker.com/engine/install/
- Grep: brew install grep (mac)

## Quick Start with Rancher Desktop and helm
- [Install Rancher Desktop](docs/RANCHER-DESKTOP.md)
- [Install the Helm Charts](https://helm.sh/docs/intro/install)
- [Install Ingress Controller and start port forwarding](docs/RANCHER-DESKTOP.md)
- Navigate to: http://localhost:8080/

## Host
- [Host on Rancher-Desktop](docs/RANCHER-DESKTOP.md)
- [Host on Minikube](docs/MINIKUBE.md)

## Deploy
- [Deploy with helm](docs/HELM.md)
- [Deploy with Docker-Compose(docs/DOCKER-COMPOSE.md)
- Deploy with a script: ./k8s/deploy.sh

## Debug
- [Debug with Telepresence](docs/TELEPRESENCE.md)

## Useful commands

### Base64 Encode
- echo -n 'username' | base64
- echo -n 'password' | base64

