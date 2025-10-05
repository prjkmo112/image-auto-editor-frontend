FROM node:20-alpine AS build
WORKDIR /app

COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

ENV REST_API_URL=your_api_url_here
ENV IMG_SERVER_URL=your_img_server_url_here

COPY --from=build /app/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]