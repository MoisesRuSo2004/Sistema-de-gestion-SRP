package com.example.demo.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.DetallesEntradas;

@Repository
public interface DetallesEntradasRepository extends MongoRepository<DetallesEntradas, String> {

}
