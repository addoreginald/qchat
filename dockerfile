FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY dist /usr/src/app

EXPOSE 3000
# RUN apk --no-cache add --virtual builds-deps build-base python
# RUN apk add --virtual builds-deps build-base python

RUN npm install --only=production

CMD [ "node", "/usr/src/app/main.js" ]