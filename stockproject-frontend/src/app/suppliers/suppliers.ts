import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierService, SupplierItem } from '../services/supplier.service';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css'
})
export class Suppliers implements OnInit {

  suppliers: SupplierItem[] = [];
  searchText: string = '';
  showAddModal: boolean = false;

  supplier: SupplierItem = {
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: ''
  };

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
      },
      error: (err) => {
        console.error('Failed to load suppliers:', err);
      }
    });
  }

  get filteredSuppliers(): SupplierItem[] {
    const term = this.searchText.toLowerCase().trim();
    if (!term) return this.suppliers;

    return this.suppliers.filter(s =>
      (s.name && s.name.toLowerCase().includes(term)) ||
      (s.contactPerson && s.contactPerson.toLowerCase().includes(term)) ||
      (s.email && s.email.toLowerCase().includes(term)) ||
      (s.phone && s.phone.includes(term)) ||
      (s.address && s.address.toLowerCase().includes(term))
    );
  }

  addSupplier(): void {
    if (!this.supplier.name.trim()) {
      alert('Supplier name is required!');
      return;
    }

    this.supplierService.createSupplier(this.supplier).subscribe({
      next: (created) => {
        this.suppliers.push(created);
        this.supplier = {
          name: '',
          contactPerson: '',
          phone: '',
          email: '',
          address: ''
        };
        this.showAddModal = false;
      },
      error: (err) => {
        console.error('Failed to add supplier:', err);
        alert('Failed to add supplier.');
      }
    });
  }

  deleteSupplier(id?: number): void {
    if (!id || !confirm('Are you sure you want to delete this supplier?')) return;

    this.supplierService.deleteSupplier(id).subscribe({
      next: () => {
        this.suppliers = this.suppliers.filter(s => s.id !== id);
      },
      error: (err) => {
        console.error('Failed to delete supplier:', err);
        alert('Failed to delete supplier.');
      }
    });
  }
}