import { CartItemDTO } from "../../interfaces/cart-item-dto";

export interface Cart {
  userId: number; // Represents the user's ID associated with the cart
  items: CartItemDTO[]; // List of items in the shopping cart
  totalPrice?: number; // Total price of all items in the cart (optional if calculated dynamically)
  createdAt?: Date; // Date when the cart was created (optional)
  updatedAt?: Date; // Date when the cart was last updated (optional)



}

