FROM node:20

WORKDIR /usr/src

COPY . .

WORKDIR /usr/src/backend
RUN npm install
WORKDIR /usr/src/frontend
RUN npm install
WORKDIR /usr/src
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh

EXPOSE 8080
