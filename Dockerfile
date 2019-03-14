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
USER node
RUN npm install
COPY --chown=node:node . .

EXPOSE 8000
CMD [ "node", "start" ]
