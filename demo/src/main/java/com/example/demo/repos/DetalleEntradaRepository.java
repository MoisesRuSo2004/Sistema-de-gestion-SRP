package com.example.demo.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.DetalleEntrada;

@Repository
public interface DetalleEntradaRepository extends MongoRepository<DetalleEntrada, String> {

}
