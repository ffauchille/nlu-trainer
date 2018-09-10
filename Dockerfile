FROM node:8 as build

COPY . /app
WORKDIR /app

ARG NLU_TRAINER_API=http://localhost:8001
ENV NLU_TRAINER_API ${NLU_TRAINER_API}

RUN npm install && npm run build:dist

FROM nginx:stable-alpine

COPY --from=build /app/built/ /usr/share/nginx/html/
COPY --from=build /app/images/ /usr/share/nginx/html/images
COPY --from=build /app/semantic/ /usr/share/nginx/html/semantic/
