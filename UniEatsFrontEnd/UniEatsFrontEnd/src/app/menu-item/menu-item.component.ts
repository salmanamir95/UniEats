
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Review } from 'src/models/review';
import { ReviewService } from 'src/services/Review/review.service';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  imports: [FormsModule, CommonModule]
})
export class MenuItemComponent {
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() imageUrl: string = '';
  @Input() userId: number = 0; // Dynamically passed userId
  @Input() itemId: number = 0; // Dynamically passed itemId for review linkage

  reviewText: string = '';
  rating: number = 1; // Default value for the rating
  isReviewSubmitted: boolean = false;

  constructor(private reviewService: ReviewService) {}

  /**
   * Handles review submission
   */
  submitReview() {
    const review: Review = {
      reviewId: 0, // Backend will auto-assign this ID
      userId: this.userId,
      itemId: this.itemId,
      rating: this.rating,
      reviewText: this.reviewText,
      reviewTitle: `${this.name} Review`,
      createdAt: new Date(),
    };

    this.reviewService.giveReview(review).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Review submitted successfully!');
          this.isReviewSubmitted = true;
        } else {
          alert('Could not submit review: ' + response.msg);
        }
      },
      error: (error) => {
        console.error('Error submitting review:', error);
        alert('Error submitting review. Please try again later.');
      }
    });
  }
}
