import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Register/register/register.component';
import { StudentComponent } from './Student/student/student.component';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { AdminComponent } from './Admin/admin/admin.component';
import { authGuard } from './Login/auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect empty path to login
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'student', component: StudentComponent, canActivate: [authGuard] },
    { path: 'employee', component: EmployeeComponent, canActivate: [authGuard] },
    { path: 'admin', component: AdminComponent, canActivate: [authGuard] }
];
