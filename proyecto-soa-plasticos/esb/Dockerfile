FROM maven:3.9-eclipse-temurin-17 AS build

WORKDIR /esb

# POM mínimo para Camel standalone con Jetty y HTTP
COPY pom.xml .
RUN mvn dependency:resolve -q

COPY . .
RUN mvn package -DskipTests -q

# ── Runtime ──────────────────────────────────────────────────
FROM eclipse-temurin:17-jre-alpine
WORKDIR /esb
COPY --from=build /esb/target/soa-esb-1.0.jar app.jar
COPY routes.xml .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
