FROM openjdk:17-jdk-slim

WORKDIR /app


COPY target/*.jar app.jar
COPY .env .env

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]