FROM node:18

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

RUN npm install -g @nestjs/cli
RUN npm run build

CMD [ "npm", "run", "start" ]