FROM node:14

RUN mkdir /usr/app
COPY . /usr/app
WORKDIR /usr/app
RUN npm install
CMD ["node", "orig.js"]
