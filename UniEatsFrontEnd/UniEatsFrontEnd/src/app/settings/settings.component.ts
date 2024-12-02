import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{

  id:any;

  constructor(private route :ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id'); // Replace 'id' with your route param name
      console.log('Route Parameter ID:', this.id);
    });
  }

  logout() {
    // Perform logout logic here
    alert('You have been logged out.');
    this.router.navigate(['/login']); // Redirect to login page
  }

}
