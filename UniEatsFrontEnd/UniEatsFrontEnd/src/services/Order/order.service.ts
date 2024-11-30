import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { OrderDTO } from '../../interfaces/order-dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = 'http://localhost:5043/api/Order'; // Backend API base URL

  constructor(private http: HttpClient) {}

  /**
   * Create a new order.
   * @param order OrderDTO containing order details.
   * @returns Observable of GenericResponse with a success message.
   */
  createOrder(order: OrderDTO): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(`${this.baseUrl}/create`, order);
  }

  /**
   * Get orders for a specific user.
   * @param userId ID of the user whose orders are to be fetched.
   * @returns Observable of GenericResponse containing a list of OrderDTO objects.
   */
  getOrdersByUser(userId: number): Observable<GenericResponse<OrderDTO[]>> {
    return this.http.get<GenericResponse<OrderDTO[]>>(`${this.baseUrl}/get/${userId}`);
  }

  /**
   * Update an order's details.
   * @param orderId ID of the order to update.
   * @param order Updated order details in OrderDTO format.
   * @returns Observable of GenericResponse with a success message.
   */
  updateOrder(orderId: number, order: OrderDTO): Observable<GenericResponse<string>> {
    return this.http.put<GenericResponse<string>>(`${this.baseUrl}/update/${orderId}`, order);
  }

  /**
   * Cancel an order by marking its status as "Cancelled".
   * @param orderId ID of the order to cancel.
   * @returns Observable of GenericResponse with a success message.
   */
  cancelOrder(orderId: number): Observable<GenericResponse<string>> {
    return this.http.delete<GenericResponse<string>>(`${this.baseUrl}/delete/${orderId}`);
  }
}
