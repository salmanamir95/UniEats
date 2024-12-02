import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts'; // Correctly import ChartsModule
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
    selector: 'app-hero-page',
    imports: [CommonModule, NavbarAdminComponent, ChartsModule], // Include ChartsModule here
    templateUrl: './hero-page.component.html',
    styleUrls: ['./hero-page.component.css']
})
export class HeroPageComponent {
  totalUsers = 1500;
  totalSales = 75000;
  pendingOrders = 5;

  public salesChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
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
