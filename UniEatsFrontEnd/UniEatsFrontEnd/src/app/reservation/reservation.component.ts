import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  tables: { number: number; status: 'selected' | 'available' | 'occupied' }[] = [
    { number: 1, status: 'available' },
    { number: 2, status: 'available' },
    { number: 3, status: 'available' },
    { number: 4, status: 'available' },
    { number: 5, status: 'available' },
    { number: 6, status: 'available' },
    { number: 7, status: 'available' },
    { number: 8, status: 'available' },
    { number: 9, status: 'available' },
    { number: 10, status: 'available' },
    { number: 11, status: 'available' },
    { number: 12, status: 'available' },
    { number: 13, status: 'available' },
    { number: 14, status: 'available' },
    { number: 15, status: 'available' },
    { number: 16, status: 'available' },
    { number: 17, status: 'available' },
    { number: 18, status: 'available' },
    { number: 19, status: 'available' },
    { number: 20, status: 'available' },
    { number: 21, status: 'available' },
    { number: 22, status: 'available' },
    { number: 23, status: 'available' },
    { number: 24, status: 'available' },
    { number: 25, status: 'available' },
    { number: 26, status: 'available' },
    { number: 27, status: 'available' },
    { number: 28, status: 'available' },
    { number: 29, status: 'available' },
    { number: 30, status: 'available' },
  ];

  selectedTables: number[] = []; // To store selected table numbers

  // This method is called when a table is clicked
  onTableSelected(tableNumber: number) {
    const index = this.selectedTables.indexOf(tableNumber);
    if (index === -1) {
      this.selectedTables.push(tableNumber);
      this.updateTableStatus(tableNumber, 'selected');
    } else {
      this.selectedTables.splice(index, 1);
      this.updateTableStatus(tableNumber, 'available');
    }
  }

  // This method updates the table status
  updateTableStatus(tableNumber: number, status: 'selected' | 'available' | 'occupied') {
    const table = this.tables.find((t) => t.number === tableNumber);
    if (table) {
      table.status = status;
    }
  }

  // This method will handle the reservation logic
  reserve() {
    if (this.selectedTables.length === 0) {
      alert('Please select at least one table!');
      return;
    }

    // Log the selected tables for now (can be replaced with API call)
    console.log('Tables reserved:', this.selectedTables);
    alert(`Tables ${this.selectedTables.join(', ')} have been reserved!`);

    // Optionally, reset the selection
    this.selectedTables = [];
    this.tables.forEach(table => table.status = 'available');
  }
}
