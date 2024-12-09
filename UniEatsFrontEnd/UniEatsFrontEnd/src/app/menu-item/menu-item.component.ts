import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CartItemDTO } from '../../interfaces/cart-item-dto';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  imports: [CommonModule,  FormsModule]
})
export class MenuItemComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = '';

  quantity: number = 1; // Default quantity is 1

  // Assume userId is hardcoded for simplicity; dynamically set this in a real app
  private userId = 1;

  constructor(private cartService: CartService) {}

  addToCart() {
    const cartItem: CartItemDTO = {
      name: this.name,
      price: this.price,
      quantity: this.quantity
    };

    this.cartService.addToCart(this.userId, cartItem).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Added to cart successfully!');
        } else {
          console.error('Could not add to cart:', response.msg);
        }
      },
      error: (error) => console.error('Error adding to cart:', error),
    });
  }
}
