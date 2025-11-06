package com.example.restaurant.controller;

import com.example.restaurant.dto.QRScanRequest;
import com.example.restaurant.model.Table;
import com.example.restaurant.service.TableService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
@CrossOrigin(origins = "*")
public class PublicController {
    
    @Autowired
    private TableService tableService;
    
    @PostMapping("/scan-qr")
    public ResponseEntity<Table> scanQR(@Valid @RequestBody QRScanRequest request) {
        Table table = tableService.getTableByQRCode(request.getQrCode());
        return ResponseEntity.ok(table);
    }
}

