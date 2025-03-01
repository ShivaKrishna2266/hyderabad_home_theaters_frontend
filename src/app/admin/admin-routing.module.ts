import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminAuthGuard } from '../services/auth/admin.auth.guard';

const routes: Routes = [
  { path: 'admin-dashbord', component: AdminComponent },
  { path: '', component: AdminComponent , canActivate:[AdminAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
