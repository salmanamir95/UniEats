import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { SalesService } from 'src/services/Sales/sales.service';
import { SalesReport } from 'src/models/sales-report';
import { GenericResponse } from 'src/GenericResponse/generic-response';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css'],
  providers: [CurrencyPipe],
  imports: [NavbarAdminComponent, CommonModule],
  standalone: true,
})
export class HeroPageComponent implements OnInit {
  totalUsers: number = 500; // Example value
  totalSales: number = 0; // To be fetched from the API
  pendingOrders: number = 100; // Example value

  salesData: any;
  reports: SalesReport[] | null = []; // Holds all reports fetched from the API

  constructor(private salesService: SalesService) {}

  ngOnInit(): void {
    this.loadSalesData();
    this.fetchAllReports();
  }

  loadSalesData(): void {
    this.salesService.generateTodaySaleReport().subscribe(
      (response: GenericResponse<SalesReport>) => {
        if (response.success) {
          this.salesData = response.data;
        } else {
          console.error('Failed to fetch sales data:', response.msg);
        }
      },
      (error) => {
        console.error('Error fetching sales data:', error);
      }
    );
  }

  fetchAllReports(): void {
    this.salesService.getAllReports().subscribe(
      (response: GenericResponse<SalesReport[]>) => {
        if (response.success) {
          this.reports = response.data;
        } else {
          console.error('Failed to fetch reports:', response.msg);
        }
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  calculateBarHeight(salesValue: number): number {
    const maxSalesValue = Math.max(
      ...this.salesData.map((data: any) => data.sales)
    );
    return (salesValue / maxSalesValue) * 100;
  }
}
