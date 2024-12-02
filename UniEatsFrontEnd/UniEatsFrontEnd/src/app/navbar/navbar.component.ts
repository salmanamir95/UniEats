import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Correct import for Angular's Router

@Component({
    selector: 'app-navbar',
    imports: [RouterModule, CommonModule], // Add RouterModule here
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'] // Corrected property name
})
export class NavbarComponent implements OnInit {

  id: any;
  dropdownVisible: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); // Replace 'id' with your route param name
      console.log('Route Parameter ID:', this.id);
    });
  }

  toggleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout(): void {
    // Perform logout logic here
    alert('You have been logged out.');
    this.router.navigate(['/login']); // Redirect to login page
  }
}
