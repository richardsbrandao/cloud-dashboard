FROM node:latest
LABEL name=RichardBrandao

WORKDIR /app
RUN npm install

ADD . /app

EXPOSE 3000
CMD ["npm", "start"]