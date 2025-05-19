package com.example.demo.security;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private RestTemplate restTemplate;

    @PostConstruct
    public void init() {
        // Debug en consola
        System.out.println("CustomAuthenticationSuccessHandler bean creado y listo");
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        String username = authentication.getName();

        String webhookUrl = "https://moisesruizs.app.n8n.cloud/webhook/6bb551f6-7524-4c14-8179-57f91085f55d";

        Map<String, Object> body = new HashMap<>();
        body.put("evento", "login");
        body.put("usuario", username);
        body.put("fecha", LocalDateTime.now().toString());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        try {
            var responseEntity = restTemplate.postForEntity(webhookUrl, requestEntity, String.class);
            System.out.println("Respuesta del webhook: " + responseEntity.getStatusCode());
            System.out.println("Body: " + responseEntity.getBody());
        } catch (Exception e) {
            System.err.println("Error al enviar al webhook n8n:");
            e.printStackTrace();
        }

        // Redirigir después del login
        response.sendRedirect("/dashboard");
    }
}
