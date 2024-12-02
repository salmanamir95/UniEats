import { ChartData, ChartOptions, ChartType } from './../../../../node_modules/chart.js/types/index.esm.d';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [NavbarAdminComponent],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent {
// Key Metrics
totalUsers = 1500;
totalSales = 75000;
pendingOrders = 5;

// Chart Data for Sales Overview (Example)
public salesChartOptions: ChartOptions = {
  responsive: true,
};
public salesChartLabels: string[] = ['January', 'February', 'March', 'April', 'May'];
public salesChartData: ChartData = {
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
