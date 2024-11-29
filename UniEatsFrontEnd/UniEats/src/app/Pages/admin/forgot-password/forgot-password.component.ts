import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email: string = '';

  constructor(private router: Router) { }

  // Method to handle password reset
  onResetPassword(): void {
    if (this.email) {
      // You can add actual API logic here for sending reset password email
      console.log('Reset password email sent to:', this.email);

      // Redirect to success message or login page
      this.router.navigate(['/login']);
    } else {
      alert('Please enter a valid email address');
    }
  }
}


