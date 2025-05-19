package com.example.demo.controller;

import java.io.ByteArrayInputStream;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.FiltroReporteDTO;
import com.example.demo.entity.ReporteDTO;
import com.example.demo.service.ReporteExcelGenerator;
import com.example.demo.service.ReportePdfGenerator;
import com.example.demo.service.ReporteService;

@RestController
@RequestMapping("/api/reporte")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @PostMapping
    public ResponseEntity<List<ReporteDTO>> generarReporte(@RequestBody FiltroReporteDTO filtro) {
        System.out.println("📥 Petición recibida con filtro:");
        System.out.println("Tipo de informe: " + filtro.getTipoInforme());
        System.out.println("Fecha inicio: " + filtro.getFechaInicio());
        System.out.println("Fecha fin: " + filtro.getFechaFin());

        if (filtro.getFechaInicio() == null || filtro.getFechaFin() == null || filtro.getTipoInforme() == null) {
            return ResponseEntity.badRequest().build();
        }

        List<ReporteDTO> reporte = reporteService.generarReporte(filtro);
        return ResponseEntity.ok(reporte);
    }

    @GetMapping("/exportar/pdf")
    public ResponseEntity<byte[]> exportarPdf(@RequestParam String fechaInicio,
            @RequestParam String fechaFin,
            @RequestParam String tipoInforme) {
        FiltroReporteDTO filtro = new FiltroReporteDTO();
        filtro.setFechaInicio(fechaInicio);
        filtro.setFechaFin(fechaFin);
        filtro.setTipoInforme(tipoInforme);

        List<ReporteDTO> data = reporteService.generarReporte(filtro);
        ByteArrayInputStream bis = ReportePdfGenerator.generarPdf(data);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=reporte.pdf");

        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(bis.readAllBytes());
    }

    @GetMapping("/exportar/excel")
    public ResponseEntity<byte[]> exportarExcel(@RequestParam String fechaInicio,
            @RequestParam String fechaFin,
            @RequestParam String tipoInforme) {
        try {
            FiltroReporteDTO filtro = new FiltroReporteDTO();
            filtro.setFechaInicio(fechaInicio);
            filtro.setFechaFin(fechaFin);
            filtro.setTipoInforme(tipoInforme);

            List<ReporteDTO> data = reporteService.generarReporte(filtro);
            ByteArrayInputStream bis = ReporteExcelGenerator.generarExcel(data);

            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-Disposition", "attachment; filename=reporte.xlsx");

            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .contentType(MediaType
                            .parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(bis.readAllBytes());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
