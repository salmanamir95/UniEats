import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router'; // Import RouterModule for routing directives

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule], // Add RouterModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected property name
})
export class NavbarComponent implements OnInit {

  id: any;

  constructor( private route : ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); // Replace 'id' with your route param name
      console.log('Route Parameter ID:', this.id);
    });
  }

}
