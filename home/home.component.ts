import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }

  logout() {
    // Implement logout logic here if needed
    console.log('User logged out');
    this.router.navigate(['/login']);
  }
}