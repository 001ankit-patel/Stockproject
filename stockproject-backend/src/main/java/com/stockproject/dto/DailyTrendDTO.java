package com.stockproject.dto;

public class DailyTrendDTO {
    private String day;
    private String date;
    private long orderCount;
    private double revenue;

    public DailyTrendDTO() {}

    public DailyTrendDTO(String day, String date, long orderCount, double revenue) {
        this.day = day;
        this.date = date;
        this.orderCount = orderCount;
        this.revenue = revenue;
    }

    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public long getOrderCount() { return orderCount; }
    public void setOrderCount(long orderCount) { this.orderCount = orderCount; }

    public double getRevenue() { return revenue; }
    public void setRevenue(double revenue) { this.revenue = revenue; }
}
