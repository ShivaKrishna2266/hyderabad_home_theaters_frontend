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
import { ViewSubCategoryComponent } from './sub_category/view_sub_category/view-sub-category/view-sub-category.component';
import { AddSubCategoryComponent } from './sub_category/add_sub_category/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './sub_category/edit_sub_category/edit-sub-category/edit-sub-category.component';


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
    ViewSubCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
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
