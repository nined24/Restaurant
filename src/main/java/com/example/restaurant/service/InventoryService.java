package com.example.restaurant.service;

import com.example.restaurant.model.Inventory;
import com.example.restaurant.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {
    
    @Autowired
    private InventoryRepository inventoryRepository;
    
    public void decrementInventory(String itemName, Integer quantity) {
        Inventory inventory = inventoryRepository.findByItemName(itemName)
                .orElseGet(() -> {
                    Inventory newInventory = new Inventory();
                    newInventory.setItemName(itemName);
                    newInventory.setQuantity(100); // Default quantity
                    newInventory.setMinThreshold(10);
                    newInventory.setUnit("pieces");
                    return newInventory;
                });
        
        inventory.setQuantity(inventory.getQuantity() - quantity);
        inventory.setLowStock(inventory.getQuantity() <= inventory.getMinThreshold());
        inventoryRepository.save(inventory);
    }
    
    public List<Inventory> getLowStockItems() {
        return inventoryRepository.findByLowStockTrue();
    }
    
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
    
    public Inventory updateInventory(String id, Integer quantity, Integer minThreshold) {
        Inventory inventory = inventoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventory item not found"));
        
        inventory.setQuantity(quantity);
        inventory.setMinThreshold(minThreshold);
        inventory.setLowStock(quantity <= minThreshold);
        
        return inventoryRepository.save(inventory);
    }
}

