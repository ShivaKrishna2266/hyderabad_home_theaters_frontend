import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ViewBrandsComponent } from './brands/view_brands/view-brands/view-brands.component';
import { AddBrandsComponent } from './brands/add_brands/add-brands/add-brands.component';


@NgModule({
  declarations: [
    AdminComponent,
    ViewBrandsComponent,
    AddBrandsComponent,
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
