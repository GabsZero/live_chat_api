FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

RUN chown 1000:1000 -R .

# Switch to user
USER 1000:1000



CMD ["npm", "run", "start:dev"]