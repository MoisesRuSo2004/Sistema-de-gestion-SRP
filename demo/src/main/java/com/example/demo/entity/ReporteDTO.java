package com.example.demo.entity;

public class ReporteDTO {
    private String nombreInsumo;
    private int entradas;
    private int salidas;
    private int stockActual;

    public ReporteDTO(String nombreInsumo, int entradas, int salidas, int stockActual) {
        this.nombreInsumo = nombreInsumo;
        this.entradas = entradas;
        this.salidas = salidas;
        this.stockActual = stockActual;
    }

    // Getters y setters
    public String getNombreInsumo() {
        return nombreInsumo;
    }

    public void setNombreInsumo(String nombreInsumo) {
        this.nombreInsumo = nombreInsumo;
    }

    public int getEntradas() {
        return entradas;
    }

    public void setEntradas(int entradas) {
        this.entradas = entradas;
    }

    public int getSalidas() {
        return salidas;
    }

    public void setSalidas(int salidas) {
        this.salidas = salidas;
    }

    public int getStockActual() {
        return stockActual;
    }

    public void setStockActual(int stockActual) {
        this.stockActual = stockActual;
    }

}
