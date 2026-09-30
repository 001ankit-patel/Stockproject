package com.stockproject.repository;

import com.stockproject.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    List<Inventory> findByLocation(String location);

    List<Inventory> findByQuantityLessThan(Integer quantity);

    List<Inventory> findByProductContainingIgnoreCase(String product);
}
