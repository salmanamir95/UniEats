import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <h1>Welcome to My App</h1>
    <nav>
      <a routerLink="/">Home</a> | 
      <a routerLink="/login">Login</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  standalone: true, // Mark as standalone
  imports: [RouterModule]
})
export class AppComponent { }
