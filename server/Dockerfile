FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

ARG NODE_PORT
EXPOSE ${NODE_PORT}

#development
# CMD ["npm", "run", "dev"]

#production
CMD ["npm", "run", "prod"]
