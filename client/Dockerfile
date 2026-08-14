FROM node:24

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]