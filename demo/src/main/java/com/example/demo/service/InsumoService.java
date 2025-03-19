package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.InsumoDTO;
import com.example.demo.repos.InsumoRepository;

@Service
public class InsumoService {

    @Autowired
    private InsumoRepository insumoRepository;

    // LISTAR LOS INSUMOS
    public List<InsumoDTO> listarInsumos() {
        return insumoRepository.findAll();
    }

    // OBTENER INSUMOS POR SU ID
    public Optional<InsumoDTO> obtenerInsumoPorId(Long id) {
        return insumoRepository.findById(id);
    }

    // GUARDAR NUEVO INSUMO
    public InsumoDTO guardarInsumo(InsumoDTO insumo) {
        return insumoRepository.save(insumo);
    }

    // ACTUALIZAR O EDITAR INSUMO
    public InsumoDTO actualizarInsumo(InsumoDTO insumo) {
        return insumoRepository.save(insumo);
    }

    // ELIMINA UN INSUMO
    public void eliminarInsumo(Long id) {
        insumoRepository.deleteById(id);
    }

}
