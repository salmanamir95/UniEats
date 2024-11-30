import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  @Input() item: { name: string; price: number; imageClass: string } = {
    name: '',
    price: 0,
    imageClass: '',
  };

}
