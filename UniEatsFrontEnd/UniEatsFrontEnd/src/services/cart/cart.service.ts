import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemDTO } from '../../interfaces/cart-item-dto';
import { GenericResponse } from '../../GenericResponse/generic-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = `http://localhost:5043/api/Cart`;

  constructor(private http: HttpClient) {}

  // UC-01: Add an item to the cart for a specific user
  addToCart(userId: number, cartItem: CartItemDTO): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(`${this.apiUrl}/add/${userId}`, cartItem, {
      headers: this.getHeaders(),
    });
  }

  // UC-02: Get all items in the cart for a specific user
  getCart(userId: number): Observable<GenericResponse<CartItemDTO[]>> {
    return this.http.get<GenericResponse<CartItemDTO[]>>(`${this.apiUrl}/${userId}`, {
      headers: this.getHeaders(),
    });
  }

  // UC-03: Update the quantity of an item in the cart for a specific user
  updateCartItemQuantity(userId: number, itemId: number, quantity: number): Observable<GenericResponse<string>> {
    return this.http.put<GenericResponse<string>>(
      `${this.apiUrl}/update/${userId}/${itemId}`,
      quantity,
      { headers: this.getHeaders() }
    );
  }

  // UC-04: Remove an item from the cart for a specific user
  removeFromCart(userId: number, itemId: number): Observable<GenericResponse<string>> {
    return this.http.delete<GenericResponse<string>>(`${this.apiUrl}/remove/${userId}/${itemId}`, {
      headers: this.getHeaders(),
    });
  }

  // Private helper to add headers if needed (e.g., authentication)
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
