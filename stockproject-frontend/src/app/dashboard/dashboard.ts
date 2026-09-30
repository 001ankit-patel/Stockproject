import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService, DashboardStats, CategoryBreakdown, DailyTrend, ProductItem } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  totalProducts = 0;
  totalStock = 0;
  totalOrders = 0;
  totalSuppliers = 0;
  totalLocations = 0;
  lowStock = 0;
  pendingOrders = 0;
  totalSales = 0;

  categoryBreakdown: CategoryBreakdown[] = [];
  weeklyTrend: DailyTrend[] = [];
  lowStockItems: ProductItem[] = [];

  // Interactive Chart State
  chartMetric: 'orders' | 'revenue' = 'orders';
  hoveredBar: DailyTrend | null = null;
  selectedCategory: string | null = null;
  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.dashboardService.getStats().subscribe({
      next: (stats: DashboardStats) => {
        this.totalProducts = stats.totalProducts || 0;
        this.totalStock = stats.totalStock || 0;
        this.totalOrders = stats.totalOrders || 0;
        this.totalSuppliers = stats.totalSuppliers || 0;
        this.lowStock = stats.lowStock || 0;
        this.pendingOrders = stats.pendingOrders || 0;
        this.totalLocations = stats.totalLocations || 0;
        this.totalSales = stats.totalSales || 0;

        this.categoryBreakdown = stats.categoryBreakdown || [];
        this.weeklyTrend = stats.weeklyOrdersTrend || [];
        this.lowStockItems = stats.lowStockProducts || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load dashboard metrics from backend:', err);
        this.loading = false;
      }
    });
  }

  setChartMetric(metric: 'orders' | 'revenue'): void {
    this.chartMetric = metric;
  }

  getMaxChartValue(): number {
    if (!this.weeklyTrend || this.weeklyTrend.length === 0) return 10;
    const values = this.weeklyTrend.map(d => this.chartMetric === 'orders' ? d.orderCount : d.revenue);
    const max = Math.max(...values, 0);
    return max === 0 ? 10 : max;
  }

  getBarHeight(item: DailyTrend): number {
    const max = this.getMaxChartValue();
    const val = this.chartMetric === 'orders' ? item.orderCount : item.revenue;
    if (max === 0) return 10;
    const pct = (val / max) * 100;
    return Math.max(pct, 6); // minimum 6% height for visibility
  }

  formatCurrency(val: number): string {
    return '₹' + Number(val || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  getCategoryColor(index: number): string {
    const palette = ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
    return palette[index % palette.length];
  }
}