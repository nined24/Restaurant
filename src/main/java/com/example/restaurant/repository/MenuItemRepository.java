package com.example.restaurant.repository;

import com.example.restaurant.model.MenuItem;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MenuItemRepository extends MongoRepository<MenuItem, String> {
    List<MenuItem> findByCategoryAndAvailableTrueAndHiddenFalse(String category);
    List<MenuItem> findByAvailableTrueAndHiddenFalse();
    List<MenuItem> findByCategory(String category);
}

