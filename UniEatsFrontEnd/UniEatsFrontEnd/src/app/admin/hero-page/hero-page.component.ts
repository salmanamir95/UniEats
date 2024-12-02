import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
  providers: [CurrencyPipe],
  imports: [NavbarAdminComponent, CommonModule],
})
export class HeroPageComponent implements OnInit {
  totalUsers: number = 500;  // Example data
  totalSales: number = 150000;  // Example data
  pendingOrders: number = 100;  // Example data

  // Swimlane data (using a simple array for months and sales)
  salesData = [
    { month: 'January', sales: 10000 },
    { month: 'February', sales: 15000 },
    { month: 'March', sales: 12000 },
    { month: 'April', sales: 18000 },
    { month: 'May', sales: 20000 },
  ];

  constructor() {}

  ngOnInit(): void {}

  // Resize logic for responsiveness
  onResize(event: UIEvent): void {
    // You can handle resizing here if needed
  }
}
