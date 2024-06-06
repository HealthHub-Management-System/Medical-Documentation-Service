FROM node:20-bullseye-slim

WORKDIR /app

COPY package.json .

RUN npm install


COPY . .

CMD ["next", "build", "&&", "next", "start"]

