import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-success',
  standalone: true,
  imports: [FormsModule,RouterModule],
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
