package com.stockproject.service;

import com.stockproject.entity.Order;
import com.stockproject.exception.ResourceNotFoundException;
import com.stockproject.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order", id));
    }

    public List<Order> getOrdersByStatus(String status) {
        return orderRepository.findByStatus(status);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, Order orderDetails) {
        Order order = getOrderById(id);

        order.setCustomer(orderDetails.getCustomer());
        order.setProduct(orderDetails.getProduct());
        order.setQuantity(orderDetails.getQuantity());
        order.setTotal(orderDetails.getTotal());
        order.setDate(orderDetails.getDate());
        order.setStatus(orderDetails.getStatus());

        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        Order order = getOrderById(id);
        orderRepository.delete(order);
    }

    public long getOrderCount() {
        return orderRepository.count();
    }

    public long getPendingOrderCount() {
        return orderRepository.findByStatus("Pending").size();
    }

    public double getTotalSales() {
        return orderRepository.findAll().stream()
                .mapToDouble(Order::getTotal)
                .sum();
    }
}
