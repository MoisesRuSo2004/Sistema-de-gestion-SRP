package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.model.DetalleSalida;
import com.example.demo.model.Insumo;
import com.example.demo.model.Salida;
import com.example.demo.repos.InsumoRepository;
import com.example.demo.repos.SalidaRepository;

@Service
public class SalidaService {

    @Autowired
    private SalidaRepository salidaRepository;

    @Autowired
    private InsumoRepository insumoRepository;

    // LISTAR ENTRADA
    public List<Salida> listarSalidas() {
        return salidaRepository.findAll();
    }

    // OBTENER ENTRADA POR ID
    public Optional<Salida> obtenerSalidaPorId(String id) {
        return salidaRepository.findById(id);
    }

    // GUARDAR NUEVA ENTRADA Y ACTUALIZAR STOCK DE INSUMOS
    @Transactional
    public Salida guardarSalida(Salida salida) {
        // Establecer fecha actual si no viene establecida
        if (salida.getFecha() == null) {
            salida.setFecha(LocalDate.now());
        }

        // Procesar cada detalle de la entrada para actualizar el stock de insumos
        if (salida.getDetalles() != null && !salida.getDetalles().isEmpty()) {
            for (DetalleSalida detalle : salida.getDetalles()) {
                actualizarStockInsumo(detalle);
            }
        }

        // Guardar la entrada
        return salidaRepository.save(salida);
    }

    // Método privado para actualizar el stock del insumo
    private void actualizarStockInsumo(DetalleSalida detalle) {
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
            int nuevoStock = stockActual - nuevaCantidad;

            // Actualizar el insumo (solo el stock)
            insumo.setStock(nuevoStock);

            // Guardar el insumo actualizado
            insumoRepository.save(insumo);
        } else {
            throw new RuntimeException("No se encontró el insumo con ID: " + detalle.getInsumoId());
        }
    }

    // ACTUALIZAR O EDITAR ENTRADA
    public Salida actualizarSalida(Salida salida) {
        // Aquí podríamos implementar la lógica para ajustar el inventario si se
        // modifica una entrada existente
        return salidaRepository.save(salida);
    }

    // ELIMINA ENTRADA
    public void eliminarSalida(String id) {
        // Aquí podríamos implementar la lógica para revertir los cambios en el
        // inventario
        salidaRepository.deleteById(id);
    }
}