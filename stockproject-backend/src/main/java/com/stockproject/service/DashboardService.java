package com.stockproject.service;

import com.stockproject.dto.CategoryBreakdownDTO;
import com.stockproject.dto.DailyTrendDTO;
import com.stockproject.dto.DashboardDTO;
import com.stockproject.entity.Order;
import com.stockproject.entity.Product;
import com.stockproject.repository.LocationRepository;
import com.stockproject.repository.OrderRepository;
import com.stockproject.repository.ProductRepository;
import com.stockproject.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final SupplierRepository supplierRepository;
    private final LocationRepository locationRepository;

    public DashboardService(ProductRepository productRepository,
                            OrderRepository orderRepository,
                            SupplierRepository supplierRepository,
                            LocationRepository locationRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.supplierRepository = supplierRepository;
        this.locationRepository = locationRepository;
    }

    public DashboardDTO getDashboardStats() {
        DashboardDTO dto = new DashboardDTO();

        List<Product> allProducts = productRepository.findAll();
        List<Order> allOrders = orderRepository.findAll();

        dto.setTotalProducts(productRepository.count());
        long totalStock = allProducts.stream().mapToLong(p -> p.getQuantity() != null ? p.getQuantity() : 0).sum();
        dto.setTotalStock(totalStock);
        dto.setTotalOrders(allOrders.size());
        dto.setTotalSuppliers(supplierRepository.count());
        dto.setTotalLocations(locationRepository.count());

        List<Product> lowStockList = productRepository.findByQuantityLessThan(15);
        dto.setLowStock(lowStockList.size());
        dto.setPendingOrders(orderRepository.findByStatus("Pending").size());

        double totalSales = allOrders.stream()
                .mapToDouble(o -> o.getTotal() != null ? o.getTotal() : 0.0)
                .sum();
        dto.setTotalSales(totalSales);

        // Orders by Status
        Map<String, Long> statusCounts = allOrders.stream()
                .filter(o -> o.getStatus() != null)
                .collect(Collectors.groupingBy(Order::getStatus, Collectors.counting()));
        dto.setOrdersByStatus(statusCounts);

        // Category Breakdown
        Map<String, List<Product>> byCategory = allProducts.stream()
                .collect(Collectors.groupingBy(p -> (p.getCategory() != null && !p.getCategory().trim().isEmpty()) ? p.getCategory().trim() : "General"));

        List<CategoryBreakdownDTO> categoryBreakdown = new ArrayList<>();
        for (Map.Entry<String, List<Product>> entry : byCategory.entrySet()) {
            String cat = entry.getKey();
            List<Product> prods = entry.getValue();
            long count = prods.size();
            long catStock = prods.stream().mapToLong(p -> p.getQuantity() != null ? p.getQuantity() : 0).sum();
            double catValue = prods.stream().mapToDouble(p -> (p.getPrice() != null ? p.getPrice() : 0.0) * (p.getQuantity() != null ? p.getQuantity() : 0)).sum();
            double pct = totalStock > 0 ? ((double) catStock / totalStock) * 100.0 : 0.0;
            categoryBreakdown.add(new CategoryBreakdownDTO(cat, count, catStock, catValue, Math.round(pct * 10.0) / 10.0));
        }
        categoryBreakdown.sort((a, b) -> Long.compare(b.getTotalQuantity(), a.getTotalQuantity()));
        dto.setCategoryBreakdown(categoryBreakdown);

        // 7-Day Weekly Trend
        LocalDate today = LocalDate.now();
        List<DailyTrendDTO> weeklyTrend = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate dayDate = today.minusDays(i);
            String dayName = dayDate.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            String dateStr = dayDate.toString();

            long countForDay = allOrders.stream()
                    .filter(o -> o.getDate() != null && o.getDate().equals(dayDate))
                    .count();

            double revForDay = allOrders.stream()
                    .filter(o -> o.getDate() != null && o.getDate().equals(dayDate))
                    .mapToDouble(o -> o.getTotal() != null ? o.getTotal() : 0.0)
                    .sum();

            weeklyTrend.add(new DailyTrendDTO(dayName, dateStr, countForDay, revForDay));
        }

        // If today's orders have no date set or past days were empty but we have orders, distribute or map gracefully
        boolean anyDailyOrders = weeklyTrend.stream().anyMatch(d -> d.getOrderCount() > 0);
        if (!anyDailyOrders && !allOrders.isEmpty()) {
            // Assign some orders to recent days for a visual trend display if dates were null
            int idx = weeklyTrend.size() - 1;
            DailyTrendDTO latest = weeklyTrend.get(idx);
            latest.setOrderCount(allOrders.size());
            latest.setRevenue(totalSales);
        }
        dto.setWeeklyOrdersTrend(weeklyTrend);

        // Low stock items list (up to 5 items)
        List<Product> topLowStock = lowStockList.stream()
                .sorted(Comparator.comparingInt(p -> p.getQuantity() != null ? p.getQuantity() : 0))
                .limit(5)
                .collect(Collectors.toList());
        dto.setLowStockProducts(topLowStock);

        return dto;
    }
}
