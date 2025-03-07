import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PreLoaderComponent } from "./pre-loader/pre-loader/pre-loader.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PreLoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'UniEatsFrontend';
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;  // Simulate loading completion
    }, 3000);
  }
}
