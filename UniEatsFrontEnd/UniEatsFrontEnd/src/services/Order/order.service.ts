import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { OrderDTO } from '../../interfaces/order-dto';
import { GenericResponse } from '../../GenericResponse/generic-response';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:5000/api/order';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  // Fetch user's order history
  getOrdersByUser(userId: number): Observable<GenericResponse<OrderDTO[]>> {
    return this.http.get<GenericResponse<OrderDTO[]>>(`${this.apiUrl}/get/${userId}`);
  }

  // Place a new order
  placeOrder(order: OrderDTO): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(
      `${this.apiUrl}/create`,
      order,
      this.httpOptions
    );
  }

  // Cancel an order
  cancelOrder(orderId: number): Observable<GenericResponse<string>> {
    return this.http.delete<GenericResponse<string>>(
      `${this.apiUrl}/delete/${orderId}`,
      this.httpOptions
    );
  }
}
