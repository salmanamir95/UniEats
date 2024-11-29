import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/admin/login/login.component';
import { ProductComponent } from './Pages/admin/product/product.component';
import { LayoutsComponent } from './Pages/admin/layouts/layouts.component';
import { MenuComponent } from './Pages/admin/menu/menu.component';
import { SuccessComponent } from './Pages/admin/success/success.component';
import { RegisterComponent } from './Pages/admin/register/register.component';

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
            }
        ]
    }
];
