FROM node:12-alpine

RUN npm i -g nodemon

RUN mkdir /mcq

WORKDIR /mcq

COPY package.json /mcq

COPY package-lock.json /mcq

RUN npm i

COPY . /mcq

EXPOSE 4000

CMD ["npm", "start"]