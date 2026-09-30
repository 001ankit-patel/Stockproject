import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OrderItem {
  id?: number;
  customer: string;
  product: string;
  quantity: number;
  total: number;
  date: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) {}

  getOrders(status?: string): Observable<OrderItem[]> {
    const url = status ? `${this.apiUrl}?status=${status}` : this.apiUrl;
    return this.http.get<OrderItem[]>(url);
  }

  getOrderById(id: number): Observable<OrderItem> {
    return this.http.get<OrderItem>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(this.apiUrl, order);
  }

  updateOrder(id: number, order: OrderItem): Observable<OrderItem> {
    return this.http.put<OrderItem>(`${this.apiUrl}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
