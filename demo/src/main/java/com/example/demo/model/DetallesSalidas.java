package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "detalles_salidas") // nombre de la colección en MongoDB
public class DetallesSalidas {

    @Id
    private String id;

    private String nombre;
    private Integer cantidad;
    private Salidas idSalida;
    private Insumo idInsumo;

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

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(final Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Salidas getIdSalida() {
        return idSalida;
    }

    public void setIdSalida(final Salidas idSalida) {
        this.idSalida = idSalida;
    }

    public Insumo getIdInsumo() {
        return idInsumo;
    }

    public void setIdInsumo(final Insumo idInsumo) {
        this.idInsumo = idInsumo;
    }

}
