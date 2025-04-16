package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "admin")
public class Admin {

    private String id;

    private String usuario;
    private String contrasena;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(final String usuario) {
        this.usuario = usuario;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(final String contrasena) {
        this.contrasena = contrasena;
    }

}
