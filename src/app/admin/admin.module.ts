import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewBrandsComponent } from './brands/view_brands/view-brands/view-brands.component';
import { AddBrandsComponent } from './brands/add_brands/add-brands/add-brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBrandsComponent } from './brands/edit_brands/edit-brands/edit-brands.component';
import { ViewCategoriesComponent } from './categories/view_categories/view-categories/view-categories.component';
import { AddCategoriesComponent } from './categories/add_categories/add-categories/add-categories.component';
import { EditCategoriesComponent } from './categories/edit_categories/edit-categories/edit-categories.component';
import { ViewProductsComponent } from './products/view_products/view-products/view-products.component';
import { AddProductsComponent } from './products/add_produtcs/add-products/add-products.component';
import { EditProductsComponent } from './products/edit_products/edit-products/edit-products.component';


@NgModule({
  declarations: [
    AdminComponent,
    ViewBrandsComponent,
    AddBrandsComponent,
    EditBrandsComponent,
    ViewCategoriesComponent,
    AddCategoriesComponent,
    EditCategoriesComponent,
    ViewProductsComponent,
    AddProductsComponent,
    EditProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdminComponent,
  ]
})
export class AdminModule { }
