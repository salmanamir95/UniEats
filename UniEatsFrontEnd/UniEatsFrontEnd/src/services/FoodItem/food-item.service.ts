import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { RealFoodItemDTO } from '../../interfaces/real-food-item-dto';

@Injectable({
  providedIn: 'root',
})
export class FoodItemService {
  private readonly baseUrl = 'http://localhost:5043/api/FoodItem'; // Backend API base URL

  constructor(private http: HttpClient) {}

  /**
   * Search food items by name and/or category.
   * @param name (Optional) Name to search for.
   * @param category (Optional) Category to search for.
   * @returns Observable of GenericResponse containing a list of matching food items.
   */
  searchFood(name?: string, category?: string): Observable<GenericResponse<RealFoodItemDTO[]>> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<GenericResponse<RealFoodItemDTO[]>>(`${this.baseUrl}/search`, { params });
  }

  /**
   * Search food items by name.
   * @param name Name to search for.
   * @returns Observable of GenericResponse containing a list of matching food items.
   */
  searchByName(name: string): Observable<GenericResponse<RealFoodItemDTO[]>> {
    const params = new HttpParams().set('name', name);
    return this.http.get<GenericResponse<RealFoodItemDTO[]>>(`${this.baseUrl}/search/name`, { params });
  }

  /**
   * Search food items by category.
   * @param category Category to search for.
   * @returns Observable of GenericResponse containing a list of matching food items.
   */
  searchByCategory(category: string): Observable<GenericResponse<RealFoodItemDTO[]>> {
    const params = new HttpParams().set('category', category);
    return this.http.get<GenericResponse<RealFoodItemDTO[]>>(`${this.baseUrl}/search/category`, { params });
  }

  /**
   * Get details of a specific food item by its ID.
   * @param id ID of the food item.
   * @returns Observable of GenericResponse containing the food item's details.
   */
  getFoodItemById(id: number): Observable<GenericResponse<RealFoodItemDTO>> {
    return this.http.get<GenericResponse<RealFoodItemDTO>>(`${this.baseUrl}/${id}`);
  }
}
