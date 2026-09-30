package com.stockproject.controller;

import com.stockproject.entity.Inventory;
import com.stockproject.service.InventoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping
    public ResponseEntity<List<Inventory>> getAllInventory(
            @RequestParam(required = false) String location) {
        if (location != null && !location.isEmpty()) {
            return ResponseEntity.ok(inventoryService.getInventoryByLocation(location));
        }
        return ResponseEntity.ok(inventoryService.getAllInventory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryById(@PathVariable Long id) {
        return ResponseEntity.ok(inventoryService.getInventoryById(id));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<List<Inventory>> getLowInventory(
            @RequestParam(defaultValue = "15") Integer threshold) {
        return ResponseEntity.ok(inventoryService.getLowInventory(threshold));
    }

    @PostMapping
    public ResponseEntity<Inventory> createInventory(@RequestBody Inventory inventory) {
        Inventory created = inventoryService.createInventory(inventory);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventory(
            @PathVariable Long id,
            @RequestBody Inventory inventoryDetails) {
        return ResponseEntity.ok(inventoryService.updateInventory(id, inventoryDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInventory(@PathVariable Long id) {
        inventoryService.deleteInventory(id);
        return ResponseEntity.noContent().build();
    }
}
