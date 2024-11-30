import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { RealFoodItemDTO } from '../../interfaces/real-food-item-dto';

@Injectable({
  providedIn: 'root',
})
export class FoodAndMenuService {
  private readonly apiBaseUrl = 'http://localhost:5043/api/FoodAndMenu'; // Backend API base URL

  constructor(private http: HttpClient) {}

  /**
   * Recommend food items based on the user's previous orders.
   * @param userId The user's ID to fetch recommendations.
   * @returns Observable of GenericResponse containing a list of recommended food items.
   */
  recommendFood(userId: number): Observable<GenericResponse<RealFoodItemDTO[]>> {
    const params = new HttpParams().set('userId', userId.toString());
    return this.http.get<GenericResponse<RealFoodItemDTO[]>>(`${this.apiBaseUrl}/recommend`, { params });
  }

  /**
   * Get detailed information for a food item (including allergens and dietary info).
   * @param id The ID of the food item.
   * @returns Observable of GenericResponse containing the food item's details.
   */
  getFoodItemInfo(id: number): Observable<GenericResponse<RealFoodItemDTO>> {
    return this.http.get<GenericResponse<RealFoodItemDTO>>(`${this.apiBaseUrl}/food/${id}`);
  }

  /**
   * Update the menu with a list of updated food items.
   * @param updatedFoodItems The list of food items to be updated.
   * @returns Observable of GenericResponse containing the status of the update.
   */
  updateMenu(updatedFoodItems: RealFoodItemDTO[]): Observable<GenericResponse<string>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<GenericResponse<string>>(`${this.apiBaseUrl}/updateMenu`, updatedFoodItems, { headers });
  }
}
