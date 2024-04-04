ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app
EXPOSE 3000

RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=.yarn,target=.yarn,rw \
    --mount=type=bind,source=.yarnrc.yml,target=.yarnrc.yml \
    --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=yarn.lock,target=yarn.lock \
    --mount=type=cache,target=/root/.yarn \
    --mount=type=cache,target=node_modules \
    yarn --immutable && \
    yarn bundle

USER node

CMD node dist/out.js
