FROM node

WORKDIR /app

COPY package*.json ./

RUN npm start

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm","run","dev"]