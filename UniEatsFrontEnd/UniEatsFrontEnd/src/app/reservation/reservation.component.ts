import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { ReservationDTO } from '../../interfaces/reservation-dto';
import { ReservationService } from '../../services/Reservations/reservation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  imports: [TableComponent, CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  tables: { number: number; status: 'selected' | 'available' | 'occupied' }[] = [];
  selectedTables: number[] = [];
  userId: number = 0;

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.setAllTablesToOccupied(30);
    this.fetchUserIdFromURL();
    this.initializeTables();
  }

  fetchUserIdFromURL() {
    this.route.params.subscribe((params) => {
      const idParam = params['id'];
      if (idParam) {
        this.userId = +idParam; // Convert string to number
      } else {
        alert('User ID is missing in the URL');
      }
    });
  }

  // Dynamically initialize table statuses from the server
  initializeTables() {
    const totalTables = 30; // Total number of tables in the restaurant

    this.reservationService.checkAvailableSeats(totalTables).subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the API response

        if (response && response.success) {
          const reservedTables = Array.isArray(response.data) ? response.data : [];
          console.log('Reserved Tables:', reservedTables); // Log reserved table numbers

          // Initialize all tables as available first
          this.tables = Array.from({ length: totalTables }, (_, i) => ({
            number: i + 1,
            status: 'available', // Default to 'available'
          }));

          // Mark tables in the reservedTables array as 'occupied'
          reservedTables.forEach((tableNumber) => {
            const tableIndex = tableNumber - 1; // Convert table number to 0-based index
            if (this.tables[tableIndex]) {
              this.tables[tableIndex].status = 'available';
            }
          });
        } else {
          console.warn('Unexpected or null data in response:', response);
          alert(response?.msg || 'Failed to fetch available tables. Please try again later.');
          this.setAllTablesToOccupied(totalTables);
        }
      },
      error: (err) => {
        console.error('Error fetching available seats:', err);
        alert('An error occurred while fetching available tables.');
        this.setAllTablesToOccupied(totalTables);
      },
    });
  }


  setAllTablesToOccupied(totalTables: number) {
    // Set all tables to "occupied" as a fallback
    this.tables = Array.from({ length: totalTables }, (_, i) => ({
      number: i + 1,
      status: 'occupied',
    }));
  }

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

  updateTableStatus(
    tableNumber: number,
    status: 'selected' | 'available' | 'occupied'
  ) {
    const table = this.tables.find((t) => t.number === tableNumber);
    if (table) {
      table.status = status;
    }
  }

  reserve() {
    if (this.selectedTables.length === 0) {
      alert('Please select at least one table!');
      return;
    }

    const reservationDTO: ReservationDTO = {
      userId: this.userId,
      reservationDate: new Date(),
      tables: this.selectedTables,
      numberOfPeople: this.selectedTables.length,
      status: 'Confirmed',
    };

    this.reservationService.makeReservation(reservationDTO).subscribe({
      next: (response) => {
        if (response?.success) {
          alert(`Reservation successful for tables ${this.selectedTables.join(', ')}`);
          this.resetSelections();
        } else {
          console.warn('Unexpected reservation response:', response);
          alert(response?.msg || 'Reservation failed. Please try again later.');
        }
      },
      error: (error) => {
        console.error('Reservation error:', error);
        alert('An error occurred while making the reservation.');
      },
    });
  }

  resetSelections() {
    this.selectedTables = [];
    this.tables.forEach((table) => (table.status = 'available'));
  }
}
