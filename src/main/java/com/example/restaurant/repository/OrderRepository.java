package com.example.restaurant.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.restaurant.model.Order;
import com.example.restaurant.model.OrderStatus;

public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByCustomerId(String customerId);
    List<Order> findByStatus(OrderStatus status);
    List<Order> findByTableId(String tableId);
    List<Order> findByStatusOrderByCreatedAtAsc(OrderStatus status);
}

