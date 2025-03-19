package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "detalle_salida")
public class DetallesSalidasDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    private Integer cantidad;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_salida_id")
    private SalidasDTO idSalida;

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

    public SalidasDTO getIdSalida() {
        return idSalida;
    }

    public void setIdSalida(final SalidasDTO idSalida) {
        this.idSalida = idSalida;
    }

    public InsumoDTO getIdInsumo() {
        return idInsumo;
    }

    public void setIdInsumo(final InsumoDTO idInsumo) {
        this.idInsumo = idInsumo;
    }

}
