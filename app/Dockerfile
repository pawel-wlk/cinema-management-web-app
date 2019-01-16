FROM node:8-alpine
RUN apk update && apk upgrade && \
    apk add --no-cache python make g++

RUN apk add mysql-client
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "."]
