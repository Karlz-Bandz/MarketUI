import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProductPresentationComponent } from './product-presentation/product-presentation.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductComponent },
    { path: 'product/:id', component: ProductPresentationComponent },
    { path: '**', redirectTo: '/login' } 
];
