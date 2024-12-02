import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../../services/User/user-service.service';

@Component({
  selector: 'app-login', // Standalone component
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
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
    private router: Router
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

      // Call the login service
      this.userService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            console.log('Login successful:', response.data);

            const userId = response.data; // userId returned from the login response
            if (userId !== null) {
              // Fetch user info based on the userId returned from the login response
              this.userService.getUserInfo(userId).subscribe({
                next: (userInfoResponse) => {
                  if (
                    userInfoResponse.success &&
                    userInfoResponse.data !== null
                  ) {
                    const userInfo = userInfoResponse.data;
                    // Check if the user's role is 'Owner'
                    if (userInfo.role === 'Owner') {
                      this.router.navigate(['/admin']); // Navigate to admin dashboard if role is 'Owner'
                    } else {
                      this.router.navigate(['/home', response.data]); // Navigate to home if role is not 'Owner'
                    }
                  } else {
                    this.loginError = 'Failed to fetch user information.';
                  }
                },
                error: (error) => {
                  this.loginError =
                    'An error occurred while fetching user information.';
                  console.error('User Info error:', error);
                },
              });
            } else {
              this.loginError = 'Invalid user ID returned from login.';
            }
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
        },
      });
    } else {
      this.loginError = 'Please fill in all required fields correctly.';
    }
  }
}
