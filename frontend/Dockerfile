FROM node:22-bullseye-slim

WORKDIR /app
RUN apt-get update && apt-get install -y curl

COPY package.json .

RUN npm install


COPY . .

CMD ["npm", "run", "dev"]

