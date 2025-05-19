package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EntradaVistaController {

    @GetMapping("/entradas")
    public String mostrarEntradas() {
        return "entradas/lista";
    }

    @GetMapping("/entradas-add")
    public String agregarEntrada() {
        return "entradas/add";
    }

    @GetMapping("/entradas-edit")
    public String editarEntrada() {
        return "entradas/editar";
    }

}