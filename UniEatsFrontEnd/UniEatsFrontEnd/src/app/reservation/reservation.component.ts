import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { ReservationDTO } from '../../interfaces/reservation-dto';
import { ReservationService } from '../../services/Reservations/reservation.service';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

@Component({
  selector: 'app-reservation',
  imports: [TableComponent, CommonModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  tables: { number: number; status: 'selected' | 'available' | 'occupied' }[] = [];
  selectedTables: number[] = []; // To store selected table numbers
  userId: number = 0; // Placeholder for userId from URL

  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchUserIdFromURL();
    this.initializeTables();
  }

  fetchUserIdFromURL() {
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      if (idParam) {
        this.userId = +idParam; // Convert string to number
      } else {
        alert('User ID is missing in the URL');
      }
    });
  }

  // Dynamically initialize table statuses from the server (optional)
  initializeTables() {
    this.reservationService.checkAvailableSeats(30).subscribe({
      next: (response) => {
        this.tables = Array.from({ length: 30 }, (_, i) => ({
          number: i + 1,
          status: response?.data?.includes(i + 1) ? 'available' : 'occupied',
        }));
      },
      error: () => {
        alert('Failed to fetch available tables');
      }
    });
  }

  // Handle table selection
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

  updateTableStatus(tableNumber: number, status: 'selected' | 'available' | 'occupied') {
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
      tables: this.selectedTables,
      reservationDate: new Date(),
      userId: this.userId,
      numberOfPeople: this.selectedTables.length, // Example: number of people corresponds to table selection
      status: 'Confirmed',
      createdAt: new Date(),
    };

    this.reservationService.makeReservation(reservationDTO).subscribe({
      next: (response) => {
        if (response.success) {
          alert(`Tables ${this.selectedTables.join(', ')} have been reserved!`);
          this.resetSelections();
        } else {
          alert('Failed to reserve tables.');
        }
      },
      error: (error) => {
        console.error('Reservation failed', error);
        alert('An error occurred while making the reservation.');
      }
    });
  }


  resetSelections() {
    this.selectedTables = [];
    this.tables.forEach((table) => (table.status = 'available'));
  }
}
