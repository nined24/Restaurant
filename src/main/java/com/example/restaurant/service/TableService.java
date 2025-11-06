package com.example.restaurant.service;

import com.example.restaurant.model.Table;
import com.example.restaurant.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class TableService {
    
    @Autowired
    private TableRepository tableRepository;
    
    public Table getTableByQRCode(String qrCode) {
        return tableRepository.findByQrCode(qrCode)
                .orElseThrow(() -> new RuntimeException("Table not found for QR code"));
    }
    
    public Table createTable(String tableNumber, Integer capacity) {
        Table table = new Table();
        table.setTableNumber(tableNumber);
        table.setQrCode("TABLE_" + tableNumber + "_" + UUID.randomUUID().toString().substring(0, 8));
        table.setAvailable(true);
        table.setCapacity(capacity);
        return tableRepository.save(table);
    }
    
    public List<Table> getAllTables() {
        return tableRepository.findAll();
    }
    
    public Table getTableById(String id) {
        return tableRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found"));
    }
}

