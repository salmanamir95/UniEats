import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from 'express';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-homepage',
    imports: [NavbarComponent, FooterComponent, RouterModule],
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  id: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Capture the 'id' from the URL parameters
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
