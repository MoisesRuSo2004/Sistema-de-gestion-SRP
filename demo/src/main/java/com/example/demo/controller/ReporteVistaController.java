package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReporteVistaController {

    @GetMapping("/reporte")
    public String mostrarReporte() {
        return "reportes/reporte";
    }

    @GetMapping("/generar-reporte")
    public String generarReporte() {
        // Lógica para generar el reporte
        return "reportes/genera-reporte"; // Redirigir a la página del reporte después de generarlo
    }

}
