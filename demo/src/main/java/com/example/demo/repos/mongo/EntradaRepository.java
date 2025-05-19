package com.example.demo.repos.mongo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.mongo.Entrada;

@Repository
public interface EntradaRepository extends MongoRepository<Entrada, String> {

    @org.springframework.data.mongodb.repository.Query("{ 'fecha': {$gte: ?0, $lte: ?1 } }")
    List<Entrada> findByFechaBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin);

    List<Entrada> findByDescripcionContainingIgnoreCase(String term, Pageable pageable);

    long countByDescripcionContainingIgnoreCase(String term);

}
