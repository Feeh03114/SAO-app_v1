FROM node:18.16.0-alpine
ENV PORT=80
EXPOSE 80
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn && yarn cache clean --force
COPY . .
RUN yarn build
COPY . .
ENV NODE_ENV=production
CMD [ \"yarn\", \"start\" ]

