import { Routes } from '@angular/router';

import { Dashboard } from './dashboard/dashboard';
import { Products } from './products/products';
import { Inventory } from './inventory/inventory';
import { Orders } from './orders/orders';
import { Suppliers } from './suppliers/suppliers';
import { Locations } from './locations/locations';
import { PurchaseOrders } from './purchase-orders/purchase-orders';
import { Barcode } from './barcode/barcode';
import { Reports } from './reports/reports';
import { Admin } from './admin/admin';
import { Login } from './login/login';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard
  },

  {
    path: 'products',
    component: Products
  },

  {
    path: 'inventory',
    component: Inventory
  },

  {
    path: 'orders',
    component: Orders
  },

  {
    path: 'suppliers',
    component: Suppliers
  },

  {
    path: 'locations',
    component: Locations
  },

  {
    path: 'purchase-orders',
    component: PurchaseOrders
  },

  {
    path: 'barcode',
    component: Barcode
  },

  {
    path: 'reports',
    component: Reports
  },

  {
    path: 'admin',
    component: Admin
  }

];