package com.example.demo.repos.mongo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.mongo.Insumo;

@Repository
public interface InsumoRepository extends MongoRepository<Insumo, String> {

    // Método para encontrar insumos con stock menor a un valor específico
    List<Insumo> findByStockLessThan(int stock);

    // Busca por coincidencia parcial
    List<Insumo> findByNombreContainingIgnoreCase(String nombre);

    // Buscar un insumo por nombre exacto, ignorando mayúsculas
    Optional<Insumo> findByNombreIgnoreCase(String nombre);

}
