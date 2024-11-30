import { FoodItem } from "./food-item";
import { Order } from "./order";

export interface OrderItem {
  orderItemId: number; // Unique identifier for the order item
  orderId: number; // ID of the associated order
  itemId: number; // ID of the associated food item
  quantity: number; // Quantity of the item, must be greater than 0
  price: number; // Price of a single item, must be > 0
  subtotal?: number; // Computed property: quantity * price
  itemDescription?: string; // Optional description of the item
  order?: Order | null; // Optional navigation property for the associated order
  foodItem?: FoodItem | null; // Optional navigation property for the associated food item
}
