package com.example.demo.model.mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "insumos") // nombre de la colección en MongoDB
public class Insumo {

    @Id
    private String id; // Mongo usa String como id por defecto

    private String nombre;
    private Integer stock;
    private String unidadM;

    // Constructor vacío
    public Insumo() {
    }

    // Constructor con parámetros
    public Insumo(String id, String nombre, Integer stock, String unidadM) {
        this.id = id;
        this.nombre = nombre;
        this.stock = stock;
        this.unidadM = unidadM;
    }

    // Getters y setters

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(final String nombre) {
        this.nombre = nombre;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(final Integer stock) {
        this.stock = stock;
    }

    public String getUnidadM() {
        return unidadM;
    }

    public void setUnidadM(String unidadM) {
        this.unidadM = unidadM;
    }

    @Override
    public String toString() {
        return "Insumo{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", stock=" + stock +
                ", unidadM='" + unidadM + '\'' +
                '}';
    }
}
