package com.stockproject.repository;

import com.stockproject.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByBarcode(String barcode);

    List<Product> findByCategory(String category);

    List<Product> findByQuantityLessThan(Integer quantity);

    List<Product> findByNameContainingIgnoreCase(String name);
}
