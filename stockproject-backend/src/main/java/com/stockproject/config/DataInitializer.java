package com.stockproject.config;

import com.stockproject.entity.*;
import com.stockproject.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(
            ProductRepository productRepo,
            OrderRepository orderRepo,
            SupplierRepository supplierRepo,
            LocationRepository locationRepo,
            PurchaseOrderRepository poRepo,
            InventoryRepository invRepo) {
        return args -> {
            if (productRepo.count() == 0) {
                productRepo.saveAll(List.of(
                        new Product("Wireless Mouse", "8901234567890", "Electronics", 29.99, 150),
                        new Product("Mechanical Keyboard", "8901234567891", "Electronics", 89.99, 8),
                        new Product("USB-C Hub", "8901234567892", "Accessories", 45.00, 75),
                        new Product("27-inch Monitor", "8901234567893", "Electronics", 299.99, 20),
                        new Product("Ergonomic Chair", "8901234567894", "Furniture", 199.99, 5),
                        new Product("Desk Mat", "8901234567895", "Accessories", 19.99, 200)
                ));
            }

            if (supplierRepo.count() == 0) {
                supplierRepo.saveAll(List.of(
                        new Supplier("TechSupply Global", "John Doe", "+1-555-0101", "john@techsupply.com", "123 Tech Park, San Jose, CA"),
                        new Supplier("ElectroHub Inc.", "Alice Smith", "+1-555-0102", "alice@electrohub.com", "456 Silicon Way, Austin, TX"),
                        new Supplier("OfficeComforts Ltd.", "Robert Brown", "+1-555-0103", "robert@officecomforts.com", "789 Comfort Blvd, Chicago, IL")
                ));
            }

            if (locationRepo.count() == 0) {
                locationRepo.saveAll(List.of(
                        new Location("Main Warehouse", "Warehouse", "100 Industrial Parkway, Dallas, TX", "Michael Scott", 12500, "Active"),
                        new Location("East Coast Hub", "Warehouse", "25 Harbor Rd, Newark, NJ", "Jim Halpert", 8400, "Active"),
                        new Location("Downtown Store #1", "Store", "12 Fifth Ave, New York, NY", "Pam Beesly", 1200, "Active"),
                        new Location("West Coast Fulfillment", "Warehouse", "99 Pacific Hwy, Seattle, WA", "Dwight Schrute", 15300, "Active")
                ));
            }

            if (orderRepo.count() == 0) {
                orderRepo.saveAll(List.of(
                        new Order("Acme Corp", "Wireless Mouse", 5, 149.95, LocalDate.now().minusDays(2), "Completed"),
                        new Order("Globex Corp", "Mechanical Keyboard", 2, 179.98, LocalDate.now().minusDays(1), "Processing"),
                        new Order("Initech Inc", "27-inch Monitor", 3, 899.97, LocalDate.now(), "Pending"),
                        new Order("Umbrella Corp", "Ergonomic Chair", 1, 199.99, LocalDate.now().minusDays(3), "Completed"),
                        new Order("Stark Industries", "USB-C Hub", 10, 450.00, LocalDate.now().minusDays(4), "Completed")
                ));
            }

            if (poRepo.count() == 0) {
                poRepo.saveAll(List.of(
                        new PurchaseOrder("TechSupply Global", "Wireless Mouse", 100, 1800.00, LocalDate.now().minusDays(5), LocalDate.now().plusDays(2), "Shipped"),
                        new PurchaseOrder("ElectroHub Inc.", "Mechanical Keyboard", 50, 2500.00, LocalDate.now().minusDays(1), LocalDate.now().plusDays(5), "Pending"),
                        new PurchaseOrder("OfficeComforts Ltd.", "Ergonomic Chair", 20, 2200.00, LocalDate.now().minusDays(10), LocalDate.now().minusDays(1), "Delivered")
                ));
            }

            if (invRepo.count() == 0) {
                invRepo.saveAll(List.of(
                        new Inventory("Wireless Mouse", "8901234567890", "Electronics", "Main Warehouse", 100, "In Stock"),
                        new Inventory("Wireless Mouse", "8901234567890", "Electronics", "Downtown Store #1", 50, "In Stock"),
                        new Inventory("Mechanical Keyboard", "8901234567891", "Electronics", "Main Warehouse", 8, "Low Stock"),
                        new Inventory("27-inch Monitor", "8901234567893", "Electronics", "West Coast Fulfillment", 20, "In Stock"),
                        new Inventory("Ergonomic Chair", "8901234567894", "Furniture", "Main Warehouse", 5, "Low Stock")
                ));
            }
        };
    }
}
