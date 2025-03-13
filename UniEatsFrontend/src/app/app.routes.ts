import { OrderFoodComponent } from './Student/order-food/order-food.component';
import { CheckBalanceComponent } from './Student/check-balance/check-balance.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Register/register/register.component';
import { StudentComponent } from './Student/student/student.component';
import { MenuComponent } from './Student/menu/menu.component';
import { EmployeeComponent } from './Employee/employee/employee.component';
import { AdminComponent } from './Admin/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student-dashboard', component: StudentComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'order-food', component: OrderFoodComponent },
  {path: 'check-balance', component: CheckBalanceComponent },
  { path: 'employee-dashboard', component: EmployeeComponent },
  { path: 'admin-dashboard', component: AdminComponent },
  { path: '**', redirectTo: 'login' }
];
