import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ViewBrandsComponent } from './brands/view_brands/view-brands/view-brands.component';



@NgModule({
  declarations: [
    AdminComponent,
    ViewBrandsComponent,
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
