package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SalidaVistaController {
    @GetMapping("/salidas")
    public String mostrarEntradas() {
        return "salidas/lista";
    }

    @GetMapping("/salidas-add")
    public String agregarEntrada() {
        return "salidas/add";
    }

    @GetMapping("/salidas-edit")
    public String editarEntrada() {
        return "salidas/editar";
    }

}