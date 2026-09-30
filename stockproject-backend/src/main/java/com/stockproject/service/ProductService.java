package com.stockproject.service;

import com.stockproject.entity.Product;
import com.stockproject.exception.ResourceNotFoundException;
import com.stockproject.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
    }

    public Product getProductByBarcode(String barcode) {
        return productRepository.findByBarcode(barcode)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with barcode: " + barcode));
    }

    public List<Product> getLowStockProducts(Integer threshold) {
        return productRepository.findByQuantityLessThan(threshold);
    }

    public Product createProduct(Product product) {
        if (product.getBarcode() != null && product.getBarcode().trim().isEmpty()) {
            product.setBarcode(null);
        }
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);

        product.setName(productDetails.getName());
        String barcode = productDetails.getBarcode();
        if (barcode != null && barcode.trim().isEmpty()) {
            barcode = null;
        }
        product.setBarcode(barcode);
        product.setCategory(productDetails.getCategory());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }

    public long getProductCount() {
        return productRepository.count();
    }

    public long getTotalStock() {
        return productRepository.findAll().stream()
                .mapToLong(Product::getQuantity)
                .sum();
    }
}
