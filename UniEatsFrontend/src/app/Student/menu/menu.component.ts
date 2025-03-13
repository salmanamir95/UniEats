import { Component, OnInit } from '@angular/core';
import { Food } from './interfaces/food/food';
import { Review } from './interfaces/review/review';
import { MenuService } from './Service/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[MenuService]
})
export class MenuComponent implements OnInit {
  foods: Food[] = [];
  newReview: { [key: number]: Review } = {};

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getFoods().subscribe({
      next: (data) => {
        this.foods = data;
        this.initializeReviews();
      },
      error: (err) => console.error('Error loading foods:', err)
    });
  }

  private initializeReviews(): void {
    this.foods.forEach(food => {
      this.newReview[food.id] = this.createNewReviewTemplate(food.id);
    });
  }

  private createNewReviewTemplate(foodId: number): Review {
    return {
      id: 0,
      foodId: foodId,
      user: '',
      rating: 5,
      comment: '',
      createdAt: ''
    };
  }

  calculateAverageRating(reviews?: Review[]): string {
    if (!reviews || reviews.length === 0) return 'No Ratings Yet';
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }

  isReviewValid(foodId: number): boolean {
    const review = this.newReview[foodId];
    return !!review?.user?.trim() && !!review?.comment?.trim();
  }

  addReview(foodId: number): void {
    const review = { ...this.newReview[foodId] };
    if (!this.isReviewValid(foodId)) return;

    review.id = Date.now();
    review.createdAt = new Date().toISOString();

    this.menuService.addReview(foodId, review);
    this.newReview[foodId] = this.createNewReviewTemplate(foodId);
  }

  trackFoodById(index: number, food: Food): number {
    return food.id;
  }

  trackReviewById(index: number, review: Review): number {
    return review.id;
  }
}