import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Register/register/register.component';
import { StudentComponent } from './Student/student/student.component';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { AdminComponent } from './Admin/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // ✅ Corrected redirection
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student-dashboard', component: StudentComponent }, // ✅ Lowercase and consistent naming
  { path: 'employee-dashboard', component: EmployeeComponent },
  { path: 'admin-dashboard', component: AdminComponent },
  { path: '**', redirectTo: 'login' } // ✅ Wildcard route to catch unknown paths
];
