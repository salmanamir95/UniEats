import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginByUsername } from '../../interfaces/login-by-username';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { User } from '../../models/user';
import { Order } from '../../models/order';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = 'http://localhost:5043/api/User'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  // Login method
  login(username: string, password: string): Observable<GenericResponse<User>> {
    const loginData = { username, password };
    return this.http.post<GenericResponse<User>>(
      `${this.apiUrl}/Login`,
      loginData
    );
  }

  // Register method
  register(user: User): Observable<GenericResponse<User>> {
    return this.http.post<GenericResponse<User>>(
      `${this.apiUrl}/Register`,
      user
    );
  }

  // Get all users (for admin, if needed)
  getAllUsers(): Observable<GenericResponse<User[]>> {
    return this.http.get<GenericResponse<User[]>>(`${this.apiUrl}/GetAllUsers`);
  }

  // Edit user profile
  editProfile(user: User): Observable<GenericResponse<boolean>> {
    return this.http.put<GenericResponse<boolean>>(
      `${this.apiUrl}/EditProfile`,
      user
    );
  }

  // Fetch order history for a user
  getOrderHistory(userId: number): Observable<GenericResponse<Order[]>> {
    return this.http.post<GenericResponse<Order[]>>(
      `${this.apiUrl}/OrderHistory`,
      { UID: userId }
    );
  }
}