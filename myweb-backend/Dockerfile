# CI에서 미리 빌드된 JAR을 복사만 함 (컴파일 없음)
FROM eclipse-temurin:17-jre-jammy

WORKDIR /app

COPY build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
