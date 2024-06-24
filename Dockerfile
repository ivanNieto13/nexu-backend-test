FROM node:lts-alpine as base

RUN mkdir -p /app

WORKDIR /app

COPY ./ /app

RUN npm install

RUN npm run compile

FROM node:lts-alpine

RUN mkdir -p /app

WORKDIR /app

COPY --from=base /app/build /app
COPY --from=base /app/.env /app
COPY --from=base /app/node_modules /app/node_modules
COPY --from=base /app/package.json /app

RUN apk --update add tzdata
RUN cp /usr/share/zoneinfo/America/Mexico_City /etc/localtime
RUN echo 'America/Mexico_City' > /etc/timezone && apk del tzdata

EXPOSE 3000

ENTRYPOINT [ "npm", "run", "serve" ]
