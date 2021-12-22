FROM node:16-alpine3.12

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
RUN npm install

COPY . ./

CMD [ "npm", "run", "dev" ]

EXPOSE 3000