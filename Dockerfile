FROM node:6.7.0
MAINTAINER cleamnagata

RUN npm install webpack webpack-dev-server -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

RUN mkdir -p /var/www
WORKDIR /var/www
COPY . /var/www
RUN cp -a /tmp/node_modules /var/www/
VOLUME /var/www

EXPOSE 8080
CMD ["npm", "run", "start"]
