FROM node:alpine

RUN mkdir -p /root/src/api

WORKDIR /root/src/api

COPY . .

RUN apk add --no-cache --virtual deps \
  python \
  build-base \
  && npm install \
  && apk del deps


EXPOSE 3000

ENTRYPOINT ["npm","start"]