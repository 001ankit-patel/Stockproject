package com.stockproject.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String type;

    private String address;

    private String manager;

    private Integer stock;

    @Column(nullable = false)
    private String status;

    public Location() {}

    public Location(String name, String type, String address, String manager, Integer stock, String status) {
        this.name = name;
        this.type = type;
        this.address = address;
        this.manager = manager;
        this.stock = stock;
        this.status = status;
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getManager() { return manager; }
    public void setManager(String manager) { this.manager = manager; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
