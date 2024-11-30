import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/admin/login/login.component';
import { ProductComponent } from './Pages/admin/product/product.component';
import { LayoutsComponent } from './Pages/admin/layouts/layouts.component';
import { MenuComponent } from './Pages/admin/menu/menu.component';
import { SuccessComponent } from './Pages/admin/success/success.component';
import { RegisterComponent } from './Pages/admin/register/register.component';
import { PizzaSliceComponent } from './Pages/website/pizzaslice/pizzaslice.component';
import { AboutUsComponent } from './Pages/admin/about-us/about-us.component';
import { ContactUsComponent } from './Pages/admin/contact-us/contact-us.component';
import { UserprofileComponent } from './Pages/admin/userprofile/userprofile.component';
import { BiryaniComponent } from './Pages/admin/biryani/biryani.component';
import { PastaComponent } from './Pages/admin/pasta/pasta.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'success',
        component: SuccessComponent
    },
    {
        path: '',
        component: LayoutsComponent,
        children: [
            {
                path:'products',
                component: ProductComponent
            },
            {
                path: 'menu',
                component: MenuComponent
            },
            {
                path: 'pizza',
                component: PizzaSliceComponent
            },
            {
                path: 'biryani',
                component: BiryaniComponent
            },
            {
                path: 'pasta',
                component: PastaComponent
            },
            {
                path: 'about',
                component: AboutUsComponent
            },
            {
                path: 'contact',
                component: ContactUsComponent
            },
            {
                path: 'profile',
                component: UserprofileComponent
            },
            
        ]
    }
];
