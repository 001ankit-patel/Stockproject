import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoryBreakdown {
  category: string;
  productCount: number;
  totalQuantity: number;
  totalValue: number;
  percentage: number;
}

export interface DailyTrend {
  day: string;
  date: string;
  orderCount: number;
  revenue: number;
}

export interface ProductItem {
  id: number;
  name: string;
  barcode: string;
  category: string;
  price: number;
  quantity: number;
}

export interface DashboardStats {
  totalProducts: number;
  totalStock: number;
  totalOrders: number;
  totalSuppliers: number;
  lowStock: number;
  pendingOrders: number;
  totalLocations: number;
  totalSales: number;
  ordersByStatus: Record<string, number>;
  categoryBreakdown?: CategoryBreakdown[];
  weeklyOrdersTrend?: DailyTrend[];
  lowStockProducts?: ProductItem[];
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:8080/api/dashboard';

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiUrl);
  }
}
