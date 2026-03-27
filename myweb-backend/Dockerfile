# ── Stage 1: Gradle 빌드 ──────────────────────────────
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# 의존성 캐시를 위해 gradle 설정 파일 먼저 복사
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

RUN chmod +x gradlew

# 소스 복사 후 JAR 빌드 (테스트 제외)
COPY src src
RUN ./gradlew bootJar -x test

# ── Stage 2: 실행 이미지 (JRE만 포함, 용량 최소화) ────
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
