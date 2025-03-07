import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pre-loader',
  imports: [],
  templateUrl: './pre-loader.component.html',
  styleUrl: './pre-loader.component.css'
})
export class PreLoaderComponent {
  @Input() isLoading: boolean = false;
}
