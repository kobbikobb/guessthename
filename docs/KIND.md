# Run with Kind

## Install

- Kind: Rancher-Desktop: https://rancherdesktop.io/

## Set up the cluster

- kind create cluster
- ./k8s/deploy.sh
- kubectl apply -f https://kind.sigs.k8s.io/examples/ingress/deploy-ingress-nginx.yaml
- kubectl port-forward --namespace=ingress-nginx service/ingress-nginx-controller 8080:80
