import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { HomeComponent } from './home/home/home.component';
import { FooterComponent } from './footer/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './about_us/about-us/about-us.component';
import { ContactUsComponent } from './contact_us/contact-us/contact-us.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { AuthInterceptor } from './services/auth/auth-intercepter';
import { AdminModule } from './admin/admin.module';
import { BrandsComponent } from './brands/brands.component';
import { CategoriesComponent } from './categories/categories.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductComponent } from './product/product.component';
import { DesignServicesComponent } from './design-services/design-services.component';
import { ProjectsComponent } from './projects/projects.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { WhatsappWidgetComponent } from './whatsapp-widget/whatsapp-widget.component';
import { TermsOfServiceComponent } from './policy_links/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './policy_links/privacy-policy/privacy-policy.component';
import { ShippingPolicyComponent } from './policy_links/shipping-policy/shipping-policy.component';
import { RefundPolicyComponent } from './policy_links/refund-policy/refund-policy.component';
import { ReturnPolicyComponent } from './policy_links/return-policy/return-policy.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CartComponent } from './cart/cart.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { ViewDetailsComponent } from './view-details/view-details.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    LoginComponent,
    RegisterComponent,
    BrandsComponent,
    CategoriesComponent,
    ProductComponent,
    DesignServicesComponent,
    ProjectsComponent,
    CompanyProfileComponent,
    WhatsappWidgetComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    ShippingPolicyComponent,
    RefundPolicyComponent,
    ReturnPolicyComponent,
    CartComponent,
    CheckoutFormComponent,
    ViewDetailsComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AdminModule,
    NgxPaginationModule,
    MatToolbarModule
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
