FROM node:lts-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

ARG REACT_PORT
EXPOSE ${REACT_PORT}

# production
# CMD ["npm", "run", "build"]

# development
CMD ["npm", "start"]
