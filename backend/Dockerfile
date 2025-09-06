FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache bash

FROM base AS deps
COPY package.json package-lock.json nest-cli.json tsconfig*.json ./
RUN npm ci

FROM base AS dev
ENV NODE_ENV=development
ENV CHOKIDAR_USERPOLLING=1
ENV WATCHPACK_POLLING=true
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["pnpm", "start:dev"]