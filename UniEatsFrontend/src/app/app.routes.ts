import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Register/register/register.component';
import { StudentComponent } from './Student/student/student.component';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { MenuComponent } from './Student/menu/menu.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'student-dashboard', 
    component: StudentComponent,
    children: [
      { path: 'menu', component: MenuComponent } // ✅ Child route under student-dashboard
    ]
  },
  { path: 'employee-dashboard', component: EmployeeComponent },
  { path: 'admin-dashboard', component: AdminComponent },
  { path: '**', redirectTo: 'login' }
];
