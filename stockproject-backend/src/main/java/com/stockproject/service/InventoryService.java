package com.stockproject.service;

import com.stockproject.entity.Inventory;
import com.stockproject.exception.ResourceNotFoundException;
import com.stockproject.repository.InventoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory getInventoryById(Long id) {
        return inventoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory", id));
    }

    public List<Inventory> getInventoryByLocation(String location) {
        return inventoryRepository.findByLocation(location);
    }

    public List<Inventory> getLowInventory(Integer threshold) {
        return inventoryRepository.findByQuantityLessThan(threshold);
    }

    public Inventory createInventory(Inventory inventory) {
        return inventoryRepository.save(inventory);
    }

    public Inventory updateInventory(Long id, Inventory inventoryDetails) {
        Inventory inv = getInventoryById(id);

        inv.setProduct(inventoryDetails.getProduct());
        inv.setBarcode(inventoryDetails.getBarcode());
        inv.setCategory(inventoryDetails.getCategory());
        inv.setLocation(inventoryDetails.getLocation());
        inv.setQuantity(inventoryDetails.getQuantity());
        inv.setStatus(inventoryDetails.getStatus());

        return inventoryRepository.save(inv);
    }

    public void deleteInventory(Long id) {
        Inventory inv = getInventoryById(id);
        inventoryRepository.delete(inv);
    }

    public long getInventoryCount() {
        return inventoryRepository.count();
    }

    public long getTotalStock() {
        return inventoryRepository.findAll().stream()
                .mapToLong(Inventory::getQuantity)
                .sum();
    }
}
