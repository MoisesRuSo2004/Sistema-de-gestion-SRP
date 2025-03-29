package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import com.example.demo.model.InsumoDTO;

@Controller
public class InventarioVistaController {

    @GetMapping("/inventario")
    public String mostrarInventario() {
        return "inventario/inventario";
    }

    @GetMapping("/agregar")
    public String agregarInventario() {
        return "inventario/agregar";
    }

    @GetMapping("/editar")
    public String editarinventario(@RequestParam("id") Long id, Model model) {
        try {
            String apiUrl = "http://localhost:8080/api/insumos/" + id;
            RestTemplate restTemplate = new RestTemplate();

            InsumoDTO insumo = restTemplate.getForObject(apiUrl, InsumoDTO.class);

            if (insumo == null) {
                throw new RuntimeException("Insumo no encontrado");
            }

            model.addAttribute("insumo", insumo); // ✅ Error corregido

            return "inventario/editar";
        } catch (Exception e) {
            System.err.println("Error al obtener insumo: " + e.getMessage());
            return "error"; // Puedes crear una página `error.html`
        }
    }
}
