package com.example.demo.entity;

public class FiltroReporteDTO {
    private String tipoInforme;
    private String fechaInicio;
    private String fechaFin;
    private String tipoReporte;
    private boolean soloMovimiento;

    // Constructor vacío
    public FiltroReporteDTO() {
    }

    // Constructor con parámetros
    public FiltroReporteDTO(String tipoInforme, String fechaInicio, String fechaFin, String tipoReporte,
            boolean soloMovimiento) {
        this.tipoInforme = tipoInforme;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.tipoReporte = tipoReporte;
        this.soloMovimiento = soloMovimiento;
    }

    // Getters y setters
    public String getTipoInforme() {
        return tipoInforme;
    }

    public void setTipoInforme(String tipoInforme) {
        this.tipoInforme = tipoInforme;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(String fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getTipoReporte() {
        return tipoReporte;
    }

    public void setTipoReporte(String tipoReporte) {
        this.tipoReporte = tipoReporte;
    }

    public boolean isSoloMovimiento() {
        return soloMovimiento;
    }

    public void setSoloMovimiento(boolean soloMovimiento) {
        this.soloMovimiento = soloMovimiento;
    }

}
