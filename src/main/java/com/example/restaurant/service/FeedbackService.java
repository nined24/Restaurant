package com.example.restaurant.service;

import com.example.restaurant.dto.FeedbackRequest;
import com.example.restaurant.model.Feedback;
import com.example.restaurant.repository.FeedbackRepository;
import com.example.restaurant.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class FeedbackService {
    
    @Autowired
    private FeedbackRepository feedbackRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    public Feedback createFeedback(FeedbackRequest request, String customerId) {
        // Verify order exists and belongs to customer
        var order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Order does not belong to customer");
        }
        
        Feedback feedback = new Feedback();
        feedback.setOrderId(request.getOrderId());
        feedback.setCustomerId(customerId);
        feedback.setRating(request.getRating());
        feedback.setComment(request.getComment());
        feedback.setCreatedAt(LocalDateTime.now());
        
        return feedbackRepository.save(feedback);
    }
    
    public List<Feedback> getFeedbackByOrder(String orderId) {
        return feedbackRepository.findByOrderId(orderId);
    }
    
    public List<Feedback> getFeedbackByCustomer(String customerId) {
        return feedbackRepository.findByCustomerId(customerId);
    }
    
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }
}

