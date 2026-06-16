package com.student.crt.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//to connect the frontend
@Configuration
public class WebConfig implements WebMvcConfigurer{
	@Override
	public void addCorsMappings(CorsRegistry registry) {
//		for our frontend addMapping("https://localhost:5137").allowedOrigins("*")
		registry.addMapping("/api/**").allowedOrigins("*")
				.allowedMethods("GET", "POST", "PUT", "DELETE")
				.allowedHeaders("*");
	}
}
