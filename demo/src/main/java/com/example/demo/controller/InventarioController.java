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

import com.example.demo.model.InsumoDTO;
import com.example.demo.service.InsumoService;

@RestController
@RequestMapping("/api/insumos")
public class InventarioController {
    @Autowired
    private InsumoService insumoService;

    // BTENER TODOS LOS INSUMOS (GET)
    @GetMapping
    public List<InsumoDTO> getAllInsumos() {
        return insumoService.listarInsumos();
    }

    // OBTENER INSUMOS POR ID (GET)
    @GetMapping("/{id}")
    public Optional<InsumoDTO> getInsumoById(@PathVariable Long id) {
        return insumoService.obtenerInsumoPorId(id);
    }

    // CREAR UN NUEVO INSUMO (POST)
    @PostMapping
    public InsumoDTO createInsumo(@RequestBody InsumoDTO insumo) {
        return insumoService.guardarInsumo(insumo);
    }

    // ACTUALIZAR INSUMO (PUT)
    @PutMapping("/{id}")
    public InsumoDTO updateInsumo(@PathVariable Long id, @RequestBody InsumoDTO insumo) {
        System.out.println("recibiendo insumo: " + insumo);
        insumoService.actualizarInsumo(insumo);
        return insumoService.actualizarInsumo(insumo);
    }

    // ELIMINAR UN INSUMO (DELETE)
    @DeleteMapping("/{id}")
    public void deleteInsumo(@PathVariable Long id) {
        insumoService.eliminarInsumo(id);
    }

}