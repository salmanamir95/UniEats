import { FoodItem } from "./food-item";


export interface Inventory {
  inventoryId: number; // Unique identifier for the inventory record
  itemId: number; // ID of the associated food item
  stockAdded: number; // Stock added, must be non-negative
  stockRemoved: number; // Stock removed, must be non-negative
  currentStock?: number; // Computed property: stockAdded - stockRemoved
  updatedAt?: Date; // Defaults to the current date
  restockDate?: Date | null; // Optional restock date
  foodItem?: FoodItem; // Navigation property for the associated food item
}
