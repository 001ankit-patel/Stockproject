import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-barcode',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './barcode.html',
  styleUrl: './barcode.css'
})
export class Barcode {

  barcode: string = '';
  product: Product | null = null;
  message: string = '';
  statusType: 'success' | 'error' | 'info' = 'info';
  isSearching: boolean = false;

  recentScans: Product[] = [];

  constructor(private productService: ProductService) {}

  scanBarcode(): void {
    const code = this.barcode.trim();
    if (!code) {
      this.message = 'Please input or scan a barcode SKU.';
      this.statusType = 'error';
      return;
    }

    this.isSearching = true;
    this.message = '';

    // First try direct barcode lookup endpoint
    this.productService.getProductByBarcode(code).subscribe({
      next: (prod) => {
        this.isSearching = false;
        if (prod && prod.id) {
          this.product = prod;
          this.message = `Product identified: ${prod.name}`;
          this.statusType = 'success';
          this.addToRecent(prod);
        } else {
          this.fallbackSearch(code);
        }
      },
      error: () => {
        this.fallbackSearch(code);
      }
    });
  }

  private fallbackSearch(code: string): void {
    // Search within all products in case barcode format has whitespace or partial
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.isSearching = false;
        const matched = products.find(p => p.barcode && p.barcode.trim().toLowerCase() === code.toLowerCase());
        if (matched) {
          this.product = matched;
          this.message = `Verified Product: ${matched.name}`;
          this.statusType = 'success';
          this.addToRecent(matched);
        } else {
          this.product = null;
          this.message = `No product found matching barcode "${code}".`;
          this.statusType = 'error';
        }
      },
      error: () => {
        this.isSearching = false;
        this.message = `Barcode scan verification error for "${code}".`;
        this.statusType = 'error';
      }
    });
  }

  private addToRecent(prod: Product): void {
    if (!this.recentScans.some(p => p.id === prod.id)) {
      this.recentScans.unshift(prod);
      if (this.recentScans.length > 5) {
        this.recentScans.pop();
      }
    }
  }

  clearBarcode(): void {
    this.barcode = '';
    this.product = null;
    this.message = '';
    this.statusType = 'info';
  }

  selectRecent(prod: Product): void {
    this.product = prod;
    this.barcode = prod.barcode;
    this.message = `Selected from history: ${prod.name}`;
    this.statusType = 'info';
  }
}