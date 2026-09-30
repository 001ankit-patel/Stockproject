package com.stockproject.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String customer;

    @Column(nullable = false)
    private String product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(nullable = false)
    private Double total;

    private LocalDate date;

    @Column(nullable = false)
    private String status;

    public Order() {}

    public Order(String customer, String product, Integer quantity, Double total, LocalDate date, String status) {
        this.customer = customer;
        this.product = product;
        this.quantity = quantity;
        this.total = total;
        this.date = date;
        this.status = status;
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomer() { return customer; }
    public void setCustomer(String customer) { this.customer = customer; }

    public String getProduct() { return product; }
    public void setProduct(String product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getTotal() { return total; }
    public void setTotal(Double total) { this.total = total; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
