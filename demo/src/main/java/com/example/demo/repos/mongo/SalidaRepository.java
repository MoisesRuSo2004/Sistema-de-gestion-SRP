package com.example.demo.repos.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.mongo.Salida;

@Repository
public interface SalidaRepository extends MongoRepository<Salida, String> {

}
