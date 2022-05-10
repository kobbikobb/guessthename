FROM node:16-alpine3.12

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install typescript -g
RUN npm install -g webpack

COPY . .

RUN npm run build

EXPOSE 3000

CMD npm run start


