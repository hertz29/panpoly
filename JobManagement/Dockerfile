FROM node:10

WORKDIR /usr/src/JobManagment/

COPY package*.json ./

RUN npm install --save express

COPY . . 

EXPOSE 5000

CMD ["npm" ,"start"]
