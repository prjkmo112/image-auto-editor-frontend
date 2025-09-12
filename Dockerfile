FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html

ENV REST_API_URL=http://localhost:3000

COPY --from=build /app/dist /usr/share/nginx/html
RUN envsubst < /usr/share/nginx/html/config.template.js > /usr/share/nginx/html/config.js