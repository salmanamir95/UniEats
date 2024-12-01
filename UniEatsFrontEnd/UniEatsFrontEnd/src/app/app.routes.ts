import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { ProductComponent } from './Product/product/product.component';
import { ErrorLogComponent } from './ErrorLog/error-log/error-log.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu/menu.component';
import { CheckoutWithCashComponent } from './checkout-with-cash/checkout-with-cash.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Route for Login Page
  { path: 'login', component: LoginComponent },

  // Route for Signup Page
  { path: 'signup', component: SignupComponent },

  // Route for Product Page
  { path: 'product', component: ProductComponent },

  { path: 'home', component: HomepageComponent },

  { path: 'resetpassword', component: ResetPasswordComponent },

  { path: 'menu', component: MenuComponent },

  { path: 'menu-item', component: MenuItemComponent },

  { path: 'checkout-with-card', component: CheckoutWithCashComponent },

  { path: 'checkout-with-cash', component: CheckoutWithCashComponent },

  {path: 'aboutus', component: AboutUsComponent},

  {path: 'contactus', component: ContactUsComponent},

  // Wildcard route for a 404 Page (if no route matches)
  { path: '**', component: ErrorLogComponent }
];
