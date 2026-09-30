import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SupplierItem {
  id?: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl = 'http://localhost:8080/api/suppliers';

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<SupplierItem[]> {
    return this.http.get<SupplierItem[]>(this.apiUrl);
  }

  getSupplierById(id: number): Observable<SupplierItem> {
    return this.http.get<SupplierItem>(`${this.apiUrl}/${id}`);
  }

  createSupplier(supplier: SupplierItem): Observable<SupplierItem> {
    return this.http.post<SupplierItem>(this.apiUrl, supplier);
  }

  updateSupplier(id: number, supplier: SupplierItem): Observable<SupplierItem> {
    return this.http.put<SupplierItem>(`${this.apiUrl}/${id}`, supplier);
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
