package com.example.demo.model.mongo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "entradas")
public class Entrada {
    @Id
    private String id;
    private LocalDate fecha;
    private String descripcion;
    private String proveedor;
    private List<DetalleEntrada> detalles; // Nueva propiedad para los detalles

    // Constructor vacío
    public Entrada() {

    }

    // Constructor con campos básicos
    public Entrada(LocalDate fecha, String descripcion, String proveedor) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.proveedor = proveedor;
    }

    // Constructor con todos los campos
    public Entrada(LocalDate fecha, String descripcion, List<DetalleEntrada> detalles) {
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.detalles = detalles;
    }

    // Getters y setters existentes
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getProveedor() {
        return proveedor;
    }

    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
    }

    // Nuevos getters y setters para detalles
    public List<DetalleEntrada> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleEntrada> detalles) {
        this.detalles = detalles;
    }

    @Override
    public String toString() {
        return "Entrada{" +
                "id='" + id + '\'' +
                ", fecha=" + fecha +
                ", descripcion='" + descripcion + '\'' +
                ", detalles=" + detalles +
                ", proveedor='" + proveedor + '\'' +
                '}';
    }
}