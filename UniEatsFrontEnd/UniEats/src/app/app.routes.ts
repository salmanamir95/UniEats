import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/admin/login/login.component';
import { LayoutComponent } from './Pages/admin/layout/layout.component';
import { ProductComponent } from './Pages/admin/product/product.component';

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
        path: '',
        component: LayoutComponent,
        children: [
            {
                path:'products',
                component: ProductComponent
            }
        ]
    }
];
