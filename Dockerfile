FROM node:20 as build

WORKDIR .

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20
COPY --from=build ./dist .
COPY --from=build ./node_modules ./node_modules
CMD [ "node", "main" ]