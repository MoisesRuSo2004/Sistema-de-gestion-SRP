package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.DetalleEntrada;
import com.example.demo.model.Entrada;
import com.example.demo.model.Insumo;
import com.example.demo.repos.EntradaRepository;
import com.example.demo.repos.InsumoRepository;

@Service
public class EntradaService {

    @Autowired
    private EntradaRepository entradaRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    // LISTAR ENTRADA
    public List<Entrada> listarEntradas() {
        return entradaRepository.findAll();
    }

    // OBTENER ENTRADA POR ID
    public Optional<Entrada> obtenerEntradaPorId(String id) {
        return entradaRepository.findById(id);
    }

    // GUARDAR NUEVA ENTRADA Y ACTUALIZAR STOCK DE INSUMOS
    @Transactional
    public Entrada guardarEntrada(Entrada entrada) {
        // Establecer fecha actual si no viene establecida
        if (entrada.getFecha() == null) {
            entrada.setFecha(LocalDate.now());
        }

        // Procesar cada detalle de la entrada para actualizar el stock de insumos
        if (entrada.getDetalles() != null && !entrada.getDetalles().isEmpty()) {
            for (DetalleEntrada detalle : entrada.getDetalles()) {
                actualizarStockInsumo(detalle);
            }
        }

        // Guardar la entrada
        return entradaRepository.save(entrada);
    }

    // Método privado para actualizar el stock del insumo
    private void actualizarStockInsumo(DetalleEntrada detalle) {
        if (detalle.getInsumoId() == null) {
            throw new RuntimeException("El detalle debe tener un ID de insumo válido");
        }

        Optional<Insumo> insumoOpt = insumoRepository.findById(detalle.getInsumoId());

        if (insumoOpt.isPresent()) {
            Insumo insumo = insumoOpt.get();

            // Obtener valores actuales
            int stockActual = insumo.getStock();
            int nuevaCantidad = detalle.getCantidad();

            // Calcular nuevo stock
            int nuevoStock = stockActual + nuevaCantidad;

            // Actualizar el insumo (solo el stock)
            insumo.setStock(nuevoStock);

            // Guardar el insumo actualizado
            insumoRepository.save(insumo);
        } else {
            throw new RuntimeException("No se encontró el insumo con ID: " + detalle.getInsumoId());
        }
    }

    // ACTUALIZAR O EDITAR ENTRADA
    public Entrada actualizarEntrada(Entrada entrada) {
        // Aquí podríamos implementar la lógica para ajustar el inventario si se
        // modifica una entrada existente
        return entradaRepository.save(entrada);
    }

    // ELIMINA ENTRADA
    public void eliminarEntrada(String id) {
        // Aquí podríamos implementar la lógica para revertir los cambios en el
        // inventario
        entradaRepository.deleteById(id);
    }
}