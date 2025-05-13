import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./user.component";
import { OrdersComponent } from "./orders/orders.component";
import { AccountDetailsComponent } from "./account-details/account-details.component";





const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'account-details', pathMatch: 'full' }, // Default route
      { path: 'orders', component: OrdersComponent },
      { path: 'account-details', component: AccountDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }