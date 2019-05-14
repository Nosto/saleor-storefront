FROM node:10

RUN apt-get -y update \
  && apt-cache search libgl |egrep '^libgl[^a-z]'\
  && apt-get install -y gettext \
  && apt-get install -y libgl1-mesa-glx\
  && apt-get install build-essential\
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app && chown -R node:node /app

COPY . /app
WORKDIR /app
RUN npm install -g serve
USER node
RUN npm install
RUN npm run-script build
COPY --chown=node:node . .

EXPOSE 5000
CMD [ "serve", "-s", "dist" ]
