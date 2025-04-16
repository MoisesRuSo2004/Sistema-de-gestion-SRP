package com.example.demo.service;

import com.example.demo.model.DetallesEntradas;
import com.example.demo.repos.DetallesEntradasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetallesEntradasService {

    @Autowired
    private DetallesEntradasRepository detallesEntradasRepository;

    // Guardar un nuevo detalle de entrada
    public DetallesEntradas guardarDetalleEntrada(DetallesEntradas detalle) {
        return detallesEntradasRepository.save(detalle);
    }

    // Obtener todos los detalles de entradas
    public List<DetallesEntradas> obtenerTodosLosDetalles() {
        return detallesEntradasRepository.findAll();
    }

    // Buscar un detalle de entrada por ID
    public Optional<DetallesEntradas> obtenerDetallePorId(String id) {
        return detallesEntradasRepository.findById(id);
    }
}
