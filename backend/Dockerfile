# Use official OpenJDK image
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Build the project
RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

# Expose Render dynamic port
EXPOSE 8080

# Run the jar file
CMD ["sh", "-c", "java -jar target/*.jar --server.port=${PORT}"]