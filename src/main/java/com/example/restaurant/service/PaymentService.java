package com.example.restaurant.service;

import com.example.restaurant.dto.PaymentRequest;
import com.example.restaurant.model.*;
import com.example.restaurant.repository.OrderRepository;
import com.example.restaurant.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PaymentService {
    
    @Autowired
    private PaymentRepository paymentRepository;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Transactional
    public Payment processPayment(PaymentRequest request, String customerId) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (!order.getCustomerId().equals(customerId)) {
            throw new RuntimeException("Order does not belong to customer");
        }
        
        Payment payment = new Payment();
        payment.setOrderId(order.getId());
        payment.setCustomerId(customerId);
        payment.setAmount(order.getTotalAmount());
        payment.setStatus(PaymentStatus.PROCESSING);
        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setTransactionId(UUID.randomUUID().toString());
        payment.setCreatedAt(LocalDateTime.now());
        
        // Simulate payment gateway processing
        try {
            // In production, integrate with actual payment gateway here
            Thread.sleep(1000); // Simulate processing time
            
            payment.setStatus(PaymentStatus.COMPLETED);
            payment.setCompletedAt(LocalDateTime.now());
            
            // Update order status if needed
            if (order.getStatus() == OrderStatus.SERVED) {
                // Order already served, payment completed
            }
            
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            payment.setStatus(PaymentStatus.FAILED);
            throw new RuntimeException("Payment processing failed", e);
        } catch (Exception e) {
            payment.setStatus(PaymentStatus.FAILED);
            throw new RuntimeException("Payment processing failed", e);
        }
        
        return paymentRepository.save(payment);
    }
    
    public Payment getPaymentByOrderId(String orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }
    
    public List<Payment> getPaymentsByCustomer(String customerId) {
        return paymentRepository.findByCustomerId(customerId);
    }
    
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }
    
    public List<Payment> getPaymentsByStatus(PaymentStatus status) {
        return paymentRepository.findByStatus(status);
    }
}

