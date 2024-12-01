import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule for routing
import { UserServiceService } from '../../../services/User/user-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,  // Standalone component
  imports: [
    RouterModule,  // Import RouterModule here
    ReactiveFormsModule,  // Reactive Forms for form handling
    CommonModule,  // Angular's CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router  // Inject Router here
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginError = null;
      this.isLoading = true;
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            console.log('Login successful:', response.data);
            this.router.navigate(['/homepage']);
          } else {
            this.loginError = response.msg || 'Login failed. Please try again.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.loginError = 'An error occurred during login. Please try again.';
          console.error('Login error:', error);
        },
        complete: () => {
          console.log('Login request completed');
        }
      });
    } else {
      this.loginError = 'Please fill in all required fields correctly.';
    }
  }

}
