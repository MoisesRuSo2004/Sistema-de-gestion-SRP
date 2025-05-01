package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.DetalleSalida;
import com.example.demo.repos.DetalleSalidaRepository;

@Service
public class DetalleSalidaService {

    @Autowired
    private DetalleSalidaRepository detalleSalidaRepository;

    // LISTAR DETALLE ENTRADA
    public List<DetalleSalida> listarDetalleSalidas() {
        return detalleSalidaRepository.findAll();
    }

    // OBTENER DETALLE ENTRADA POR ID
    public Optional<DetalleSalida> obtenerDetalleSalidaPorId(String id) {
        return detalleSalidaRepository.findById(id);
    }

    // GUARDAR NUEVO DETALLE ENTRADA
    public DetalleSalida guardarDetalleSalida(DetalleSalida detalleSalida) {
        return detalleSalidaRepository.save(detalleSalida);
    }

    // ACTUALIZAR O EDITAR DETALLE ENTRADA
    public DetalleSalida actualizarDetalleSalida(DetalleSalida detalleSalida) {
        return detalleSalidaRepository.save(detalleSalida);
    }

    // ELIMINA DETALLE ENTRADA
    public void eliminarDetalleSalida(String id) {
        detalleSalidaRepository.deleteById(id);
    }

}
