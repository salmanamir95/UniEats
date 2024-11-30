export interface FoodItem {
  itemId: number; // Unique identifier for the food item
  name: string; // Name of the food item, required, max length 100
  category: 'Drinks' | 'Snacks' | 'Meals' | 'Appetizers' | 'Desserts'; // Restricted to specific values
  price: number; // Price of the item, must be greater than 0
  description?: string; // Optional description
  imageUrl?: string; // Optional URL for the item's image, must be valid
  availability?: boolean; // Availability status, defaults to true
  stockQuantity: number; // Stock quantity, must be non-negative
  discount?: number; // Discount percentage, between 0 and 100, defaults to 0
}
