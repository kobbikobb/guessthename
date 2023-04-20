# Guess the name
Guess the name of a child or pet to be named.

## Prerequisites

### Install
DockerMachine - https://docs.docker.com/engine/install/
DockerCompose - https://docs.docker.com/compose/install/
Git - Ubuntu: sudo apt install git
Npm - Ubuntu: sudo apt install npm
Minikube - https://minikube.sigs.k8s.io/docs/start/

### For Mac
Hyperkit - https://minikube.sigs.k8s.io/docs/drivers/hyperkit/
Grep - brew install grep - PATH="/usr/local/opt/grep/libexec/gnubin:$PATH"

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

## Debugging services inside the cluster

### Prerequisites
- Install Telepresence: https://www.telepresence.io/docs/latest/install/
- How to intercept: https://www.telepresence.io/docs/latest/howtos/intercepts/
- telepresence connect
- curl -ik https://kubernetes.default
- telepresence list (find the service you want to intercept)

### Connect api
- telepresence intercept api --port 3000 --env-file ~/backend-service-intercept.env
- source ./scripts/telepresence-source-backend.sh
- From api run: npm run dev

### Connect frontend
- telepresence intercept frontend --port 3001 --env-file ~/frontend-service-intercept.env
- From frontend run: npm run dev

### Docker compose
- docker-compose up --build
- docker-compose --file docker-compose-explicit.yaml up

### Build locally
See: https://minikube.sigs.k8s.io/docs/handbook/registry/
minikube addons enable registry
docker run --rm -it --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000"
export REGISTRY_BASE_PATH=localhost:5000

### Useful
- telepresence leave service-name
- Useful when intercept is not working: telepresence uninstall --everything
- Useful when intercept is not working: hard refresh
- Images are tagged with commit ID, add a commit before building and deploying

## TODO
- Configure the name to guess (draft in https://excalidraw.com/)
- Deploy frontend without webpack on nginx
- Capture logging
- host: guessthename.com
- Stop building latest, use only by commit
- Should npm run dev from frontend open up nginx?
- Test teleprecense experience