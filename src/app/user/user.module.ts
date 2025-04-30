import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersComponent } from './orders/orders.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
@NgModule({
  declarations: [
    UserComponent,
    OrdersComponent,
    AccountDetailsComponent,
   
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserComponent,
  ]
})
export class UserModule { }
