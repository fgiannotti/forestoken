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

# RUN mkdir /usr/src/app/node_modules && chown -R 777 /usr/src/app/node_modules
# RUN npm ci --only=production --force
# RUN npm cache clean --force
RUN yarn install --production --force
RUN yarn add --dev eslint
COPY . .
RUN yarn build
RUN echo $(ls -1)
RUN pwd

# Set NODE_ENV environment variable (don't put this before install)
ENV NODE_ENV production

# Start the server using the production build
# CMD ["yarn", "start"]
CMD [ "node", "/usr/src/app/dist/main.js" ]
