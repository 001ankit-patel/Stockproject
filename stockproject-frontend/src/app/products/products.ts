import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  products: Product[] = [];
  searchTerm: string = '';
  filterCategory: string = 'ALL';
  categories: string[] = [];

  showAddModal: boolean = false;

  product: Product = {
    name: '',
    barcode: '',
    category: '',
    price: 0,
    quantity: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.products = data;
        this.extractCategories();
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
      }
    });
  }

  extractCategories(): void {
    const set = new Set<string>();
    this.products.forEach(p => {
      if (p.category && p.category.trim()) {
        set.add(p.category.trim());
      }
    });
    this.categories = Array.from(set).sort();
  }

  get filteredProducts(): Product[] {
    return this.products.filter(p => {
      const term = this.searchTerm.toLowerCase().trim();
      const matchesSearch = !term ||
        (p.name && p.name.toLowerCase().includes(term)) ||
        (p.barcode && p.barcode.toLowerCase().includes(term)) ||
        (p.category && p.category.toLowerCase().includes(term));
      const matchesCategory = this.filterCategory === 'ALL' || p.category === this.filterCategory;
      return matchesSearch && matchesCategory;
    });
  }

  addProduct(): void {
    if (!this.product.name || !this.product.price) {
      alert('Please enter product name and price.');
      return;
    }

    this.productService.addProduct(this.product).subscribe({
      next: (data: Product) => {
        this.products.push(data);
        this.extractCategories();

        this.product = {
          name: '',
          barcode: '',
          category: '',
          price: 0,
          quantity: 0
        };

        this.showAddModal = false;
      },
      error: (error: any) => {
        console.error('Error adding product:', error);
        alert('Failed to add product. Please check backend connection.');
      }
    });
  }

  deleteProduct(id?: number): void {
    if (!id) return;

    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        this.extractCategories();
      },
      error: (error: any) => {
        console.error('Delete error:', error);
        alert('Failed to delete product.');
      }
    });
  }

  exportCSV(): void {
    if (this.products.length === 0) return;
    const headers = ['ID', 'Name', 'Barcode', 'Category', 'Price', 'Quantity'];
    const rows = this.products.map(p => [
      p.id,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.barcode || ''}"`,
      `"${p.category || ''}"`,
      p.price,
      p.quantity
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `StockSmart_Products_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}