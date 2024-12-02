import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from '../../../services/User/user-service.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  signupError: string | null = null;
  isLoading = false;
  roles: string[] = ['Owner', 'Worker', 'Customer']; // Example roles

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern(/^\w+$/)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('Customer', [Validators.required]), // Default role as Customer
      phoneNumber: new FormControl('', [Validators.pattern(/^\d{0,15}$/)]), // Optional field
    }, { validators: this.passwordMatcher });
  }

  // Custom Validator to check if passwords match
  passwordMatcher(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Method to handle user registration
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.signupError = null;
      this.isLoading = true;
      const { firstName, lastName, username, email, password, role, phoneNumber } = this.signupForm.value;

      // Prepare data for user registration
      const registerData = {
        firstName,
        lastName,
        username,
        email,
        password,
        role,
        phoneNumber
      };

      this.userService.register(registerData).subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            console.log('Registration successful:', response.data);
            // Redirect user after successful registration
            this.router.navigate(['/login']);
          } else {
            this.signupError = response.msg || 'Registration failed. Please try again.';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.signupError = 'An error occurred during registration. Please try again.';
          console.error('Registration error:', error);
        },
        complete: () => {
          console.log('Registration request completed');
        }
      });
    } else {
      this.signupError = 'Please fill in all required fields correctly.';
    }
  }
}
