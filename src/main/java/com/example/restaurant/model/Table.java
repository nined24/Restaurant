package com.example.restaurant.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tables")
public class Table {
    @Id
    private String id;
    private String tableNumber;
    private String qrCode;
    private boolean available;
    private Integer capacity;
}

