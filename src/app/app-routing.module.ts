import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { HeaderComponent } from './header/header/header.component';
import { FooterComponent } from './footer/footer/footer.component';
import { AboutUsComponent } from './about_us/about-us/about-us.component';
import { ContactUsComponent } from './contact_us/contact-us/contact-us.component';
import { RegisterComponent } from './register/register/register.component';
import { LoginComponent } from './login/login.component';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductComponent } from './product/product.component';
import { DesignServicesComponent } from './design-services/design-services.component';
import { ProjectsComponent } from './projects/projects.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';



const routes: Routes = [

  { path: 'home', component: HomeComponent }, // Default route
  { path: 'header', component: HeaderComponent},
  { path: 'footer', component: FooterComponent},
  { path: 'aboutUs', component:AboutUsComponent},
  { path: 'contactUs', component:ContactUsComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  { path: 'brands', component:BrandsComponent},
  { path: 'brands/:brandId', component: BrandsComponent },
  { path: 'categories', component:CategoriesComponent},
  { path: 'categories/:categoryId', component: CategoriesComponent },
  { path: 'product', component:ProductComponent},
  { path: 'design-services', component:DesignServicesComponent},
  { path: 'projects', component:ProjectsComponent},
  { path: 'company-profile', component:CompanyProfileComponent},


  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '' } // Redirect unknown routes to Home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
