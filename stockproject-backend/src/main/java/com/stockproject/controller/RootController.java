package com.stockproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping({"/", "/api"})
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("service", "StockProject Backend API");
        response.put("version", "1.0.0");
        response.put("database", "H2 In-Memory");
        response.put("h2-console", "http://localhost:8080/h2-console");

        Map<String, String> endpoints = new LinkedHashMap<>();
        endpoints.put("products", "http://localhost:8080/api/products");
        endpoints.put("orders", "http://localhost:8080/api/orders");
        endpoints.put("suppliers", "http://localhost:8080/api/suppliers");
        endpoints.put("locations", "http://localhost:8080/api/locations");
        endpoints.put("purchaseOrders", "http://localhost:8080/api/purchase-orders");
        endpoints.put("inventory", "http://localhost:8080/api/inventory");
        endpoints.put("dashboard", "http://localhost:8080/api/dashboard");

        response.put("endpoints", endpoints);
        return ResponseEntity.ok(response);
    }
}
