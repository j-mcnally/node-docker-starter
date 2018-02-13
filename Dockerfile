FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY app src/app
COPY .babelrc src/
COPY app.js src/
COPY package.json src/
COPY pm2.json .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR src
RUN npm install --production
RUN npm install -g babel-cli
RUN rm -rf ../dist && mkdir ../dist && babel -d ../dist/app app && babel -o ../dist/app.js app.js && cp -R node_modules ../dist/node_modules
WORKDIR / 
RUN rm -rf src
# Show current folder structure in logs
#RUN ls -al -R

ENTRYPOINT [ "pm2-runtime", "start", "pm2.json" ]