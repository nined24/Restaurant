package com.example.restaurant.model;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    private String menuItemId;
    private String menuItemName;
    private Integer quantity;
    private BigDecimal price;
    private String specialInstructions;
}

