package com.tasks.config;


import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class EnvConfig {


    private Environment environment;

    public String getJwtSecret() {
        return environment.getProperty("JWT_SECRET");
    }

    public String getDbHost() {
        return environment.getProperty("DB_HOST");
    }

    public String getDbPassword() {
        return environment.getProperty("DB_PASSWORD");
    }

    public void printAllConfig() {
        System.out.println("JWT Secret: " + environment.getProperty("JWT_SECRET"));
        System.out.println("Docker DB Host: " + environment.getProperty("DOCKER_DB_HOST"));
        System.out.println("DB Host: " + environment.getProperty("DB_HOST"));
        System.out.println("DB Port: " + environment.getProperty("DB_PORT"));
        System.out.println("DB Name: " + environment.getProperty("DB_NAME"));
        System.out.println("DB User: " + environment.getProperty("DB_USER"));
        // Don't print password in production!
    }
}
