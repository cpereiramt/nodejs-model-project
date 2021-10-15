FROM node:14.8.0-slim
WORKDIR /app
COPY package.json /app
COPY .env /app/
RUN npm install
COPY . /app
CMD ["npm", "start"]
EXPOSE 3001:9001