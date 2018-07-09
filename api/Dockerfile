FROM node:latest
LABEL name=RichardBrandao

ADD dist /app/dist
ADD node_modules /app/dist/node_modules

WORKDIR /app/dist

EXPOSE 3100
CMD ["node", "index.js"]