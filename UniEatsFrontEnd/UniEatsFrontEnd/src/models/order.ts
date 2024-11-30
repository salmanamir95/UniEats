//import { User } from './user.model';

export interface Order {
  orderId: number; // Unique identifier for the order
  userId: number; // ID of the user who placed the order
  orderDate?: Date; // Defaults to the current date
  totalAmount: number; // Total amount for the order, must be >= 0.01
  status: 'Pending' | 'Completed' | 'Canceled'; // Defaults to 'Pending'
  paymentMethod: 'Card' | 'Cash' | 'Online' | 'GiftCard'; // Payment method
  deliveryMethod: 'Pickup' | 'Delivery'; // Delivery method
  deliveryAddress?: string; // Optional delivery address, max length 255
  orderNotes?: string; // Optional notes for the order, max length 255
  //user?: User | null; // Optional navigation property for the associated user
}

