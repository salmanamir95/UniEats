import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-table',
    imports: [CommonModule],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() tableNumber: number = 0;  // Table number (1, 2, 3, ...)
  @Input() status: 'selected' | 'available' | 'occupied' = 'available';  // Table status
  @Output() tableClick = new EventEmitter<number>();  // Event emitter for table click

  onTableClick() {
    this.tableClick.emit(this.tableNumber);  // Emit the selected table number
  }
}
