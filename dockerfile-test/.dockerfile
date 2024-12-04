FROM node:22.11.0-alpine3.20 as build-stage

WORKDIR /app

# Docker 使用分层存储的机制来构建镜像,一条命令会创建一个镜像层，而镜像层会缓存
# 这里package.json 未修改时则不会执行install
COPY package.json .

RUN npm install

COPY . .

RUN pnpm build


FROM node:22.11.0-alpine3.20 as production-stage

# 只复制dist和package.json
COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN npm install

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "/app/main.js"]
