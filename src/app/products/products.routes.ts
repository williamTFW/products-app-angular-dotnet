import { Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductBrandPageComponent } from './pages/product-brand-page/product-brand-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { AddProductBrandPageComponent } from './pages/add-product-brand-page/add-product-brand-page.component';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import { UpdateProductBrandPageComponent } from './pages/update-product-brand-page/update-product-brand-page.component';
import { UpdateProductPageComponent } from './pages/update-product-page/update-product-page.component';

export const productRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      {
        path: 'product-list',
        component: ProductPageComponent,
      },
      {
        path: 'add-product',
        component: AddProductPageComponent,
      },
      {
        path: 'update-product/:id',
        component: UpdateProductPageComponent,
      },
      {
        path: 'product-brand-list',
        component: ProductBrandPageComponent,
      },
      {
        path: 'add-product-brand',
        component: AddProductBrandPageComponent,
      },
      {
        path: 'update-product-brand/:id',
        component: UpdateProductBrandPageComponent,
      },
      {
        path: '**',
        redirectTo: 'product-list',
      },
    ],
  },
];
