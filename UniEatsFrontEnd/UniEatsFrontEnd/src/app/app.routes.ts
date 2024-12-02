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
import { ReservationComponent } from './reservation/reservation.component';
import { ProfileComponent } from './profile/profile.component';
import { HeroPageComponent } from './admin/hero-page/hero-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Route for Login Page
  { path: 'login', component: LoginComponent },

  // Route for Signup Page
  { path: 'signup', component: SignupComponent },

  // Route for Product Page
  { path: 'product/:id', component: ProductComponent },

  { path: 'home/:id', component: HomepageComponent },

  { path: 'resetpassword/:id', component: ResetPasswordComponent },

  { path: 'menu/:id', component: MenuComponent },

  { path: 'menu-item/:id', component: MenuItemComponent },

  { path: 'checkout-with-card/:id', component: CheckoutWithCashComponent },

  { path: 'checkout-with-cash/:id', component: CheckoutWithCashComponent },

  {path: 'aboutus/:id', component: AboutUsComponent},

  {path: 'contactus/:id', component: ContactUsComponent},

  {path: 'reservation/:id', component: ReservationComponent},

  {path: 'profile/:id', component: ProfileComponent},

  {path: 'admin', component: HeroPageComponent},

  // Wildcard route for a 404 Page (if no route matches)
  { path: '**', component: ErrorLogComponent }
];
