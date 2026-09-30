import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../services/dashboard.service';

interface ReportItem {
  name: string;
  description: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {

  totalProducts = 0;
  totalStock = 0;
  totalOrders = 0;
  totalSales = 0;
  totalSuppliers = 0;
  lowStock = 0;
  loading = true;

  reports: ReportItem[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.dashboardService.getStats().subscribe({
      next: (stats: DashboardStats) => {
        this.totalProducts = stats.totalProducts || 0;
        this.totalStock = stats.totalStock || 0;
        this.totalOrders = stats.totalOrders || 0;
        this.totalSales = stats.totalSales || 0;
        this.totalSuppliers = stats.totalSuppliers || 0;
        this.lowStock = stats.lowStock || 0;
        this.buildReports();
        this.loading = false;
      },
      error: () => {
        this.buildReports();
        this.loading = false;
      }
    });
  }

  buildReports(): void {
    this.reports = [
      {
        name: 'Inventory Summary',
        description: 'Complete product catalog, current stock levels, and valuation metrics',
        value: this.totalStock + ' Units across ' + this.totalProducts + ' SKUs',
        icon: '📦'
      },
      {
        name: 'Sales & Revenue',
        description: 'Order revenue breakdown, top-performing products, and daily sales trends',
        value: '₹' + Number(this.totalSales).toLocaleString('en-IN') + ' from ' + this.totalOrders + ' orders',
        icon: '💰'
      },
      {
        name: 'Procurement Audit',
        description: 'Supplier purchase orders, delivery timeline compliance, and cost analysis',
        value: this.totalSuppliers + ' Active supplier contracts',
        icon: '📋'
      },
      {
        name: 'Low Stock Alert',
        description: 'Products below safety threshold requiring immediate procurement action',
        value: this.lowStock + ' Items need restocking',
        icon: '⚠️'
      },
      {
        name: 'Supplier Scorecard',
        description: 'Vendor reliability, lead time analysis, and supply chain performance',
        value: this.totalSuppliers + ' Evaluated vendors',
        icon: '🚚'
      },
      {
        name: 'Warehouse Utilization',
        description: 'Multi-location storage capacity usage, distribution balance, and transfer logs',
        value: 'Cross-facility distribution report',
        icon: '🏭'
      }
    ];
  }

  generateReport(reportName: string): void {
    alert(`${reportName} — Report generation queued. Download will begin shortly.`);
  }

  refreshReports(): void {
    this.loadData();
  }
}