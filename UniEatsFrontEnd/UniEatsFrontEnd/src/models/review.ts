import { User } from './user';
import { FoodItem } from './food-item';

export interface Review {
  reviewId: number; // Unique identifier for the review
  userId: number; // ID of the user who created the review
  itemId: number; // ID of the reviewed food item
  rating: number; // Rating for the item, must be between 1 and 5
  reviewTitle?: string; // Optional title for the review, max length 100
  reviewText?: string; // Optional text of the review
  createdAt?: Date; // Defaults to the current date
  user?: User | null; // Optional navigation property for the associated user
  foodItem?: FoodItem | null; // Optional navigation property for the associated food item
}
