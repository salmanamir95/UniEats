import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-checkout-with-card',
    imports: [FormsModule, CommonModule],
    templateUrl: './checkout-with-card.component.html',
    styleUrl: './checkout-with-card.component.css'
})
export class CheckoutWithCardComponent {
  cardDetails = {
    cardholderName: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };

  constructor(private router: Router) {}

  completeCardPayment() {
    alert('Card payment successful');
    this.router.navigate(['/']);
  }
}
