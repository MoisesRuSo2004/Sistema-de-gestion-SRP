package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.demo.model.mysql.Admin;

@Controller
public class AdminController {

    @GetMapping("/perfil")
    public String perfilAdmin(Model model) {
        Admin admin = new Admin();
        admin.setUsuario("admin");
        admin.setCorreo("admin@sistemadegestionsrp.com.co");
        model.addAttribute("admin", admin);

        return "perfil/perfil"; // Nombre de la vista de administración
    }

    // Puedes agregar más métodos

}
