package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "detalles_entradas") // nombre de la colección en MongoDB
public class DetallesEntradas {

    @Id
    private String id;

    private Integer cantidad;
    private Entradas entrada;
    private Insumo insumo;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public Entradas getEntrada() {
        return entrada;
    }

    public void setEntrada(Entradas entrada) {
        this.entrada = entrada;
    }

    public Insumo getInsumo() {
        return insumo;
    }

    public void setInsumo(Insumo insumo) {
        this.insumo = insumo;
    }
}
