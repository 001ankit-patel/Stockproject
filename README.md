# Enterprise Inventory & Stock Management System

A full-stack, enterprise-grade inventory and stock management web application built with **Spring Boot** (Java) and **Angular 21**.

## Overview
This platform provides end-to-end warehouse and stock tracking, order handling, supplier management, barcode scanning, analytics dashboards, and role-based user authentication.

---

## Tech Stack

### Frontend
- **Framework**: Angular 21 (Standalone Components)
- **Styling**: Modern Design System (Vanilla CSS with dynamic gradients, cards, and responsive layout)
- **Features**:
  - Executive Analytics & KPI Dashboard
  - Product & Inventory Catalog with search & filtering
  - Suppliers & Location Management
  - Purchase Orders Tracking
  - Real-time Barcode Scanner (Lookup & Quick Inventory Check)
  - Reports & Audits Export
  - Role-based Authentication (Login & Account Creation)

### Backend
- **Framework**: Spring Boot 3.x (Java 17)
- **Database**: H2 In-Memory Database (Pre-seeded with mock enterprise data)
- **Architecture**: REST API with layered Controller -> Service -> Repository -> JPA Entity pattern
- **Features**:
  - Product, Inventory, Supplier, Order, Location CRUD endpoints
  - Aggregated Dashboard Analytics API (`/api/dashboard`)
  - User Authentication & Registration (`/api/auth`)
  - CORS and Dev Proxy configured

---

## Getting Started

### 1. Backend (Spring Boot)
```bash
cd stockproject-backend
.\mvnw.cmd spring-boot:run
```
- API Base URL: `http://localhost:8080/api`
- H2 Database Console: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:stockproject`
  - Username: `sa`
  - Password: *(leave blank)*

### 2. Frontend (Angular)
```bash
cd stockproject-frontend
npm install
npm start
```
- Web Application: `http://localhost:4200`
- Automatically proxies API requests to `http://localhost:8080` via `proxy.conf.json`.

---

## Default Login Credentials
- **Username**: `admin`
- **Password**: `admin123`
*(Or click "Create Account" on the login modal to register a new user with Manager, Staff, or Admin role)*
