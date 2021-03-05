import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductsSearchComponent } from './products-search/products-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main', component: MainPageComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'search', component: ProductsSearchComponent},
  { path: 'admin', component: AdminPageComponent},
  { path: 'add', component: AdminProductComponent},
  { path: 'edit/:id', component: AdminProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
