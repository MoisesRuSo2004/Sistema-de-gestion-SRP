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

    // OBTENER INSUMOS POR SU ID
    public Optional<Insumo> obtenerInsumoPorId(String id) {
        return insumoRepository.findById(id);
    }

    // GUARDAR NUEVO INSUMO
    public Insumo guardarInsumo(Insumo insumo) {
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
