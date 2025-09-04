FROM node:18-bullseye

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]