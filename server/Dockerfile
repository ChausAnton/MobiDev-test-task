FROM node
WORKDIR /home/node/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "node", "app.js" ]

