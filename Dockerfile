# DOWNLOAD THE NODE IMAGE
FROM node:22.0.0-alpine

LABEL authors="mahery"

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]
