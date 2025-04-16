package com.example.demo.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Entradas;

@Repository
public interface EntradasRepository extends MongoRepository<Entradas, String> {

}
