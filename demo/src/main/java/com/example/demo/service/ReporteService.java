package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.FiltroReporteDTO;
import com.example.demo.entity.ReporteDTO;

public interface ReporteService {
    List<ReporteDTO> generarReporte(FiltroReporteDTO filtro);

}
