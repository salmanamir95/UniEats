import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserServiceService } from '../../services/User/user-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { ReservationService } from '../../services/Reservations/reservation.service';
import { Reservation } from '../../models/reservation';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User | undefined;
  closestReservation: Reservation | null = null;
  constructor(
    private userService: UserServiceService,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private reservationService : ReservationService
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id')); // Read 'id' from route parameters
    if (!isNaN(userId)) {
      this.userService.getUserInfo(userId).subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.user = response.data;
          } else {
            console.error('Failed to fetch user data:', response.msg);
          }
        },
        error: (error) => {
          console.error('Error fetching user data:', error);
        },
        complete: () => {
          console.log('User data fetch completed.');
        }
      });
    } else {
      console.error('Invalid user ID in URL');
    }


    this.reservationService.getUserReservations(userId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const reservations = response.data;
          // Find the closest reservation
          this.closestReservation = this.findClosestReservation(reservations);
        } else {
          console.error('Failed to fetch reservations:', response.msg);
        }
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      }
    });
  }

  private findClosestReservation(reservations: Reservation[]): Reservation | null {
    if (!reservations || reservations.length === 0) return null;

    // Sort reservations by reservationDate to find the closest one
    reservations.sort((a, b) => {
      const dateA = new Date(a.reservationDate || 0);
      const dateB = new Date(b.reservationDate || 0);
      return dateA.getTime() - dateB.getTime(); // Ascending order
    });

    // Return the first (closest) reservation
    return reservations[0];
  }

}
