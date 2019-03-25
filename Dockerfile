FROM node:10

RUN apt-get -y update \
  && apt-get install -y gettext \
  && apt-get install build-essential\
  # Cleanup apt cache
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app && chown -R node:node /app

COPY . /app
WORKDIR /app
ENV BACKEND_URL http://localhost:8000
RUN npm install -g serve
USER node
RUN npm install
RUN npm run-script build
COPY --chown=node:node . .

EXPOSE 5000
CMD [ "serve", "-s", "dist" ]
