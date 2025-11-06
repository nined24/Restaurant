package com.example.restaurant.repository;

import com.example.restaurant.model.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends MongoRepository<Inventory, String> {
    List<Inventory> findByLowStockTrue();
    Optional<Inventory> findByItemName(String itemName);
}

