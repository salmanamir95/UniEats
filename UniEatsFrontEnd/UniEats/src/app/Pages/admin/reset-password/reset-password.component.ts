import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) { }

  onResetPassword(): void {
    if (this.validatePassword(this.newPassword)) {
      if (this.newPassword === this.confirmPassword) {
        console.log('Password reset successful');
        alert('Password reset successfully! Please log in.');
        this.router.navigate(['/login']);
      } else {
        alert('Passwords do not match. Please try again.');
      }
    } else {
      alert('Password does not meet the requirements.');
    }
  }

  validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#$_])[A-Za-z\d#$_]{8,}$/;
    return regex.test(password);
  }
}
