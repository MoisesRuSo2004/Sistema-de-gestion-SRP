package com.example.demo.entity;

import java.util.Map;

public class DashboardDTO {
    private int totalInsumos;
    private int totalEntradas;
    private int totalSalidas;
    private int insumosBajoStock;
    private Map<String, Integer> entradasPorMes;
    private Map<String, Integer> salidasPorMes;

    public DashboardDTO(int totalInsumos, int totalEntradas, int totalSalidas, int insumosBajoStock,
            Map<String, Integer> entradasPorMes, Map<String, Integer> salidasPorMes) {
        this.totalInsumos = totalInsumos;
        this.totalEntradas = totalEntradas;
        this.totalSalidas = totalSalidas;
        this.insumosBajoStock = insumosBajoStock;
        this.entradasPorMes = entradasPorMes;
        this.salidasPorMes = salidasPorMes;
    }

    public int getTotalInsumos() {
        return totalInsumos;
    }

    public void setTotalInsumos(int totalInsumos) {
        this.totalInsumos = totalInsumos;
    }

    public int getTotalEntradas() {
        return totalEntradas;
    }

    public void setTotalEntradas(int totalEntradas) {
        this.totalEntradas = totalEntradas;
    }

    public int getTotalSalidas() {
        return totalSalidas;
    }

    public void setTotalSalidas(int totalSalidas) {
        this.totalSalidas = totalSalidas;
    }

    public int getInsumosBajoStock() {
        return insumosBajoStock;
    }

    public void setInsumosBajoStock(int insumosBajoStock) {
        this.insumosBajoStock = insumosBajoStock;
    }

    public Map<String, Integer> getEntradasPorMes() {
        return entradasPorMes;
    }

    public void setEntradasPorMes(Map<String, Integer> entradasPorMes) {
        this.entradasPorMes = entradasPorMes;
    }

    public Map<String, Integer> getSalidasPorMes() {
        return salidasPorMes;
    }

    public void setSalidasPorMes(Map<String, Integer> salidasPorMes) {
        this.salidasPorMes = salidasPorMes;
    }

}
