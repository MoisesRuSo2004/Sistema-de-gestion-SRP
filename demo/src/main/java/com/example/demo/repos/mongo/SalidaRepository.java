package com.example.demo.repos.mongo;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.mongo.Salida;

@Repository
public interface SalidaRepository extends MongoRepository<Salida, String> {

    @org.springframework.data.mongodb.repository.Query("{ 'fecha': {$gte: ?0, $lte: ?1 } }")
    List<Salida> findByFechaBetween(LocalDateTime inicio, LocalDateTime fin); // Método para buscar salidas por rango de
                                                                              // fechas

}
