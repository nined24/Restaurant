package com.example.restaurant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.restaurant.dto.LoginRequest;
import com.example.restaurant.dto.LoginResponse;
import com.example.restaurant.dto.SignupRequest;
import com.example.restaurant.model.Role;
import com.example.restaurant.model.User;
import com.example.restaurant.repository.UserRepository;
import com.example.restaurant.util.JwtUtil;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsernameAndRole(request.getUsername(), request.getRole())
                .orElseThrow(() -> new RuntimeException("Invalid username or role"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        
        if (!user.isActive()) {
            throw new RuntimeException("User account is inactive");
        }
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        
        return new LoginResponse(token, user.getUsername(), user.getRole(), "Login successful");
    }
    
    public void createDefaultUsers() {
        if (userRepository.count() == 0) {
            // Create default manager
            User manager = new User();
            manager.setUsername("manager");
            manager.setEmail("manager@gustoso.com");
            manager.setPassword(passwordEncoder.encode("manager123"));
            manager.setRole(Role.MANAGER);
            manager.setActive(true);
            userRepository.save(manager);
            
            // Create default kitchen staff
            User kitchen = new User();
            kitchen.setUsername("kitchen");
            kitchen.setEmail("kitchen@gustoso.com");
            kitchen.setPassword(passwordEncoder.encode("kitchen123"));
            kitchen.setRole(Role.KITCHEN_STAFF);
            kitchen.setActive(true);
            userRepository.save(kitchen);
            
            // Create default customer
            User customer = new User();
            customer.setUsername("customer");
            customer.setEmail("customer@gustoso.com");
            customer.setPassword(passwordEncoder.encode("customer123"));
            customer.setRole(Role.CUSTOMER);
            customer.setActive(true);
            userRepository.save(customer);
        }
    }
    
    public void resetUsers() {
        // Delete all existing users
        userRepository.deleteAll();
        
        // Create default manager
        User manager = new User();
        manager.setUsername("manager");
        manager.setEmail("manager@gustoso.com");
        manager.setPassword(passwordEncoder.encode("manager123"));
        manager.setRole(Role.MANAGER);
        manager.setActive(true);
        userRepository.save(manager);
        
        // Create default kitchen staff
        User kitchen = new User();
        kitchen.setUsername("kitchen");
        kitchen.setEmail("kitchen@gustoso.com");
        kitchen.setPassword(passwordEncoder.encode("kitchen123"));
        kitchen.setRole(Role.KITCHEN_STAFF);
        kitchen.setActive(true);
        userRepository.save(kitchen);
        
        // Create default customer
        User customer = new User();
        customer.setUsername("customer");
        customer.setEmail("customer@gustoso.com");
        customer.setPassword(passwordEncoder.encode("customer123"));
        customer.setRole(Role.CUSTOMER);
        customer.setActive(true);
        userRepository.save(customer);
    }

    public LoginResponse signup(SignupRequest request) {
        // Check if username already exists
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getUsername() + "@gustoso.com"); // Default email
        user.setRole(Role.valueOf(request.getRole()));
        user.setActive(true);

        // Save user
        User savedUser = userRepository.save(user);

        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getRole().name());

        // Return login response
        return new LoginResponse(token, savedUser.getUsername(), savedUser.getRole(), "Signup successful");
    }
}

