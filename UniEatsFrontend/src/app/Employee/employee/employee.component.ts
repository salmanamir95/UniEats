import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
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
