FROM node:18.13.0

WORKDIR /financial-manager/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "node", "dist/main" ]
