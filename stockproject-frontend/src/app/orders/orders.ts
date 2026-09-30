import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService, OrderItem } from '../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class Orders implements OnInit {

  searchText = '';
  statusFilter = 'ALL';
  orders: OrderItem[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Failed to load orders from backend:', err);
      }
    });
  }

  get filteredOrders(): OrderItem[] {
    const search = this.searchText.toLowerCase().trim();

    return this.orders.filter(order => {
      const matchesSearch = !search ||
        (order.id ? order.id.toString().includes(search) : false) ||
        (order.customer ? order.customer.toLowerCase().includes(search) : false) ||
        (order.product ? order.product.toLowerCase().includes(search) : false) ||
        (order.status ? order.status.toLowerCase().includes(search) : false);

      const matchesStatus = this.statusFilter === 'ALL' || order.status === this.statusFilter;

      return matchesSearch && matchesStatus;
    });
  }

  setStatusFilter(status: string): void {
    this.statusFilter = status;
  }

  get totalOrders(): number {
    return this.orders.length;
  }

  get pendingOrders(): number {
    return this.orders.filter(order => order.status === 'Pending').length;
  }

  get processingOrders(): number {
    return this.orders.filter(order => order.status === 'Processing').length;
  }

  get completedOrders(): number {
    return this.orders.filter(order => order.status === 'Completed').length;
  }

  get totalSales(): number {
    return this.orders.reduce((total, order) => total + (order.total || 0), 0);
  }

  refreshOrders(): void {
    this.searchText = '';
    this.statusFilter = 'ALL';
    this.loadOrders();
  }

  exportCSV(): void {
    if (this.orders.length === 0) return;
    const headers = ['Order ID', 'Customer', 'Product', 'Quantity', 'Total', 'Date', 'Status'];
    const rows = this.orders.map(o => [
      o.id,
      `"${(o.customer || '').replace(/"/g, '""')}"`,
      `"${(o.product || '').replace(/"/g, '""')}"`,
      o.quantity,
      o.total,
      `"${o.date || ''}"`,
      `"${o.status || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StockSmart_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}