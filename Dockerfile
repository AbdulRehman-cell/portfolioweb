FROM node:18.18.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

FROM node:18.18.0-slim
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000

CMD ["npm", "start"]