import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent }, // Default route
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent},


  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' } // Redirect unknown routes to Home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
