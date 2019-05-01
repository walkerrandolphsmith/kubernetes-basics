FROM node:8

WORKDIR /usr/local/www

COPY ./static ./static
COPY ./package.json ./
COPY ./server.js ./server.js

RUN npm install --no-progress --ignore-optional --silent

CMD ["npm", "run", "start"]