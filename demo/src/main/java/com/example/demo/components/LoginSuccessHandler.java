package com.example.demo.components;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.example.demo.service.NotificacionService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final NotificacionService notificacionService;

    public LoginSuccessHandler(NotificacionService notificacionService) {
        this.notificacionService = notificacionService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        String username = authentication.getName(); // Obtiene el nombre del usuario logueado

        // Llama al webhook a través del servicio
        notificacionService.notificarLogin(username);

        // Redirige al home o dashboard
        response.sendRedirect("/"); // Puedes cambiar "/" por otra URL si lo necesitas
    }

}
