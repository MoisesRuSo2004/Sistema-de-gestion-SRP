package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;

import com.example.demo.model.Entradas;
import com.example.demo.model.DetallesEntradas;
import com.example.demo.service.EntradasService;

// ✅ DTO auxiliar para recibir entrada y detalles en una sola petición
class EntradaRequest {
    private Entradas entrada;
    private List<DetallesEntradas> detalles;

    public Entradas getEntrada() {
        return entrada;
    }

    public void setEntrada(Entradas entrada) {
        this.entrada = entrada;
    }

    public List<DetallesEntradas> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetallesEntradas> detalles) {
        this.detalles = detalles;
    }
}

@RestController
@RequestMapping("/api/entradas")
public class EntradasController {

    private final EntradasService entradasService;

    public EntradasController(EntradasService entradasService) {
        this.entradasService = entradasService;
    }

    // ✅ Obtener todas las entradas (funciona bien)
    @GetMapping
    public ResponseEntity<List<Entradas>> obtenerTodasLasEntradas() {
        return ResponseEntity.ok(entradasService.obtenerTodasLasEntradas());
    }

    // 🔥 Corrección: Recibir entrada + detalles en un solo objeto JSON
    @PostMapping
    public ResponseEntity<Entradas> agregarEntrada(@RequestBody EntradaRequest request) {
        Entradas entradaGuardada = entradasService.guardarEntrada(request.getEntrada(), request.getDetalles());
        return ResponseEntity.status(HttpStatus.CREATED).body(entradaGuardada);
    }

    // ✅ Eliminar una entrada (funciona bien)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEntrada(@PathVariable String id) {
        entradasService.eliminarEntrada(id);
        return ResponseEntity.noContent().build();
    }
}
