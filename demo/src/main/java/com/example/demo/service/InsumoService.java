package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.mongo.Insumo;
import com.example.demo.repos.mongo.InsumoRepository;

@Service
public class InsumoService {

    @Autowired
    private InsumoRepository insumoRepository;

    // LISTAR LOS INSUMOS
    public List<Insumo> listarInsumos() {
        return insumoRepository.findAll();
    }

    // OBTENER INSUMOS CON STOCK BAJO
    public List<Insumo> obtenerInsumosConStockBajo() {
        return insumoRepository.findByStockLessThan(10); // Cambia 10 por el valor que consideres bajo
    }

    // OBTENER INSUMOS POR SU ID
    public Optional<Insumo> obtenerInsumoPorId(String id) {
        return insumoRepository.findById(id);
    }

    // BUSCAR INSUMOS POR NOMBRE (para autocompletado)
    public List<Insumo> buscarInsumosPorNombre(String nombre) {
        return insumoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    // GUARDAR NUEVO INSUMO
    public Insumo guardarInsumo(Insumo insumo) {
        // Normalizar nombre (minusculas + trim)
        String nombreNormalizado = insumo.getNombre().trim().toLowerCase();

        // Verificar si ya existe un insumo con ese nombre
        Optional<Insumo> existente = insumoRepository.findAll().stream()
                .filter(i -> i.getNombre() != null &&
                        i.getNombre().trim().toLowerCase().equals(nombreNormalizado))
                .findFirst();

        if (existente.isPresent()) {
            throw new IllegalArgumentException("Ya existe un insumo con el nombre: " + insumo.getNombre());
        }

        // Continuar con el guardado si no existe
        return insumoRepository.save(insumo);
    }

    // ACTUALIZAR O EDITAR INSUMO
    public Insumo actualizarInsumo(Insumo insumo) {
        return insumoRepository.save(insumo);
    }

    // ELIMINA UN INSUMO
    public void eliminarInsumo(String id) {
        insumoRepository.deleteById(id);
    }

}
