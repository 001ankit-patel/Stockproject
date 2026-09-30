package com.stockproject.dto;

import com.stockproject.entity.Product;

public class ProductDTO {

    private Long id;
    private String name;
    private String barcode;
    private String category;
    private Double price;
    private Integer quantity;

    public ProductDTO() {}

    public ProductDTO(Long id, String name, String barcode, String category, Double price, Integer quantity) {
        this.id = id;
        this.name = name;
        this.barcode = barcode;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
    }

    public static ProductDTO fromEntity(Product product) {
        if (product == null) return null;
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getBarcode(),
                product.getCategory(),
                product.getPrice(),
                product.getQuantity()
        );
    }

    public Product toEntity() {
        Product p = new Product();
        p.setId(this.id);
        p.setName(this.name);
        p.setBarcode(this.barcode);
        p.setCategory(this.category);
        p.setPrice(this.price);
        p.setQuantity(this.quantity);
        return p;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBarcode() { return barcode; }
    public void setBarcode(String barcode) { this.barcode = barcode; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}
