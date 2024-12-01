import { LoginByEmail } from './../../interfaces/login-by-email';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { RegisterUser } from '../../interfaces/register-user';


@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  private apiUrl = 'http://localhost:5043/api/User'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  // Login method
  login(email: string, password: string): Observable<GenericResponse<number>> {
    const loginData = { email, password };
    return this.http.post<GenericResponse<number>>(
      `${this.apiUrl}/Login`,
      loginData
    );
  }

  // Register method
  register(user: RegisterUser): Observable<GenericResponse<boolean>> {
    return this.http.post<GenericResponse<boolean>>(
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
