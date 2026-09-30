package com.stockproject.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String supplier;

    @Column(nullable = false)
    private String product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double total;

    private LocalDate orderDate;

    private LocalDate expectedDate;

    @Column(nullable = false)
    private String status;

    public PurchaseOrder() {}

    public PurchaseOrder(String supplier, String product, Integer quantity, Double total,
                         LocalDate orderDate, LocalDate expectedDate, String status) {
        this.supplier = supplier;
        this.product = product;
        this.quantity = quantity;
        this.total = total;
        this.orderDate = orderDate;
        this.expectedDate = expectedDate;
        this.status = status;
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSupplier() { return supplier; }
    public void setSupplier(String supplier) { this.supplier = supplier; }

    public String getProduct() { return product; }
    public void setProduct(String product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public LocalDate getOrderDate() { return orderDate; }
    public void setOrderDate(LocalDate orderDate) { this.orderDate = orderDate; }

    public LocalDate getExpectedDate() { return expectedDate; }
    public void setExpectedDate(LocalDate expectedDate) { this.expectedDate = expectedDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
