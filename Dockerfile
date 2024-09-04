#use node 16 image
FROM node:16

#set the working file path
WORKDIR /usr/src/app

#copy package.json and package-lock.json into /usr/src/app
COPY package*.json /usr/src/app

#run npm install
RUN npm install

#copy everything to /usr/src/app
COPY . .

#exposes the container port
EXPOSE 3000

#run the script
CMD ["npm", "run", "dev"]
