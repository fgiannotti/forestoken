FROM node:18-alpine

RUN apk --no-cache add build-base

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN echo $(ls -1)
WORKDIR /usr/src/app
RUN echo $(ls -1)

COPY package.json ./
COPY yarn.lock ./
RUN echo $(ls -1)
# Set NODE_ENV environment variable
ENV NODE_ENV production

# RUN mkdir /usr/src/app/node_modules && chown -R 777 /usr/src/app/node_modules
# RUN npm ci --only=production --force
# RUN npm cache clean --force
RUN yarn install --production --force
COPY . .
RUN yarn add --dev eslint
RUN yarn build
RUN echo $(ls -1)


COPY /usr/src/app/dist ./dist
COPY /usr/src/app/next ./.next
RUN echo ./.next
COPY /usr/src/app/node_modules ./node_modules

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
