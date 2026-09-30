import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  id?: number;
  product: string;
  barcode: string;
  category: string;
  location: string;
  quantity: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'http://localhost:8080/api/inventory';

  constructor(private http: HttpClient) {}

  getInventory(location?: string): Observable<InventoryItem[]> {
    const url = location ? `${this.apiUrl}?location=${location}` : this.apiUrl;
    return this.http.get<InventoryItem[]>(url);
  }

  getLowStockInventory(threshold: number = 15): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.apiUrl}/low-stock?threshold=${threshold}`);
  }

  getInventoryById(id: number): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.apiUrl}/${id}`);
  }

  createInventory(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.apiUrl, item);
  }

  updateInventory(id: number, item: InventoryItem): Observable<InventoryItem> {
    return this.http.put<InventoryItem>(`${this.apiUrl}/${id}`, item);
  }

  deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
