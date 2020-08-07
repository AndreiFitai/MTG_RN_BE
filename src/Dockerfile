# pull official base image
FROM node:current-alpine3.10

# Create app directory
WORKDIR /workdir/src

COPY package*.json ./

RUN npm install -g nodemon

RUN npm install

COPY . .

CMD [ "nodemon", "index.js" ]

EXPOSE 3000