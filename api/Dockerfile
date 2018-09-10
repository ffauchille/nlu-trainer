FROM node:8 as build

LABEL maintainer "Florent FAUCHILLE <florentfauchille@gmail.com>"

COPY . /app
WORKDIR /app

ARG MONGO_URI=mongodb://localhost:27017
ARG MONGO_DB_NAME=nlutrainer
ARG RASA_ENDPOINT=http://localhost:5000
ARG HTTP_ALLOW_HEADERS="GET, OPTIONS, POST, DELETE"
ARG HTTP_ALLOW_ORIGINS="*"
ARG HTTP_EXPOSED_HEADERS="GET, OPTIONS, POST, DELETE"

ENV MONGO_URI=${MONGO_URI}
ENV MONGO_DB_NAME=${MONGO_DB_NAME}
ENV RASA_ENDPOINT=${RASA_ENDPOINT}
ENV HTTP_ALLOW_HEADERS=${HTTP_ALLOW_HEADERS}
ENV HTTP_ALLOW_ORIGINS=${HTTP_ALLOW_ORIGINS}
ENV HTTP_EXPOSED_HEADERS=${HTTP_EXPOSED_HEADERS}

RUN npm install && npm run build:dist

FROM node:8

RUN mkdir -p /app/data

WORKDIR /app

COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/built /app/built

CMD [ "node", "built/server.js" ]