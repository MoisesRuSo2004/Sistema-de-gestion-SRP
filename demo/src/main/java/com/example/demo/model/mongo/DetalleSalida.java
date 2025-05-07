package com.example.demo.model.mongo;

import org.springframework.data.annotation.Id;

public class DetalleSalida {

    @Id
    private String insumoId; // ID único de detalle de entrada
    private String nombre;
    private int cantidad; // cantidad actualizado

    // Constructor vacío
    public DetalleSalida() {
    }

    // Constructor con parámetros
    public DetalleSalida(String insumoId, String nombre, int cantidad) {
        this.insumoId = insumoId;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    // Getters y setters
    public String getInsumoId() {
        return insumoId;
    }

    public void setInsumoId(String insumoId) {
        this.insumoId = insumoId;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    @Override
    public String toString() {
        return "DetallesEntradas{" +
                "insumoId='" + insumoId + '\'' +
                ", cantidad=" + cantidad +
                " nombre='" + nombre + '\'' +
                '}';
    }
}
