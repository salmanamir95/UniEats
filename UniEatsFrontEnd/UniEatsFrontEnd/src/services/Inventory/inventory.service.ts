import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { FoodItemDTO } from '../../interfaces/food-item-dto';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly baseUrl = 'http://localhost:5043/api/Inventory'; // Backend API base URL

  constructor(private http: HttpClient) {}

  /**
   * Update stock for a specific inventory item.
   * @param itemId ID of the inventory item.
   * @param quantityToAdd Quantity to add to the current stock.
   * @returns Observable of GenericResponse with a success message.
   */
  updateStock(itemId: number, quantityToAdd: number): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(
      `${this.baseUrl}/update-stock/${itemId}`,
      quantityToAdd
    );
  }

  /**
   * Add a new food item to the inventory.
   * @param foodItem FoodItemDTO containing the details of the new item.
   * @returns Observable of GenericResponse with a success message.
   */
  addFoodItem(foodItem: FoodItemDTO): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/add-item`, foodItem);
  }

  /**
   * Remove a food item from the inventory.
   * @param itemId ID of the inventory item to remove.
   * @returns Observable of GenericResponse with a success message.
   */
  removeFoodItem(itemId: number): Observable<GenericResponse<string>> {
    return this.http.delete<GenericResponse<string>>(`${this.baseUrl}/remove-item/${itemId}`);
  }
}
