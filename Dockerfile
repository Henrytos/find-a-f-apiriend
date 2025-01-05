FROM node:latest 

WORKDIR /src/app

COPY . .

RUN npm install


CMD ["npm", "run" ,"start:dev"]

EXPOSE 8080

