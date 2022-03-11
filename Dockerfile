# base image
FROM node:16 AS BUILD_IMAGE

# set working directory
WORKDIR /app

# install angular cli
RUN npm install -g @angular/cli@13.2.0

# clone & install deps for repo
ARG branch=master
ARG node_snapshots_explorer_git="https://github.com/tezedge/tezedge-snapshots-explorer"
RUN git clone ${node_snapshots_explorer_git} && \
    cd tezedge-snapshots-explorer && \
    git checkout ${branch} && \
    npm install

# change dir to angular app
WORKDIR /app/tezedge-snapshots-explorer

# buid app
RUN ng build --configuration production --output-path=/dist

# remove development dependencies
RUN npm prune --production

################
# Run in NGINX #
################
FROM nginx:alpine
COPY --from=BUILD_IMAGE /dist /usr/share/nginx/html

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env/env.template.js > /usr/share/nginx/html/assets/env/env.js && exec nginx -g 'daemon off;'"]

# Example of how to run
# docker run --env API='{ api: "http://162.55.241.136" }' -p 8080:80 tezedge-snapshots-explorer:latest
