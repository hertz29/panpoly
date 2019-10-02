FROM node:10

WORKDIR /usr/src/scheduler/

COPY package*.json ./

RUN npm install
COPY . . 

EXPOSE 9000

CMD ["npm" ,"start"]
