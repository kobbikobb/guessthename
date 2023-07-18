# Local Development

## Prerequisites
- Run Docker engine.
  - If you are using colima: `colima start`.

## Start the API with a MonghDb
- ../docker/create-network.sh
- ../docker/run-mongo.sh

## Set the environment variable
- export MONGO_DB_URI=mongodb://localhost/api

## Run the api
npm run dev

## Try the APIs (try Tunder Client)

GET http://localhost:3000/name-target
POST http://localhost:3000/name-target
{
  "userId": 123,
  "name": "Grimur",
  "title": "My sons name"
}
http://localhost:3000/guess
{
  "userId": 123,
  "name": "Grimur",
  "nameTargetId": "64b668c349c4b920fc565ea1"
}
http://localhost:3000/guess?nameTargetId=64b668c349c4b920fc565ea1