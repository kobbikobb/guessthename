# Debugging with Telepresence

## Install
- https://www.telepresence.io/docs/latest/install/

## Useful
- How to intercept: https://www.telepresence.io/docs/latest/howtos/intercepts/
- telepresence connect
- curl -ik https://kubernetes.default
- telepresence list (find the service you want to intercept)
- telepresence leave service-name
- Useful when intercept is not working:
    - telepresence uninstall --everything
    - hard refresh

## Connect to the Api
- telepresence intercept api --port 3000 --env-file ~/backend-service-intercept.env
- source ./scripts/telepresence-source-backend.sh
- From api run: npm run dev

## Connect to the Frontend
- telepresence intercept frontend --port 3001 --env-file ~/frontend-service-intercept.env
- From frontend run: npm run dev
