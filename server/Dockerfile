FROM node:24

WORKDIR /app

COPY package*.json ./

# ci -> clean install(it will install dependecies listed in package-lock.json)
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 8000

CMD [ "node", "dist/server.js" ]