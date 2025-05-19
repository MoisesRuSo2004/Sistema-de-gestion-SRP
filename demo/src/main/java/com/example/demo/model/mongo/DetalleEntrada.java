package com.example.demo.model.mongo;

import org.springframework.data.annotation.Id;

public class DetalleEntrada {

    @Id
    private String insumoId; // ID único de detalle de entrada
    private String nombre;
    private int cantidad; // Stock actualizado
    private String proveedor;

    // Constructor vacío
    public DetalleEntrada() {
    }

    // Constructor con parámetros
    public DetalleEntrada(String insumoId, String nombre, int cantidad, String proveedor) {
        this.insumoId = insumoId;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.proveedor = proveedor;
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

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    @Override
    public String toString() {
        return "DetallesEntradas{" +
                "insumoId='" + insumoId + '\'' +
                ", cantidad=" + cantidad +
                " nombre='" + nombre + '\'' +
                ", proveedor='" + proveedor + '\'' +
                '}';
    }
}
