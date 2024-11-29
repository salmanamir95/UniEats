import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-success',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  constructor(private router: Router) { }

  // Navigate to login page
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
