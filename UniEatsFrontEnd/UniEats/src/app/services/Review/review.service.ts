import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { Review } from '../../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private readonly baseUrl = 'http://localhost:5043/api/Review'



  constructor(private http: HttpClient) {}

  /**
   * Fetch all reviews.
   * @returns Observable of GenericResponse containing a list of reviews.
   */
  getReviews(): Observable<GenericResponse<Review[]>> {
    return this.http.get<GenericResponse<Review[]>>(`${this.baseUrl}/GetReviews`);
  }

  /**
   * Submit a new review.
   * @param review The review object to submit.
   * @returns Observable of GenericResponse containing a success flag.
   */
  giveReview(review: Review): Observable<GenericResponse<boolean>> {
    return this.http.post<GenericResponse<boolean>>(`${this.baseUrl}/givereview`, review);
  }
}
