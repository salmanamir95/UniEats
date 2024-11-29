import { LoginByUsername } from './../../../interfaces/login-by-username';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserServiceService } from '../../../services/User/user-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: LoginByUsername = { username: '', password: '' }; // Initialize the object




  constructor(private router: Router, private authService: UserServiceService) {}
    //constructor(private authService: UserServiceService) {}

  onLogin() {

  }
}
