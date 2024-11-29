import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-userlanding-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './userlanding-page.component.html',
  styleUrls: ['./userlanding-page.component.css']
})
export class UserlandingPageComponent {
  constructor(private router: Router) { }

  // Method to navigate to Menu page
  navigateToHome(): void {
    this.router.navigate(['/userlanding-page']);
  }

  // Method to navigate to Menu page
  navigateToMenu(): void {
    this.router.navigate(['/menu']);
  }

  // Method to navigate to Reservation page
  navigateToReservation(): void {
    this.router.navigate(['/reservation']);
  }
}
