import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderService, PurchaseOrderItem } from '../services/purchase-order.service';

@Component({
  selector: 'app-purchase-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-orders.html',
  styleUrl: './purchase-orders.css'
})
export class PurchaseOrders implements OnInit {

  searchText = '';
  purchaseOrders: PurchaseOrderItem[] = [];

  constructor(private poService: PurchaseOrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.poService.getPurchaseOrders().subscribe({
      next: (data) => {
        this.purchaseOrders = data;
      },
      error: (err) => {
        console.error('Failed to load purchase orders:', err);
      }
    });
  }

  get filteredPurchaseOrders(): PurchaseOrderItem[] {
    const search = this.searchText.toLowerCase().trim();

    if (!search) {
      return this.purchaseOrders;
    }

    return this.purchaseOrders.filter(order =>
      (order.id ? order.id.toString().includes(search) : false) ||
      (order.supplier ? order.supplier.toLowerCase().includes(search) : false) ||
      (order.product ? order.product.toLowerCase().includes(search) : false) ||
      (order.status ? order.status.toLowerCase().includes(search) : false)
    );
  }

  get totalOrders(): number {
    return this.purchaseOrders.length;
  }

  get pendingOrders(): number {
    return this.purchaseOrders.filter(
      order => order.status === 'Pending'
    ).length;
  }

  get approvedOrders(): number {
    return this.purchaseOrders.filter(
      order => order.status === 'Approved' || order.status === 'Shipped'
    ).length;
  }

  get receivedOrders(): number {
    return this.purchaseOrders.filter(
      order => order.status === 'Received' || order.status === 'Delivered'
    ).length;
  }

  get totalPurchaseValue(): number {
    return this.purchaseOrders.reduce(
      (total, order) => total + (order.total || 0),
      0
    );
  }

  refreshOrders(): void {
    this.searchText = '';
    this.loadOrders();
  }
}