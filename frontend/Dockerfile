FROM node:16-alpine3.12

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY . ./

CMD [ "npm", "run", "build" ]

EXPOSE 3001

CMD [ "npm", "run", "start" ]
