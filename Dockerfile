FROM node:18.4.0-alpine
WORKDIR /app
ENV POSTGRES_PASSWORD=postgress\
    POSTGRES_USER=postgress\
    POSTGRES_DB=postgress 

COPY package.json /app
COPY tsconfig.json /app
COPY tsconfig.build.json /app
RUN mkdir -p /app/src
RUN mkdir -p /app/dist
COPY /src /app/src
RUN yarn install

EXPOSE 3000

CMD ["yarn", "dev"]