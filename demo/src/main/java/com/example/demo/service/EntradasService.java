package com.example.demo.service;

import com.example.demo.model.Entradas;
import com.example.demo.model.DetallesEntradas;
import com.example.demo.model.Insumo;
import com.example.demo.repos.EntradasRepository;
import com.example.demo.repos.DetallesEntradasRepository;
import com.example.demo.repos.InsumoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntradasService {

    @Autowired
    private EntradasRepository entradasRepository;

    @Autowired
    private DetallesEntradasRepository detallesEntradasRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    // ✅ CREAR: Guardar una nueva entrada con detalles y actualizar insumos
    public Entradas guardarEntrada(Entradas entrada, List<DetallesEntradas> detalles) {
        Entradas entradaGuardada = entradasRepository.save(entrada);

        for (DetallesEntradas detalle : detalles) {
            if (detalle.getInsumo() == null) {
                throw new IllegalArgumentException("El insumo en el detalle no puede ser nulo");
            }

            Optional<Insumo> insumoOptional = insumoRepository.findById(detalle.getInsumo().getId());

            if (insumoOptional.isPresent()) {
                Insumo insumo = insumoOptional.get();
                insumo.setStock(insumo.getStock() + detalle.getCantidad());
                insumoRepository.save(insumo);

                detalle.setEntrada(entradaGuardada);
                detallesEntradasRepository.save(detalle);
            } else {
                throw new IllegalArgumentException("El insumo con ID " + detalle.getInsumo().getId() + " no existe");
            }
        }

        return entradaGuardada;
    }

    // ✅ LEER: Obtener todas las entradas
    public List<Entradas> obtenerTodasLasEntradas() {
        return entradasRepository.findAll();
    }

    // ✅ LEER: Obtener una entrada por ID
    public Optional<Entradas> obtenerEntradaPorId(String id) {
        return entradasRepository.findById(id);
    }

    // ✅ ACTUALIZAR: Modificar una entrada existente
    public Entradas actualizarEntrada(String id, Entradas nuevaEntrada) {
        return entradasRepository.findById(id).map(entrada -> {
            entrada.setFecha(nuevaEntrada.getFecha()); // Suponiendo que `fecha` es un campo de `EntradasDTO`
            return entradasRepository.save(entrada);
        }).orElseThrow(() -> new RuntimeException("Entrada no encontrada con ID: " + id));
    }

    // ✅ ELIMINAR: Borrar una entrada y sus detalles
    public void eliminarEntrada(String id) {
        if (entradasRepository.existsById(id)) {
            // Borrar primero los detalles asociados
            detallesEntradasRepository.deleteById(id);
            // Luego borrar la entrada
            entradasRepository.deleteById(id);
        } else {
            throw new RuntimeException("Entrada no encontrada con ID: " + id);
        }
    }
}
