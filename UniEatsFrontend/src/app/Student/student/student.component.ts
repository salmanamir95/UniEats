import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
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
