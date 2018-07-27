FROM node:8 as build

COPY . /app
WORKDIR /app

RUN npm install && npm run build:dist

FROM nginx:stable-alpine

COPY --from=build /app/built/ /usr/share/nginx/html/
COPY --from=build /app/images/ /usr/share/nginx/html/images

