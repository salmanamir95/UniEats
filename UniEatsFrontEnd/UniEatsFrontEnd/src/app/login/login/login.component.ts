import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';  // Import CommonModule to use ngIf

@Component({
  selector: 'app-login',
  standalone: true,  // Mark this as a standalone component
  imports: [ReactiveFormsModule, CommonModule],  // Import both ReactiveFormsModule and CommonModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form with validators
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],  // email field with validation
      password: ['', Validators.required]                      // password field with validation
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      // Here, you can send the form data to your backend using a service
    } else {
      console.log('Form is invalid');
    }
  }
}
