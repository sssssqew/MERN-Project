FROM node:lts-slim as builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app

ARG REACT_PORT
EXPOSE ${REACT_PORT}

# development
# CMD ["npm", "start"]

# production
# CMD는 도커 이미지를 만든후 도커 컨테이너가 실행될때 함께 실행됨
# RUN은 리액트 이미지가 만들어질때 함께 실행됨
# Nginx 도커 이미지가 생성될때 리액트의 빌드 파일들이 필요하므로 CMD가 아니라 RUN으로 실행해야함
# docker-compose.yml의 depends_on 옵션 때문에 리액트 이미지가 먼저 생성되므로 
# 이때 리액트 빌드파일이 생성되어야 Nginx 이미지가 생성되는 시점에 빌드파일을 nginx.conf 에서 사용할 수 있음
RUN ["npm", "run", "build"] 
