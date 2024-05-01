# Run with Minikube 

## Install
- Minikube: https://minikube.sigs.k8s.io/docs/start/

## Commands
- minikube start    
- minikube addons enable ingress
- kubectl get pods -n ingress-nginx (verify you have ingress)
- Deploy the code 
- kubectl get ingress
- Navigate to localhost:port in the browser

## Build locally
- See: https://minikube.sigs.k8s.io/docs/handbook/registry/
- minikube addons enable registry
- docker run --rm -it --network=host alpine ash -c "apk add socat && socat TCP-LISTEN:5000,reuseaddr,fork TCP:$(minikube ip):5000"
- export REGISTRY_BASE_PATH=localhost:5000

## Mongo Express
- minikube tunnel
- minikube service --url mongo-express-service
- minikube service mongo-express-service
- Note that without minikube tunnel, kubernetes would be showing external IP as "pending".
- https://minikube.sigs.k8s.io/docs/handbook/accessing/
