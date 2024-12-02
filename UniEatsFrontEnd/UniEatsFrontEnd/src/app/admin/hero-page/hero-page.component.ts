import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";  // Ensure this import is correct
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Chart, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
Chart.register(...registerables)
@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [CommonModule, NgChartsModule, NavbarAdminComponent],  // Add NavbarAdminComponent here
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent {
  // Key Metrics
  totalUsers = 1500;
  totalSales = 75000;
  pendingOrders = 5;

  public salesChartOptions: ChartOptions = {
    responsive: true,
  };
  public salesChartLabels: string[] = ['January', 'February', 'March', 'April', 'May'];
  public salesChartData: ChartData<'line'> = {
    labels: this.salesChartLabels,
    datasets: [
      {
        data: [10000, 15000, 12000, 18000, 20000],
        label: 'Sales Overview',
        fill: true,
        borderColor: '#ff5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
      },
    ],
  };
  public salesChartType: ChartType = 'line';
}
