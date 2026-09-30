package com.stockproject.dto;

public class CategoryBreakdownDTO {
    private String category;
    private long productCount;
    private long totalQuantity;
    private double totalValue;
    private double percentage;

    public CategoryBreakdownDTO() {}

    public CategoryBreakdownDTO(String category, long productCount, long totalQuantity, double totalValue, double percentage) {
        this.category = category;
        this.productCount = productCount;
        this.totalQuantity = totalQuantity;
        this.totalValue = totalValue;
        this.percentage = percentage;
    }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public long getProductCount() { return productCount; }
    public void setProductCount(long productCount) { this.productCount = productCount; }

    public long getTotalQuantity() { return totalQuantity; }
    public void setTotalQuantity(long totalQuantity) { this.totalQuantity = totalQuantity; }

    public double getTotalValue() { return totalValue; }
    public void setTotalValue(double totalValue) { this.totalValue = totalValue; }

    public double getPercentage() { return percentage; }
    public void setPercentage(double percentage) { this.percentage = percentage; }
}
