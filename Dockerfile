FROM node:18-alpine AS builder

WORKDIR /app

ARG VITE_KAKAO_CLIENT_ID
ARG VITE_GITHUB_CLIENT_ID

ENV VITE_KAKAO_CLIENT_ID=${VITE_KAKAO_CLIENT_ID}
ENV VITE_GITHUB_CLIENT_ID=${VITE_GITHUB_CLIENT_ID}

COPY package*.json ./

COPY tsconfig.json tsconfig.app.json tsconfig.node.json ./

RUN npm install -g typescript

# 개발 의존성 패키지들도 설치
RUN npm ci

COPY . .

RUN npm run build

FROM alpine:latest

COPY --from=builder /app/dist /dist
