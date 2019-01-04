FROM node:10.15

WORKDIR /home/node/frontend

COPY package*.json ./

RUN chown node:node .

USER node

RUN npm install --quiet
