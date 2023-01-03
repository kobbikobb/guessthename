# How to set up on EC2 (simple)

## Create a EC2 instance
- OS: Amazon Linux 2
- Type: t2.micro
- Allow SSh and Http Traffic
- User Data (install docker)
```
​​#!/bin/bash
yum update -y
amazon-linux-extras install docker -y
service docker start
systemctl enable docker
usermod -a -G docker ec2-user
```
- Launch instance with other defaults

## SSH into the machine to manually install images
```
docker network create -d bridge guess-network

docker run -d \
-p 27017:27017 \
--network=guess-network \
--name guess-mongo mongo

docker run -d \
-p 3000:3000 \
-e MONGO_DB_URI="mongodb://guess-mongo/api" \
--network=guess-network \
kobbikobb/guessthename_api:latest

docker run -d \
-p 3001:80 \
-e API_BASE_URL="http://54.75.123.20:3000" \
--network=guess-network \
kobbikobb/guessthename_frontend:latest

```