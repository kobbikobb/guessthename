# Stage 1: Build image
FROM node:16-alpine3.12 as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

Run npm install
RUN npm install typescript -g
RUN npm install -g webpack
RUN npm install -g webpack-cli
RUN npm install -g html-webpack-plugin

COPY . .

ARG REACT_APP_API_BASE_URL
RUN sh create-env-file.sh REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

#Stage 2: Prod image
FROM nginx:1.21

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
COPY --from=build /app/src/images ./images

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 80
