# CI에서 미리 빌드된 dist를 복사만 함 (npm build 없음)
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY dist .

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]
