FROM node:current-alpine3.19 AS build

WORKDIR /build

COPY package.json package-lock.json  ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:mainline-alpine3.18-slim

COPY --from=build /build/dist /usr/share/nginx/html
