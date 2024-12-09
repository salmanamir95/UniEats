import { Router, RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-checkout-with-cash',
    imports: [RouterModule],
    templateUrl: './checkout-with-cash.component.html',
    styleUrl: './checkout-with-cash.component.css'
})
export class CheckoutWithCashComponent {
  constructor(private router: Router) {}

  confirmCashPayment() {
    alert('Cash on delivery confirmed');
    this.router.navigate(['/']);
  }
}
