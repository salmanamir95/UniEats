import { Injectable } from '@angular/core';
import { Food } from '../interfaces/food/food';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from '../interfaces/review/review';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private foodData: Food[] = [
    { id: 1, name: 'Burger', price: 5.99, reviews: [] },
    { id: 2, name: 'Pizza', price: 8.99, reviews: [] },
    { id: 3, name: 'Pasta', price: 7.49, reviews: [] },
  ];

  private foodsSubject = new BehaviorSubject<Food[]>(this.foodData);
  foods$ = this.foodsSubject.asObservable();

  getFoods(): Observable<Food[]> {
    return this.foods$;
  }

  addReview(foodId: number, review: Review): void {
    if (!this.isValidReview(review)) {
      console.warn('Invalid review submission');
      return;
    }

    this.foodData = this.foodData.map(food => 
      food.id === foodId ? this.addReviewToFood(food, review) : food
    );
    
    this.foodsSubject.next([...this.foodData]);
  }

  private addReviewToFood(food: Food, review: Review): Food {
    return {
      ...food,
      reviews: [...food.reviews, review]
    };
  }

  private isValidReview(review: Review): boolean {
    return review.rating >= 1 && 
           review.rating <= 5 &&
           !!review.user?.trim() &&
           !!review.comment?.trim();
  }
}