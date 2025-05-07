package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.mongo.Insumo;
import com.example.demo.service.InsumoService;

@RestController
@RequestMapping("/api/insumos")
public class InsumoController {
    @Autowired
    private InsumoService insumoService;

    // BTENER TODOS LOS INSUMOS (GET)
    @GetMapping
    public List<Insumo> getAllInsumos() {
        return insumoService.listarInsumos();
    }

    // OBTENER INSUMOS POR ID (GET)
    @GetMapping("/{id}")
    public Optional<Insumo> getInsumoById(@PathVariable String id) {
        return insumoService.obtenerInsumoPorId(id);
    }

    // CREAR UN NUEVO INSUMO (POST)
    @PostMapping
    public Insumo createInsumo(@RequestBody Insumo insumo) {
        return insumoService.guardarInsumo(insumo);
    }

    // ACTUALIZAR INSUMO (PUT)
    @PutMapping("/{id}")
    public Insumo updateInsumo(@PathVariable String id, @RequestBody Insumo insumo) {
        System.out.println("ID de la URL: " + id);
        System.out.println("ID del insumo recibido: " + insumo.getId());
        System.out.println("Datos del insumo recibido: " + insumo.getNombre() + ", " + insumo.getStock() + ", "
                + insumo.getUnidadM());

        insumo.setId(id);

        return insumoService.actualizarInsumo(insumo);
    }

    // ELIMINAR UN INSUMO (DELETE)
    @DeleteMapping("/{id}")
    public void deleteInsumo(@PathVariable String id) {
        insumoService.eliminarInsumo(id);
    }

}