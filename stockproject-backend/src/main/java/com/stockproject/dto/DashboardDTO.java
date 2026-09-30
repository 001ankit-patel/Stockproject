package com.stockproject.dto;

import com.stockproject.entity.Product;
import java.util.List;
import java.util.Map;

public class DashboardDTO {

    private long totalProducts;
    private long totalStock;
    private long totalOrders;
    private long totalSuppliers;
    private long lowStock;
    private long pendingOrders;
    private long totalLocations;
    private double totalSales;
    private Map<String, Long> ordersByStatus;

    private List<CategoryBreakdownDTO> categoryBreakdown;
    private List<DailyTrendDTO> weeklyOrdersTrend;
    private List<Product> lowStockProducts;

    public DashboardDTO() {}

    public long getTotalProducts() { return totalProducts; }
    public void setTotalProducts(long totalProducts) { this.totalProducts = totalProducts; }

    public long getTotalStock() { return totalStock; }
    public void setTotalStock(long totalStock) { this.totalStock = totalStock; }

    public long getTotalOrders() { return totalOrders; }
    public void setTotalOrders(long totalOrders) { this.totalOrders = totalOrders; }

    public long getTotalSuppliers() { return totalSuppliers; }
    public void setTotalSuppliers(long totalSuppliers) { this.totalSuppliers = totalSuppliers; }

    public long getLowStock() { return lowStock; }
    public void setLowStock(long lowStock) { this.lowStock = lowStock; }

    public long getPendingOrders() { return pendingOrders; }
    public void setPendingOrders(long pendingOrders) { this.pendingOrders = pendingOrders; }

    public long getTotalLocations() { return totalLocations; }
    public void setTotalLocations(long totalLocations) { this.totalLocations = totalLocations; }

    public double getTotalSales() { return totalSales; }
    public void setTotalSales(double totalSales) { this.totalSales = totalSales; }

    public Map<String, Long> getOrdersByStatus() { return ordersByStatus; }
    public void setOrdersByStatus(Map<String, Long> ordersByStatus) { this.ordersByStatus = ordersByStatus; }

    public List<CategoryBreakdownDTO> getCategoryBreakdown() { return categoryBreakdown; }
    public void setCategoryBreakdown(List<CategoryBreakdownDTO> categoryBreakdown) { this.categoryBreakdown = categoryBreakdown; }

    public List<DailyTrendDTO> getWeeklyOrdersTrend() { return weeklyOrdersTrend; }
    public void setWeeklyOrdersTrend(List<DailyTrendDTO> weeklyOrdersTrend) { this.weeklyOrdersTrend = weeklyOrdersTrend; }

    public List<Product> getLowStockProducts() { return lowStockProducts; }
    public void setLowStockProducts(List<Product> lowStockProducts) { this.lowStockProducts = lowStockProducts; }
}
