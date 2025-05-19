package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.DashboardDTO;
import com.example.demo.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class HomeController {

    private final DashboardService dashboardService;

    public HomeController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/resumen")
    public DashboardDTO obtenerResumen() {
        return dashboardService.generarResumen();
    }

}
