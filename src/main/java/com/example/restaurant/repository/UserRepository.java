package com.example.restaurant.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.restaurant.model.Role;
import com.example.restaurant.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    Optional<User> findByUsernameAndRole(String username, Role role);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

