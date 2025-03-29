import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAuthGuard } from '../services/auth/admin.auth.guard';
import { ViewBrandsComponent } from './brands/view_brands/view-brands/view-brands.component';
import { AddBrandsComponent } from './brands/add_brands/add-brands/add-brands.component';
import { EditBrandsComponent } from './brands/edit_brands/edit-brands/edit-brands.component';
import { ViewCategoriesComponent } from './categories/view_categories/view-categories/view-categories.component';
import { AddCategoriesComponent } from './categories/add_categories/add-categories/add-categories.component';
import { EditCategoriesComponent } from './categories/edit_categories/edit-categories/edit-categories.component';
import { ViewProductsComponent } from './products/view_products/view-products/view-products.component';
import { AddProductsComponent } from './products/add_produtcs/add-products/add-products.component';
import { EditProductsComponent } from './products/edit_products/edit-products/edit-products.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'admin', component:AdminComponent },
    { path: 'view-brands', component: ViewBrandsComponent },
    { path: 'add-brands', component:AddBrandsComponent},
    { path: 'edit-brands', component:EditBrandsComponent},
    { path: 'view-categories', component:ViewCategoriesComponent},
    { path: 'add-categories', component:AddCategoriesComponent},
    { path: 'edit-categories', component:EditCategoriesComponent},
    { path: 'view-products', component:ViewProductsComponent},
    { path: 'add-products', component:AddProductsComponent},
    { path: 'edit-products', component: EditProductsComponent}
  ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
