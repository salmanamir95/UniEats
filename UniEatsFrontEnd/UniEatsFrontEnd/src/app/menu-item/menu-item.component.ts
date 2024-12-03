import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-menu-item',
    imports: [CommonModule, FormsModule],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = ''; // The image URL for the food item

  quantity: number = 1; // Default quantity is 1

  addToCart() {
    // Here you can implement the logic to add the item to the cart
    console.log(`${this.name} x ${this.quantity} added to cart.`);
  }
}
