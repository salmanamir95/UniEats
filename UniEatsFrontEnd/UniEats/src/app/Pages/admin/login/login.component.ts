import { LoginByUsername } from './../../../interfaces/login-by-username';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../services/User/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: LoginByUsername = { username: '', password: '' }; // Initialize the object




    constructor(private authService: UserServiceService) {}

  onLogin() {
    this.authService.login(this.loginObj).subscribe(
      (response) => {
        console.log('Login successful:', response);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
