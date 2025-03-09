import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../Services/login-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const user = this.loginService.login(email, password);
  
      if (user) {
        this.router.navigate([this.getDashboardRoute(user.designation)], { state: { user } }); // ✅ Pass user object
      } else {
        this.errorMessage = 'Invalid email or password!';
      }
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  getDashboardRoute(designation: string): string {
    switch (designation.toLowerCase()) { // ✅ Convert to lowercase for consistency
      case 'admin': return '/admin-dashboard';
      case 'student': return '/student-dashboard';
      case 'employee': return '/employee-dashboard';
      default: return '/login'; // ✅ Redirect to login if designation is unknown
    }
  }
  
}
