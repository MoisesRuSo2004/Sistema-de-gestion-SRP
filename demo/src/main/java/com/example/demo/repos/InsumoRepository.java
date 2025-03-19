package com.example.demo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.InsumoDTO;

@Repository
public interface InsumoRepository extends JpaRepository<InsumoDTO, Long> {

}