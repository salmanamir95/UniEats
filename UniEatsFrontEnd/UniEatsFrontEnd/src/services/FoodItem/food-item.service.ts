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

  // Search food items by name or category
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

  // Search by name
  searchByName(name: string): Observable<GenericResponse<RealFoodItemDTO[]>> {
    const params = new HttpParams().set('name', name);
    return this.http.get<GenericResponse<RealFoodItemDTO[]>>(`${this.baseUrl}/search/name`, { params });
  }

  // Search by category
  searchByCategory(category: string): Observable<GenericResponse<RealFoodItemDTO[]>> {
    const params = new HttpParams().set('category', category);
    return this.http.get<GenericResponse<RealFoodItemDTO[]>>(`${this.baseUrl}/search/category`, { params });
  }

  // Get details of a specific food item
  getFoodItemById(id: number): Observable<GenericResponse<RealFoodItemDTO>> {
    return this.http.get<GenericResponse<RealFoodItemDTO>>(`${this.baseUrl}/${id}`);
  }

  // Add new food item
  addFoodItem(newFoodItem: RealFoodItemDTO): Observable<GenericResponse<RealFoodItemDTO>> {
    return this.http.post<GenericResponse<RealFoodItemDTO>>(`${this.baseUrl}/add`, newFoodItem);
  }

  // Update existing food item
  updateFoodItem(id: number, updatedFoodItem: RealFoodItemDTO): Observable<GenericResponse<RealFoodItemDTO>> {
    return this.http.put<GenericResponse<RealFoodItemDTO>>(`${this.baseUrl}/update/${id}`, updatedFoodItem);
  }

  // Delete a food item
  deleteFoodItem(id: number): Observable<GenericResponse<string>> {
    return this.http.delete<GenericResponse<string>>(`${this.baseUrl}/delete/${id}`);
  }
}
