package com.example.restaurant.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.restaurant.model.Table;

public interface TableRepository extends MongoRepository<Table, String> {
    Optional<Table> findByQrCode(String qrCode);
    Optional<Table> findByTableNumber(String tableNumber);
}

