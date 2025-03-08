import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private router: Router) { }

  UserData = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@student.university.edu',
      password: 'password123',
      designation: 'Student'
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@student.university.edu',
      password: 'bobpass456',
      designation: 'Student'
    },
    {
      id: 3,
      name: 'Dr. Emily Clark',
      email: 'emily@university.edu',
      password: 'emilypass789',
      designation: 'Employee'
    },
    {
      id: 4,
      name: 'Mr. John Doe',
      email: 'john@university.edu',
      password: 'johnpass321',
      designation: 'Employee'
    },
    {
      id: 5,
      name: 'Admin One',
      email: 'admin1@university.edu',
      password: 'adminpass111',
      designation: 'Admin'
    },
    {
      id: 6,
      name: 'Admin Two',
      email: 'admin2@university.edu',
      password: 'adminpass222',
      designation: 'Admin'
    }
  ];

  login(email: string, password: string) {
    var user = this.UserData.find(e => e.email === email && e.password === password);

    if (user) {
      console.log('Login successful:', user);
      
      let additionalInfo: any = {};
      if (user.designation === 'Student') {
        additionalInfo.studentId = user.id;
      } else if (user.designation === 'Employee') {
        additionalInfo.employeeId = user.id;
      } else if (user.designation === 'Admin') {
        additionalInfo.adminPrivileges = ['manage users', 'edit menus'];
      }

      const loggedInUser = UserFactory.createUser(user.id, user.name, user.email, user.designation, additionalInfo);

      // Store user data in sessionStorage (for persistence)
      sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

      // Redirect to the correct page
      switch (user.designation) {
        case 'Student':
          this.router.navigate(['/student-dashboard']);
          break;
        case 'Employee':
          this.router.navigate(['/employee-dashboard']);
          break;
        case 'Admin':
          this.router.navigate(['/admin-dashboard']);
          break;
        default:
          console.error('Invalid designation');
      }

      return loggedInUser;
    } else {
      console.log('Invalid email or password');
      return null;
    }
  }
}
