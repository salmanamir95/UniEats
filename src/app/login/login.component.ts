import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  login() {
    if (this.username === 'admin' && this.password === 'password') {
      alert('Login successful!');
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
