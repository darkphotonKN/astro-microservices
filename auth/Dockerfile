FROM node:alpine 

WORKDIR /app
# copy over only the json file first
COPY package.json . 
# install all npm packages
RUN npm install
# then copy over the rest of the files
COPY . .

CMD ["npm", "run", "server"]