import { Order } from './order';

export interface Payment {
  paymentId: number; // Unique identifier for the payment
  orderId: number; // ID of the associated order
  amount: number; // Payment amount, must be greater than 0
  paymentMethod: 'Card' | 'Cash' | 'Online' | 'GiftCard'; // Allowed payment methods
  paymentStatus: 'Paid' | 'Pending' | 'Refunded'; // Payment status, defaults to 'Pending'
  transactionId?: string; // Optional transaction ID, max length 100
  paymentDate?: Date; // Defaults to the current date
  refundAmount?: number; // Refund amount, defaults to 0
  order?: Order | null; // Optional navigation property for the associated order
}
