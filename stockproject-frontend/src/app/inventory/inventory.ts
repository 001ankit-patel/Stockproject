import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../services/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {

  searchText = '';
  inventory: InventoryItem[] = [];
  selectedLocation = 'ALL';
  locations: string[] = [];

  showAddModal = false;
  newItem: InventoryItem = {
    product: '',
    barcode: '',
    category: '',
    location: '',
    quantity: 0,
    status: 'In Stock'
  };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getInventory().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.inventory = data;
        } else {
          // Default initial set if database is newly initialized
          this.inventory = [
            { id: 1, product: 'Wireless Mouse', barcode: '89010001', category: 'Electronics', location: 'Main Warehouse', quantity: 45, status: 'In Stock' },
            { id: 2, product: 'Mechanical Keyboard', barcode: '89010002', category: 'Electronics', location: 'Retail Store A', quantity: 8, status: 'Low Stock' },
            { id: 3, product: 'USB-C Cable 2m', barcode: '89010003', category: 'Accessories', location: 'Distribution Hub', quantity: 120, status: 'In Stock' },
            { id: 4, product: 'Noise Cancelling Headphones', barcode: '89010004', category: 'Audio', location: 'Retail Store B', quantity: 3, status: 'Critical' }
          ];
        }
        this.extractLocations();
      },
      error: (err) => {
        console.warn('Backend inventory fallback:', err);
        this.inventory = [
          { id: 1, product: 'Wireless Mouse', barcode: '89010001', category: 'Electronics', location: 'Main Warehouse', quantity: 45, status: 'In Stock' },
          { id: 2, product: 'Mechanical Keyboard', barcode: '89010002', category: 'Electronics', location: 'Retail Store A', quantity: 8, status: 'Low Stock' },
          { id: 3, product: 'USB-C Cable 2m', barcode: '89010003', category: 'Accessories', location: 'Distribution Hub', quantity: 120, status: 'In Stock' }
        ];
        this.extractLocations();
      }
    });
  }

  extractLocations(): void {
    const locSet = new Set<string>();
    this.inventory.forEach(item => {
      if (item.location) locSet.add(item.location);
    });
    this.locations = Array.from(locSet).sort();
  }

  get filteredInventory(): InventoryItem[] {
    const search = this.searchText.toLowerCase().trim();

    return this.inventory.filter(item => {
      const matchesSearch = !search ||
        (item.product && item.product.toLowerCase().includes(search)) ||
        (item.barcode && item.barcode.toLowerCase().includes(search)) ||
        (item.category && item.category.toLowerCase().includes(search)) ||
        (item.location && item.location.toLowerCase().includes(search));

      const matchesLoc = this.selectedLocation === 'ALL' || item.location === this.selectedLocation;

      return matchesSearch && matchesLoc;
    });
  }

  get totalItems(): number {
    return this.inventory.reduce((total, item) => total + (item.quantity || 0), 0);
  }

  get lowStockItems(): number {
    return this.inventory.filter(item => item.quantity < 10).length;
  }

  get totalLocations(): number {
    return new Set(this.inventory.map(item => item.location)).size;
  }

  addItem(): void {
    if (!this.newItem.product || !this.newItem.location) {
      alert('Please enter product name and location.');
      return;
    }

    this.newItem.status = this.newItem.quantity < 10 ? 'Low Stock' : 'In Stock';
    this.inventoryService.createInventory(this.newItem).subscribe({
      next: (created) => {
        this.inventory.push(created);
        this.resetNewItem();
      },
      error: () => {
        // Local add fallback
        this.newItem.id = Date.now();
        this.inventory.push({ ...this.newItem });
        this.resetNewItem();
      }
    });
  }

  private resetNewItem(): void {
    this.newItem = { product: '', barcode: '', category: '', location: '', quantity: 0, status: 'In Stock' };
    this.showAddModal = false;
    this.extractLocations();
  }

  deleteItem(id?: number): void {
    if (!id || !confirm('Are you sure you want to remove this inventory record?')) return;
    this.inventoryService.deleteInventory(id).subscribe({
      next: () => {
        this.inventory = this.inventory.filter(i => i.id !== id);
      },
      error: () => {
        this.inventory = this.inventory.filter(i => i.id !== id);
      }
    });
  }

  exportCSV(): void {
    if (this.inventory.length === 0) return;
    const headers = ['ID', 'Product', 'Barcode', 'Category', 'Location', 'Quantity', 'Status'];
    const rows = this.inventory.map(i => [
      i.id,
      `"${(i.product || '').replace(/"/g, '""')}"`,
      `"${i.barcode || ''}"`,
      `"${i.category || ''}"`,
      `"${(i.location || '').replace(/"/g, '""')}"`,
      i.quantity,
      `"${i.status || ''}"`
    ]);

    const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', `StockSmart_Inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  refreshInventory(): void {
    this.searchText = '';
    this.selectedLocation = 'ALL';
    this.loadInventory();
  }
}