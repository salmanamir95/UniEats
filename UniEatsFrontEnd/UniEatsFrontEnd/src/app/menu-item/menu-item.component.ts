import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-menu-item',
    imports: [],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = ''; // The image URL for the food item

}
