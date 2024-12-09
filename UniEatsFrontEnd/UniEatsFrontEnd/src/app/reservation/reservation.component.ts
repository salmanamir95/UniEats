import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { ReservationDTO } from '../../interfaces/reservation-dto';
import { ReservationService } from '../../services/Reservations/reservation.service';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-reservation',
  imports: [TableComponent, CommonModule, NavbarComponent, FooterComponent],
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
        console.log('API Response:', response);

        if (response?.success && Array.isArray(response?.data)) {
          const reservedTables = response.data;

          // Dynamically mark tables
          this.tables = Array.from({ length: totalTables }, (_, i) => ({
            number: i + 1,
            status: reservedTables.includes(i + 1) ? 'occupied' : 'available',
          }));
        } else {
          console.error('Error in server response, falling back to all tables as available.');
          this.setAllTablesToAvailable(totalTables);
        }
      },
      error: (err) => {
        console.error('Error fetching available seats:', err);
        alert('An error occurred while fetching available tables.');
        this.setAllTablesToAvailable(totalTables);
      },
    });
  }

  // Fallback: Set all tables to available
  setAllTablesToAvailable(totalTables: number) {
    this.tables = Array.from({ length: totalTables }, (_, i) => ({
      number: i + 1,
      status: 'available',
    }));
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
      if (this.tables.find(table => table.status === 'available' && table.number === tableNumber)) {
        this.selectedTables.push(tableNumber);
        this.updateTableStatus(tableNumber, 'selected');
      } else {
        alert('Table is already occupied or unavailable.');
      }
    } else {
      this.selectedTables.splice(index, 1);
      this.updateTableStatus(tableNumber, 'available');
    }
  }


  updateTableStatus(tableNumber: number, status: 'selected' | 'available' | 'occupied') {
    const table = this.tables.find(t => t.number === tableNumber);
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
          this.initializeTables(); // Re-fetch tables dynamically
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
