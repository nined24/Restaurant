package com.example.restaurant.service;

import com.example.restaurant.model.MenuItem;
import com.example.restaurant.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MenuService {
    
    @Autowired
    private MenuItemRepository menuItemRepository;
    
    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findByAvailableTrueAndHiddenFalse();
    }
    
    public List<MenuItem> getMenuItemsByCategory(String category) {
        return menuItemRepository.findByCategoryAndAvailableTrueAndHiddenFalse(category);
    }
    
    public List<String> getAllCategories() {
        return menuItemRepository.findAll().stream()
                .filter(item -> item.isAvailable() && !item.isHidden())
                .map(MenuItem::getCategory)
                .distinct()
                .toList();
    }
    
    public MenuItem getMenuItemById(String id) {
        return menuItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
    }
    
    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }
    
    public MenuItem updateMenuItem(String id, MenuItem menuItem) {
        MenuItem existing = getMenuItemById(id);
        existing.setName(menuItem.getName());
        existing.setDescription(menuItem.getDescription());
        existing.setPrice(menuItem.getPrice());
        existing.setCategory(menuItem.getCategory());
        existing.setImageUrl(menuItem.getImageUrl());
        existing.setAvailable(menuItem.isAvailable());
        existing.setHidden(menuItem.isHidden());
        return menuItemRepository.save(existing);
    }
    
    public void deleteMenuItem(String id) {
        menuItemRepository.deleteById(id);
    }
    
    public MenuItem toggleMenuItemVisibility(String id) {
        MenuItem item = getMenuItemById(id);
        item.setHidden(!item.isHidden());
        return menuItemRepository.save(item);
    }
}

