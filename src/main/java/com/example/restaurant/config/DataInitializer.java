package com.example.restaurant.config;

import com.example.restaurant.service.AuthService;
import com.example.restaurant.service.MenuService;
import com.example.restaurant.service.TableService;
import com.example.restaurant.model.MenuItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private MenuService menuService;
    
    @Autowired
    private TableService tableService;
    
    @Override
    public void run(String... args) {
        // Initialize default users
        authService.createDefaultUsers();
        
        // Create sample tables
        if (tableService.getAllTables().isEmpty()) {
            for (int i = 1; i <= 10; i++) {
                tableService.createTable("T" + i, 4);
            }
        }
        
        // Create sample menu items
        if (menuService.getAllMenuItems().isEmpty()) {
            createSampleMenuItems();
        }
    }
    
    private void createSampleMenuItems() {
        // Appetizers
        MenuItem item1 = new MenuItem();
        item1.setName("Bruschetta");
        item1.setDescription("Toasted bread with tomatoes, garlic, and basil");
        item1.setPrice(new BigDecimal("8.99"));
        item1.setCategory("Appetizers");
        item1.setAvailable(true);
        item1.setHidden(false);
        menuService.createMenuItem(item1);
        
        MenuItem item2 = new MenuItem();
        item2.setName("Caesar Salad");
        item2.setDescription("Fresh romaine lettuce with caesar dressing");
        item2.setPrice(new BigDecimal("10.99"));
        item2.setCategory("Appetizers");
        item2.setAvailable(true);
        item2.setHidden(false);
        menuService.createMenuItem(item2);
        
        // Main Courses
        MenuItem item3 = new MenuItem();
        item3.setName("Margherita Pizza");
        item3.setDescription("Classic pizza with tomato, mozzarella, and basil");
        item3.setPrice(new BigDecimal("14.99"));
        item3.setCategory("Main Courses");
        item3.setAvailable(true);
        item3.setHidden(false);
        menuService.createMenuItem(item3);
        
        MenuItem item4 = new MenuItem();
        item4.setName("Grilled Salmon");
        item4.setDescription("Fresh salmon with vegetables and rice");
        item4.setPrice(new BigDecimal("22.99"));
        item4.setCategory("Main Courses");
        item4.setAvailable(true);
        item4.setHidden(false);
        menuService.createMenuItem(item4);
        
        MenuItem item5 = new MenuItem();
        item5.setName("Beef Steak");
        item5.setDescription("Tender beef steak with mashed potatoes");
        item5.setPrice(new BigDecimal("28.99"));
        item5.setCategory("Main Courses");
        item5.setAvailable(true);
        item5.setHidden(false);
        menuService.createMenuItem(item5);
        
        // Desserts
        MenuItem item6 = new MenuItem();
        item6.setName("Tiramisu");
        item6.setDescription("Classic Italian dessert");
        item6.setPrice(new BigDecimal("7.99"));
        item6.setCategory("Desserts");
        item6.setAvailable(true);
        item6.setHidden(false);
        menuService.createMenuItem(item6);
        
        MenuItem item7 = new MenuItem();
        item7.setName("Chocolate Cake");
        item7.setDescription("Rich chocolate cake with cream");
        item7.setPrice(new BigDecimal("6.99"));
        item7.setCategory("Desserts");
        item7.setAvailable(true);
        item7.setHidden(false);
        menuService.createMenuItem(item7);
        
        // Beverages
        MenuItem item8 = new MenuItem();
        item8.setName("Coca Cola");
        item8.setDescription("Refreshing soft drink");
        item8.setPrice(new BigDecimal("3.99"));
        item8.setCategory("Beverages");
        item8.setAvailable(true);
        item8.setHidden(false);
        menuService.createMenuItem(item8);
        
        MenuItem item9 = new MenuItem();
        item9.setName("Fresh Orange Juice");
        item9.setDescription("Freshly squeezed orange juice");
        item9.setPrice(new BigDecimal("4.99"));
        item9.setCategory("Beverages");
        item9.setAvailable(true);
        item9.setHidden(false);
        menuService.createMenuItem(item9);
    }
}

