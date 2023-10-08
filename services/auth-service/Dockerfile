FROM node:18-alpine

# RUN npm install -g yarn

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
