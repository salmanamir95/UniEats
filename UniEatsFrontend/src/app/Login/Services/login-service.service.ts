import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  constructor(private router: Router) {}

  private users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@student.university.edu', password: 'password123', designation: 'Student' },
    { id: 2, name: 'Bob Smith', email: 'bob@student.university.edu', password: 'bobpass456', designation: 'Student' },
    { id: 3, name: 'Dr. Emily Clark', email: 'emily@university.edu', password: 'emilypass789', designation: 'Employee' },
    { id: 4, name: 'Mr. John Doe', email: 'john@university.edu', password: 'johnpass321', designation: 'Employee' },
    { id: 5, name: 'Admin One', email: 'admin1@university.edu', password: 'adminpass111', designation: 'Admin' },
    { id: 6, name: 'Admin Two', email: 'admin2@university.edu', password: 'adminpass222', designation: 'Admin' }
  ];

  login(email: string, password: string) {
    const user = this.users.find(u => u.email === email && u.password === password);
    return user || null; // Return user object if found, otherwise null
  }
}
