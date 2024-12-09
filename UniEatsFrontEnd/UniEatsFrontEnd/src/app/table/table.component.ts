import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {
  @Input() tableNumber: number = 0; // Input table number
  @Input() status: 'selected' | 'available' | 'occupied' = 'available'; // Input for status
  @Output() tableClick = new EventEmitter<number>(); // Event emitter for table clicks

  // Handle click events
  onTableClick() {
    if (this.status !== 'occupied') { // Ensure only non-occupied tables can be clicked
      this.tableClick.emit(this.tableNumber);
    }
  }
}
