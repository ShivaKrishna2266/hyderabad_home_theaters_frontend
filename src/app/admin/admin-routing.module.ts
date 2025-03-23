import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAuthGuard } from '../services/auth/admin.auth.guard';
import { ViewBrandsComponent } from './brands/view_brands/view-brands/view-brands.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    // { path: 'admin'}
    { path: 'view-brands', component: ViewBrandsComponent },
  ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
