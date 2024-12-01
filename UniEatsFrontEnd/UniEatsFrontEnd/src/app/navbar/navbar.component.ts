import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import RouterModule for routing directives

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule], // Add RouterModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected property name
})
export class NavbarComponent {

}
