FROM node:latest

RUN mkdir -p /home/app 

COPY . /home/app 

WORKDIR /home/app

EXPOSE 8080

CMD ["npm", "run" ,"start:dev"]