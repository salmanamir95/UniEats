import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
  
      // Use bracket notation to access properties
      const email = formData['email'];
      const password = formData['password'];
  
      // Retrieve users from session storage (mock login service)
      const users = JSON.parse(sessionStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u['email'] === email && u['password'] === password);
  
      if (user) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
  
        // Redirect based on designation
        switch (user['designation']) {
          case 'Admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          case 'Student':
            this.router.navigate(['/student-dashboard']);
            break;
          case 'Employee':
            this.router.navigate(['/employee-dashboard']);
            break;
          default:
            this.router.navigate(['/']);
        }
      } else {
        alert('Invalid email or password!');
      }
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
