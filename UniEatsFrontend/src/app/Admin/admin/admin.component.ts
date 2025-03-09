import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  user:any;

  /**
   *
   */
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'] || null;
    console.log(this.user);
  }
}
