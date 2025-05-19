package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NotificacionService {

    @Autowired
    private RestTemplate restTemplate;

    public void notificarLogin(String username) {
        String url = "https://moisesruizs.app.n8n.cloud/webhook-test/6bb551f6-7524-4c14-8179-57f91085f55d";

        Map<String, String> datos = new HashMap<>();
        datos.put("usuario", username);
        datos.put("evento", "login");

        try {
            String respuesta = restTemplate.postForObject(url, datos, String.class);
            System.out.println("Notificación enviada a n8n. Respuesta: " + respuesta);
        } catch (Exception e) {
            System.err.println("Error al notificar a n8n: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
