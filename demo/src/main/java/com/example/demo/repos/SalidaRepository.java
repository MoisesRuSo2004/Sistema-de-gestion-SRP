package com.example.demo.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Salida;

@Repository
public interface SalidaRepository extends MongoRepository<Salida, String> {

}
