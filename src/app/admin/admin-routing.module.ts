import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAuthGuard } from '../services/auth/admin.auth.guard';
import { ViewBrandsComponent } from './brands/view_brands/view-brands/view-brands.component';
import { AddBrandsComponent } from './brands/add_brands/add-brands/add-brands.component';
import { EditBrandsComponent } from './brands/edit_brands/edit-brands/edit-brands.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'admin', component:AdminComponent },
    { path: 'view-brands', component: ViewBrandsComponent },
    { path: 'add-brands', component:AddBrandsComponent},
    { path: 'edit-brands', component:EditBrandsComponent}
  ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
