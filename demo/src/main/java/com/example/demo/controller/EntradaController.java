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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.mongo.DetalleEntrada;
import com.example.demo.model.mongo.Entrada;
import com.example.demo.repos.mongo.EntradaRepository;
import com.example.demo.service.EntradaService;

@RestController
@RequestMapping("/api/entradas")
public class EntradaController {

    @Autowired
    private EntradaService entradaService;

    @Autowired
    private EntradaRepository entradaRepository;

    // BTENER TODAS LAS ENTRADAS (GET)
    // @GetMapping
    // public List<Entrada> getAllEntradas() {
    // return entradaService.listarEntradas();
    // }

    @GetMapping
    public List<Entrada> obtenerEntradasPaginadas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return entradaService.listarEntradasPaginadas(page, size);
    }

    // OBTENER ENTRADA POR ID (GET)
    @GetMapping("/{id}")
    public Optional<Entrada> getEntradaById(@PathVariable String id) {
        return entradaService.obtenerEntradaPorId(id);
    }

    // CREAR UNA NUEVA ENTRADA (POST)
    @PostMapping
    public Entrada createEntrada(@RequestBody Entrada entrada) {
        return entradaService.guardarEntrada(entrada);
    }

    // ACTUALIZAR ENTRADA (PUT)
    @PutMapping("/{id}")
    public Entrada updateEntrada(@PathVariable String id, @RequestBody Entrada entrada, DetalleEntrada detalleEntrada) {
        return entradaService.actualizarEntrada(entrada);
    }

    // ELIMINAR UN INSUMO (DELETE)
    @DeleteMapping("/{id}")
    public void deleteEntrada(@PathVariable String id) {
        entradaRepository.deleteById(id);
        entradaService.eliminarEntrada(id);
    }

}
