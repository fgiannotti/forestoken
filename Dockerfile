FROM node:18-alpine

RUN apk --no-cache add build-base

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools
RUN echo $(ls -1)
WORKDIR /usr/src/app
RUN echo $(ls -1)
USER node

COPY --chown=node:node package*.json ./
RUN echo $(ls -1)
# Set NODE_ENV environment variable
ENV NODE_ENV production

RUN npm ci --only=production --force && npm cache clean --force
RUN npm run build && echo $(ls -1)

COPY --chown=node:node /usr/src/app/dist ./dist
COPY --chown=node:node /usr/src/app/node_modules ./node_modules

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
