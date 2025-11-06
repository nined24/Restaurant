package com.example.restaurant.controller;

import com.example.restaurant.dto.FeedbackRequest;
import com.example.restaurant.dto.OrderRequest;
import com.example.restaurant.dto.PaymentRequest;
import com.example.restaurant.model.*;
import com.example.restaurant.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "*")
public class CustomerController {
    
    @Autowired
    private MenuService menuService;
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private FeedbackService feedbackService;
    
    @GetMapping("/menu")
    public ResponseEntity<List<MenuItem>> getMenu() {
        return ResponseEntity.ok(menuService.getAllMenuItems());
    }
    
    @GetMapping("/menu/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(menuService.getAllCategories());
    }
    
    @GetMapping("/menu/category/{category}")
    public ResponseEntity<List<MenuItem>> getMenuByCategory(@PathVariable String category) {
        return ResponseEntity.ok(menuService.getMenuItemsByCategory(category));
    }
    
    @PostMapping("/order")
    public ResponseEntity<Order> placeOrder(@Valid @RequestBody OrderRequest request, Authentication authentication) {
        String customerId = authentication.getName();
        Order order = orderService.createOrder(request, customerId);
        return ResponseEntity.ok(order);
    }
    
    @GetMapping("/orders")
    public ResponseEntity<List<Order>> getMyOrders(Authentication authentication) {
        String customerId = authentication.getName();
        return ResponseEntity.ok(orderService.getOrdersByCustomer(customerId));
    }
    
    @GetMapping("/order/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable String id, Authentication authentication) {
        String customerId = authentication.getName();
        Order order = orderService.getOrderById(id);
        if (!order.getCustomerId().equals(customerId)) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(order);
    }
    
    @PostMapping("/payment")
    public ResponseEntity<Payment> processPayment(@Valid @RequestBody PaymentRequest request, Authentication authentication) {
        String customerId = authentication.getName();
        Payment payment = paymentService.processPayment(request, customerId);
        return ResponseEntity.ok(payment);
    }
    
    @PostMapping("/feedback")
    public ResponseEntity<Feedback> submitFeedback(@Valid @RequestBody FeedbackRequest request, Authentication authentication) {
        String customerId = authentication.getName();
        Feedback feedback = feedbackService.createFeedback(request, customerId);
        return ResponseEntity.ok(feedback);
    }
}

