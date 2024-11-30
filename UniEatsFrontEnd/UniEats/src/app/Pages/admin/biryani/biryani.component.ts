import { Component } from '@angular/core';

@Component({
  selector: 'app-biryani',
  standalone: true,
  imports: [],
  templateUrl: './biryani.component.html',
  styleUrl: './biryani.component.css'
})
export class BiryaniComponent {
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
