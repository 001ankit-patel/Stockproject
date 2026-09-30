package com.stockproject.service;

import com.stockproject.entity.PurchaseOrder;
import com.stockproject.exception.ResourceNotFoundException;
import com.stockproject.repository.PurchaseOrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseOrderService {

    private final PurchaseOrderRepository purchaseOrderRepository;

    public PurchaseOrderService(PurchaseOrderRepository purchaseOrderRepository) {
        this.purchaseOrderRepository = purchaseOrderRepository;
    }

    public List<PurchaseOrder> getAllPurchaseOrders() {
        return purchaseOrderRepository.findAll();
    }

    public PurchaseOrder getPurchaseOrderById(Long id) {
        return purchaseOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("PurchaseOrder", id));
    }

    public List<PurchaseOrder> getPurchaseOrdersByStatus(String status) {
        return purchaseOrderRepository.findByStatus(status);
    }

    public PurchaseOrder createPurchaseOrder(PurchaseOrder purchaseOrder) {
        return purchaseOrderRepository.save(purchaseOrder);
    }

    public PurchaseOrder updatePurchaseOrder(Long id, PurchaseOrder purchaseOrderDetails) {
        PurchaseOrder po = getPurchaseOrderById(id);

        po.setSupplier(purchaseOrderDetails.getSupplier());
        po.setProduct(purchaseOrderDetails.getProduct());
        po.setQuantity(purchaseOrderDetails.getQuantity());
        po.setTotal(purchaseOrderDetails.getTotal());
        po.setOrderDate(purchaseOrderDetails.getOrderDate());
        po.setExpectedDate(purchaseOrderDetails.getExpectedDate());
        po.setStatus(purchaseOrderDetails.getStatus());

        return purchaseOrderRepository.save(po);
    }

    public void deletePurchaseOrder(Long id) {
        PurchaseOrder po = getPurchaseOrderById(id);
        purchaseOrderRepository.delete(po);
    }

    public long getPurchaseOrderCount() {
        return purchaseOrderRepository.count();
    }
}
