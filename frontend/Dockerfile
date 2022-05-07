# Stage 1: Build image
FROM node:16-alpine3.12 as build

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
Run npm install --production

COPY . .
Run npm run build

#Stage 2: Prod image
FROM nginx:1.21

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist .
COPY --from=build /app/src/images ./images

ENTRYPOINT ["nginx", "-g", "daemon off;"]

EXPOSE 80
