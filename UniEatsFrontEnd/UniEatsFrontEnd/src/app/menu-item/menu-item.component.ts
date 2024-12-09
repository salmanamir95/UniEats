import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input, NgModule } from '@angular/core';
import { CartItemDTO } from '../../interfaces/cart-item-dto';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  imports: [CommonModule, RouterModule, FormsModule]
})
export class MenuItemComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = '';
  @Input() userId: number = 0; // Dynamically passed userId

  quantity: number = 1; // Default quantity is 1

  constructor(private cartService: CartService) {}

  addToCart() {
    if (this.quantity < 1 || isNaN(this.quantity)) {
      alert('Please select a valid quantity!');
      return;
    }

    const cartItem: CartItemDTO = {
      name: this.name,
      price: this.price,
      quantity: this.quantity
    };

    this.cartService.addToCart(this.userId, cartItem).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Added to cart successfully!');
        } else {
          alert('Could not add to cart: ' + response.msg);
        }
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
        alert('Error adding to cart. Please try again.');
      }
    });
  }
}
