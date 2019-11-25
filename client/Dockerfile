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
# RUN으로 실행하면 dist 폴더가 생성되지 않고 제대로 빌드되지 않음
# 아마도 컨테이너 내부에 dist폴더가 생성되지만 nginx 컨테이너에서 접근하지 못하는것 같음
CMD ["npm", "run", "build"]  
