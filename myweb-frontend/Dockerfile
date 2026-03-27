# ── Stage 1: React 빌드 ───────────────────────────────
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

# ── Stage 2: 정적 파일 서빙 (serve) ───────────────────
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist .

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
