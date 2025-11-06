package com.example.restaurant.repository;

import com.example.restaurant.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    List<Feedback> findByOrderId(String orderId);
    List<Feedback> findByCustomerId(String customerId);
}

