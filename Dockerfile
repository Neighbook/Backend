FROM node:18.13.0-alpine
WORKDIR /app
COPY package.json /app
COPY tsconfig.json /app
COPY tsconfig.build.json /app
RUN mkdir -p /app/src
COPY /src /app/src
RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]