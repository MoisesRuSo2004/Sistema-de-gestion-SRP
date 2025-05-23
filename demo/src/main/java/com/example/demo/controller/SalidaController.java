package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.mongo.Salida;
import com.example.demo.repos.mongo.SalidaRepository;
import com.example.demo.service.SalidaService;

@RestController
@RequestMapping("/api/salidas")
public class SalidaController {

    @Autowired
    private SalidaService salidaService;

    @Autowired
    private SalidaRepository salidaRepository;

    // BTENER TODOS LOS INSUMOS (GET)
    // @GetMapping
    // public List<Salida> getAllSalidas() {
    // return salidaService.listarSalidas();
    // }

    @GetMapping
    public Map<String, Object> obtenerSalidassPaginadas(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("fecha").descending());
        Page<Salida> paginaSalidas = salidaRepository.findAll(pageable);

        Map<String, Object> response = new HashMap<>();
        response.put("data", paginaSalidas.getContent());
        response.put("recordsTotal", paginaSalidas.getTotalElements());
        response.put("recordsFiltered", paginaSalidas.getTotalElements()); // si no hay filtros

        return response;
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
