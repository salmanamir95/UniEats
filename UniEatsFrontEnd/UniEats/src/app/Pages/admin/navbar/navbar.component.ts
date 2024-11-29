import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  Brand: string = 'UniEats';
  constructor(private router: Router) {}

  LoginLink() {
    this.router.navigateByUrl('/login')
  }
}
