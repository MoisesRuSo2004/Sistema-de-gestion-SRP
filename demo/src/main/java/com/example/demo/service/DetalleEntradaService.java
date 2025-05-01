package com.example.demo.service;

import com.example.demo.model.DetalleEntrada;
import com.example.demo.repos.DetalleEntradaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DetalleEntradaService {

    @Autowired
    private DetalleEntradaRepository detalleEntradaRepository;

    // LISTAR DETALLE ENTRADA
    public List<DetalleEntrada> listarDetalleEntradas() {
        return detalleEntradaRepository.findAll();
    }

    // OBTENER DETALLE ENTRADA POR ID
    public Optional<DetalleEntrada> obtenerDetalleEntradaPorId(String id) {
        return detalleEntradaRepository.findById(id);
    }

    // GUARDAR NUEVO DETALLE ENTRADA
    public DetalleEntrada guardarDetalleEntrada(DetalleEntrada detalleEntrada) {
        return detalleEntradaRepository.save(detalleEntrada);
    }

    // ACTUALIZAR O EDITAR DETALLE ENTRADA
    public DetalleEntrada actualizarDetalleEntrada(DetalleEntrada detalleEntrada) {
        return detalleEntradaRepository.save(detalleEntrada);
    }

    // ELIMINA DETALLE ENTRADA
    public void eliminarDetalleEntrada(String id) {
        detalleEntradaRepository.deleteById(id);
    }
}
