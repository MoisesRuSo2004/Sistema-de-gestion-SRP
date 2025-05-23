package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.mongo.Insumo;
import com.example.demo.service.InsumoService;

@RestController
@RequestMapping("/api/insumos")
public class InsumoController {

    @Autowired
    private InsumoService insumoService;

    // OBTENER TODOS LOS INSUMOS
    @GetMapping
    public List<Insumo> getAllInsumos() {
        return insumoService.listarInsumos();
    }

    // OBTENER INSUMOS CON STOCK BAJO
    @GetMapping("/stock-bajo")
    public ResponseEntity<List<Insumo>> getInsumosConStockBajo() {
        List<Insumo> criticos = insumoService.obtenerInsumosConStockBajo();
        return ResponseEntity.ok(criticos);
    }

    // OBTENER INSUMO POR ID
    @GetMapping("/{id}")
    public Optional<Insumo> getInsumoById(@PathVariable String id) {
        return insumoService.obtenerInsumoPorId(id);
    }

    // BUSCAR INSUMOS POR NOMBRE (para autocompletado)
    @GetMapping("/buscar")
    public ResponseEntity<List<Insumo>> buscarInsumosPorNombre(@RequestParam("nombre") String nombre) {
        List<Insumo> resultados = insumoService.buscarInsumosPorNombre(nombre);
        return ResponseEntity.ok(resultados);
    }

    // CREAR NUEVO INSUMO
    @PostMapping
    public ResponseEntity<?> createInsumo(@RequestBody Insumo insumo) {
        try {
            Insumo creado = insumoService.guardarInsumo(insumo);
            return ResponseEntity.ok(creado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(409).body(e.getMessage()); // 409 Conflict
        }
    }

    // ACTUALIZAR INSUMO
    @PutMapping("/{id}")
    public Insumo updateInsumo(@PathVariable String id, @RequestBody Insumo insumo) {
        insumo.setId(id);
        return insumoService.actualizarInsumo(insumo);
    }

    // ELIMINAR INSUMO
    @DeleteMapping("/{id}")
    public void deleteInsumo(@PathVariable String id) {
        insumoService.eliminarInsumo(id);
    }
}
