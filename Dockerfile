###################
# BUILD FOR LOCAL DEVELOPMENT
###################
## --platform=linux/amd64 is for M1 MACS
## --platform=linux/x86-64 is probably for anything else :P.
FROM node:18-alpine As development

RUN apk --no-cache add build-base

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

# Install app dependencies using the `npm ci` command instead of `npm install`
RUN npm ci --force

# Bundle app source
COPY --chown=node:node src/server .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

#FROM node:18-alpine As build
FROM node:18-alpine As production

RUN apk --no-cache add build-base

ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

WORKDIR /usr/src/app

USER node

COPY --chown=node:node package*.json ./
COPY --chown=node:node src/server .
RUN echo $(ls -1)

# Set NODE_ENV environment variable
ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force
RUN npm run build

RUN echo $(ls -1)

COPY --chown=node:node /usr/src/app/dist ./dist
COPY --chown=node:node /usr/src/app/node_modules ./node_modules

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
