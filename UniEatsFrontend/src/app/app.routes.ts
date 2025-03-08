import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Register/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect empty path to login
    { path: 'login', component: LoginComponent } ,
    {path: 'register', component: RegisterComponent}
];
