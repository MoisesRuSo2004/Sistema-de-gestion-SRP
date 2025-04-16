package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.service.AdminService;

@Configuration
public class DataInitializer {

    @Autowired
    private AdminService adminService;

    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Inicializar el administrador por defecto si no existe
            adminService.inicializarAdminPorDefecto();
        };
    }
}