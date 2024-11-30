import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { ProductComponent } from './Product/product/product.component';
import { ErrorLogComponent } from './ErrorLog/error-log/error-log.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Route for Login Page
  { path: 'login', component: LoginComponent },

  // Route for Signup Page
  { path: 'signup', component: SignupComponent },

  // Route for Product Page
  { path: 'product', component: ProductComponent },

  {path: 'homepage', component: HomepageComponent},

  // Wildcard route for a 404 Page (if no route matches)
  { path: '**', component: ErrorLogComponent }
];
