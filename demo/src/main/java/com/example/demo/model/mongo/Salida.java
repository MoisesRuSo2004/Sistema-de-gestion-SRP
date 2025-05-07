package com.example.demo.model.mongo;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "salidas")
public class Salida {
    @Id
    private String id;
    private LocalDate fecha;
    private String descripcion;
    private List<DetalleSalida> detalles; // Nueva propiedad para los detalles

    // Constructor vacío
    public Salida() {
    }

    // Constructor con campos básicos
    public Salida(LocalDate fecha, String descripcion) {
        this.fecha = fecha;
        this.descripcion = descripcion;
    }

    // Constructor con todos los campos
    public Salida(LocalDate fecha, String descripcion, List<DetalleSalida> detalles) {
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

    // Nuevos getters y setters para detalles
    public List<DetalleSalida> getDetalles() {
        return detalles;
    }

    public void setDetalles(List<DetalleSalida> detalles) {
        this.detalles = detalles;
    }

    @Override
    public String toString() {
        return "salida{" +
                "id='" + id + '\'' +
                ", fecha=" + fecha +
                ", descripcion='" + descripcion + '\'' +
                ", detalles=" + detalles +
                '}';
    }
}