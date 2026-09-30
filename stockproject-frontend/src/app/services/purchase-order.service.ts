import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PurchaseOrderItem {
  id?: number;
  supplier: string;
  product: string;
  quantity: number;
  total: number;
  orderDate: string;
  expectedDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  private apiUrl = 'http://localhost:8080/api/purchase-orders';

  constructor(private http: HttpClient) {}

  getPurchaseOrders(status?: string): Observable<PurchaseOrderItem[]> {
    const url = status ? `${this.apiUrl}?status=${status}` : this.apiUrl;
    return this.http.get<PurchaseOrderItem[]>(url);
  }

  getPurchaseOrderById(id: number): Observable<PurchaseOrderItem> {
    return this.http.get<PurchaseOrderItem>(`${this.apiUrl}/${id}`);
  }

  createPurchaseOrder(order: PurchaseOrderItem): Observable<PurchaseOrderItem> {
    return this.http.post<PurchaseOrderItem>(this.apiUrl, order);
  }

  updatePurchaseOrder(id: number, order: PurchaseOrderItem): Observable<PurchaseOrderItem> {
    return this.http.put<PurchaseOrderItem>(`${this.apiUrl}/${id}`, order);
  }

  deletePurchaseOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
