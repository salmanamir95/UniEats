import { Component } from '@angular/core';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [],
  templateUrl: './pizzaslice.component.html',
  styleUrl: './pizzaslice.component.css'
})
export class PizzaSliceComponent {
  product: any[] = [];
  quantity: number = 0;

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  addToCart(product: any, quantity: number){

  }

  buyNow(product: any, quantity: number) {

  }

}
