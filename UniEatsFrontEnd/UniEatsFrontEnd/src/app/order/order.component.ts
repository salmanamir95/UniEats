import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderDTO } from 'interfaces/order-dto';
import { OrderService } from 'services/Order/order.service';
import { GenericResponse } from 'GenericResponse/generic-response';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orders: OrderDTO[] = [];
  userId = 1; // Simulated logged-in user ID

  // New order initialization
  newOrder: OrderDTO = {
    orderId: 0,
    userId: 0,
    orderDate: new Date().toISOString(),
    totalAmount: 0,
    status: '',
    paymentMethod: '',
    deliveryMethod: '',
    tableNumber: 0,
    orderNotes: '',
  };

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrderHistory();
  }

  /**
   * Loads order history for the current user
   */
  loadOrderHistory(): void {
    this.orderService.getOrdersByUser(this.userId).subscribe({
      next: (response: GenericResponse<OrderDTO[]>) => {
        if (response?.success && response?.data) {
          this.orders = response.data.map(order => ({
            ...order,
            orderDate: new Date(order.orderDate).toISOString(),
          }));
        } else {
          alert('No order history found or failed to fetch');
        }
      },
      error: (error) => {
        console.error('Error loading order history:', error);
        alert('Error loading order history');
      },
    });
  }

  /**
   * Handles the order submission process
   */
  placeOrder(): void {
    if (!this.newOrder.paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    this.newOrder.userId = this.userId;
    this.newOrder.orderDate = new Date().toISOString();
    this.newOrder.status = 'Pending';

    this.orderService.placeOrder(this.newOrder).subscribe({
      next: (response: GenericResponse<string>) => {
        if (response?.success) {
          alert('Order placed successfully!');
          this.loadOrderHistory();
          this.resetForm();
        } else {
          alert('Failed to place order');
        }
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert('Something went wrong');
      },
    });
  }

  /**
   * Cancels an order
   * @param orderId - ID of the order to cancel
   */
  cancelOrder(orderId: number): void {
    this.orderService.cancelOrder(orderId).subscribe({
      next: (response: GenericResponse<string>) => {
        if (response?.success) {
          alert('Order successfully canceled');
          this.loadOrderHistory();
        } else {
          alert('Failed to cancel the order');
        }
      },
      error: (error) => {
        console.error('Error canceling order:', error);
        alert('Something went wrong');
      },
    });
  }

  /**
   * Resets the new order form
   */
  resetForm(): void {
    this.newOrder = {
      orderId: 0,
      userId: 0,
      orderDate: new Date().toISOString(),
      totalAmount: 0,
      status: '',
      paymentMethod: '',
      deliveryMethod: '',
      tableNumber: 0,
      orderNotes: '',
    };
  }
}