package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class EntradasVistaController {
    @GetMapping("/entradas")
    public String entradas() {
        return "entradas/add";
    }

}