FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

# Switch to user
USER 1000:1000

CMD ["npm", "run", "start:dev"]