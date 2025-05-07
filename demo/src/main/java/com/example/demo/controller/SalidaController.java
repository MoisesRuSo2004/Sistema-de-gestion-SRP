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

import com.example.demo.model.mongo.Salida;
import com.example.demo.service.SalidaService;

@RestController
@RequestMapping("/api/salidas")
public class SalidaController {

    @Autowired
    private SalidaService salidaService;

    // BTENER TODOS LOS INSUMOS (GET)
    @GetMapping
    public List<Salida> getAllSalidas() {
        return salidaService.listarSalidas();
    }

    // OBTENER INSUMOS POR ID (GET)
    @GetMapping("/{id}")
    public Optional<Salida> getSalidaById(@PathVariable String id) {
        return salidaService.obtenerSalidaPorId(id);
    }

    // CREAR UN NUEVO INSUMO (POST)
    @PostMapping
    public Salida createSalida(@RequestBody Salida salida) {
        return salidaService.guardarSalida(salida);
    }

    // ACTUALIZAR INSUMO (PUT)
    @PutMapping("/{id}")
    public Salida updateSalida(@PathVariable String id, @RequestBody Salida salida) {
        return salidaService.actualizarSalida(salida);
    }

    // ELIMINAR UN INSUMO (DELETE)
    @DeleteMapping("/{id}")
    public void deleteSalida(@PathVariable String id) {
        salidaService.eliminarSalida(id);
    }

}
