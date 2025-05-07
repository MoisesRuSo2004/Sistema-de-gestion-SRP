package com.example.demo.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.model.mongo.Insumo;
import com.example.demo.service.InsumoService;

@Controller
public class InsumoVistaController {

    @Autowired
    private InsumoService insumoService;

    @GetMapping("/inventario")
    public String mostrarInventario() {
        return "inventario/inventario";
    }

    @GetMapping("/agregar")
    public String agregarInventario() {
        return "inventario/agregar";
    }

    @GetMapping("/editar")
    public String editarInventario(@RequestParam("id") String id, Model model) {
        try {
            Optional<Insumo> insumoOpt = insumoService.obtenerInsumoPorId(id);

            if (!insumoOpt.isPresent()) {
                throw new RuntimeException("Insumo no encontrado");
            }

            model.addAttribute("insumo", insumoOpt.get());
            return "inventario/editar";
        } catch (Exception e) {
            System.err.println("Error al obtener insumo: " + e.getMessage());
            e.printStackTrace();
            // Agregar atributos para mostrar el error en la vista
            model.addAttribute("errorMensaje", "No se pudo cargar el insumo: " + e.getMessage());
            return "error"; // Asegúrate de que esta vista exista
        }
    }

}
