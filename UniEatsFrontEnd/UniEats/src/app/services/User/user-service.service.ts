import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginByUsername } from '../../interfaces/login-by-username';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {



  private apiUrl = 'http://localhost:5043/api/User'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  // GET: Fetch user by ID
  // getUser(userId: number): Observable<LoginByUsername> {
  //   return this.http.get<LoginByUsername>(`${this.apiUrl}/${userId}`);
  // }

  // POST: Add a new user
  // addUser(user: LoginByUsername): Observable<LoginByUsername> {
  //   return this.http.post<LoginByUsername>(this.apiUrl, user);
  // }

  // PUT: Update an existing user
  // updateUser(userId: number, user: Partial<LoginByUsername>): Observable<LoginByUsername> {
  //   return this.http.put<LoginByUsername>(`${this.apiUrl}/${userId}`, user);
  // }

  login(credentials: LoginByUsername): Observable<any> {
    return this.http.post(`${this.apiUrl}/Login`, credentials);
  }
}
