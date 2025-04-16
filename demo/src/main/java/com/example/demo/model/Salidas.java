package com.example.demo.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "salidas") // nombre de la colección en MongoDB
public class Salidas {

    @Id
    private String id;

    private LocalDate fecha;
    private String descripcion;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(final LocalDate fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(final String descripcion) {
        this.descripcion = descripcion;
    }

}
