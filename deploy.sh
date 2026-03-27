#!/bin/bash

echo "최신 이미지 pull 중..."
docker compose pull

echo "컨테이너 재시작 중..."
docker compose up -d

echo "완료! http://localhost:3000"
