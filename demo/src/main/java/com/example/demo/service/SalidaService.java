package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.exception.StockInsuficienteException;
import com.example.demo.model.mongo.DetalleSalida;
import com.example.demo.model.mongo.Insumo;
import com.example.demo.model.mongo.Salida;
import com.example.demo.repos.mongo.InsumoRepository;
import com.example.demo.repos.mongo.SalidaRepository;

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

    public List<Salida> listarSalidasPaginadas(int page, int size) {
        return salidaRepository.findAll(PageRequest.of(page, size)).getContent();
    }

    // OBTENER ENTRADA POR ID
    public Optional<Salida> obtenerSalidaPorId(String id) {
        return salidaRepository.findById(id);
    }

    // GUARDAR NUEVA ENTRADA Y ACTUALIZAR STOCK DE INSUMOS
    @Transactional
    public Salida guardarSalida(Salida salida) {
        // Establecer fecha si no viene
        if (salida.getFecha() == null) {
            salida.setFecha(LocalDate.now());
        }

        for (DetalleSalida detalle : salida.getDetalles()) {
            String id = detalle.getInsumoId();

            Insumo insumo = insumoRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Insumo no encontrado: " + id));

            int cantidadActual = insumo.getStock();
            int cantidadSalida = detalle.getCantidad();

            if (cantidadSalida > cantidadActual) {
                throw new StockInsuficienteException("Stock insuficiente para el insumo \"" + insumo.getNombre()
                        + "\". Stock actual:)" + cantidadActual);
            }

            // Descontar stock
            insumo.setStock(cantidadActual - cantidadSalida);
            insumoRepository.save(insumo);
        }

        // Guardar la salida en MongoDB
        return salidaRepository.save(salida);
    }

    // ACTUALIZAR O EDITAR ENTRADA
    @Transactional
    public Salida actualizarSalida(Salida salidaActualizada) {
        // 1. Obtener la salida original
        Salida salidaOriginal = salidaRepository.findById(salidaActualizada.getId())
                .orElseThrow(() -> new RuntimeException("Salida no encontrada con ID: " + salidaActualizada.getId()));

        // 2. Revertir stock con los detalles de la salida original (sumar)
        if (salidaOriginal.getDetalles() != null) {
            for (DetalleSalida detalleOriginal : salidaOriginal.getDetalles()) {
                Insumo insumo = insumoRepository.findById(detalleOriginal.getInsumoId())
                        .orElseThrow(
                                () -> new RuntimeException("Insumo no encontrado: " + detalleOriginal.getInsumoId()));
                insumo.setStock(insumo.getStock() + detalleOriginal.getCantidad());
                insumoRepository.save(insumo);
            }
        }

        // 3. Aplicar nueva salida (restar)
        if (salidaActualizada.getDetalles() != null) {
            for (DetalleSalida detalleNuevo : salidaActualizada.getDetalles()) {
                Insumo insumo = insumoRepository.findById(detalleNuevo.getInsumoId())
                        .orElseThrow(() -> new RuntimeException("Insumo no encontrado: " + detalleNuevo.getInsumoId()));

                int stockActual = insumo.getStock();
                int cantidadSalida = detalleNuevo.getCantidad();

                if (cantidadSalida > stockActual) {
                    throw new StockInsuficienteException("Stock insuficiente para el insumo \"" + insumo.getNombre()
                            + "\". Stock actual: " + stockActual);
                }

                insumo.setStock(stockActual - cantidadSalida);
                insumoRepository.save(insumo);
            }
        }

        // 4. Actualizar la salida
        return salidaRepository.save(salidaActualizada);
    }

    // ELIMINA ENTRADA
    public void eliminarSalida(String id) {
        // Aquí podríamos implementar la lógica para revertir los cambios en el
        // inventario
        salidaRepository.deleteById(id);
    }
}