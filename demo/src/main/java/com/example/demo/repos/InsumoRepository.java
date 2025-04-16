package com.example.demo.repos;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Insumo;

@Repository
public interface InsumoRepository extends MongoRepository<Insumo, String> {
}
