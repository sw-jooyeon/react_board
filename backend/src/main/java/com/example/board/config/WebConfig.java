package com.example.board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
  
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // "file:///C:/Users/USER/board/backend/uploads/" 경로의 파일들을 "/uploads/**" URL 패턴으로 제공
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:///C:/Users/USER/board/backend/uploads/");
    }
}
