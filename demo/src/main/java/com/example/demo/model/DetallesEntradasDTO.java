package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "detalle_entrada")
public class DetallesEntradasDTO {

    @Id
    @Column(nullable = false, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Integer cantidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_entrada_id")
    private EntradasDTO idEntrada;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_insumo_id")
    private InsumoDTO idInsumo;

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
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

    public EntradasDTO getIdEntrada() {
        return idEntrada;
    }

    public void setIdEntrada(final EntradasDTO idEntrada) {
        this.idEntrada = idEntrada;
    }

    public InsumoDTO getIdInsumo() {
        return idInsumo;
    }

    public void setIdInsumo(final InsumoDTO idInsumo) {
        this.idInsumo = idInsumo;
    }

}
