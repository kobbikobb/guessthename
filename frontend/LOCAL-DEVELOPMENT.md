# Local Development

## Start the API with a MonghDb
./docker/create-network.sh
./docker/run-mongo.sh
./docker/run-api.sh

## Update enviroment variable (.env)
API_BASE_URL=http://localhost:3000

## Run the api
npm run dev