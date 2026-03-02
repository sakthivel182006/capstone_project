package com.example.backend.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gamingOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Gaming App API")
                        .description("Spring Boot + MongoDB Gaming Backend")
                        .version("1.0"));
    }
}