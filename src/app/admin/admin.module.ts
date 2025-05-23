import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ViewBrandsComponent } from './brands/view_brands/view-brands/view-brands.component';
import { AddBrandsComponent } from './brands/add_brands/add-brands/add-brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBrandsComponent } from './brands/edit_brands/edit-brands/edit-brands.component';
import { ViewCategoriesComponent } from './categories/view_categories/view-categories/view-categories.component';
import { AddCategoriesComponent } from './categories/add_categories/add-categories/add-categories.component';
import { EditCategoriesComponent } from './categories/edit_categories/edit-categories/edit-categories.component';
import { ViewProductsComponent } from './products/view_products/view-products/view-products.component';
import { AddProductsComponent } from './products/add_produtcs/add-products/add-products.component';
import { EditProductsComponent } from './products/edit_products/edit-products/edit-products.component';
import { ViewSubCategoryComponent } from './sub_category/view_sub_category/view-sub-category/view-sub-category.component';
import { AddSubCategoryComponent } from './sub_category/add_sub_category/add-sub-category/add-sub-category.component';
import { EditSubCategoryComponent } from './sub_category/edit_sub_category/edit-sub-category/edit-sub-category.component';
import { ViewTestimonialComponent } from './testimonial/view-testimonial/view-testimonial.component';
import { AddTestimonialComponent } from './testimonial/add-testimonial/add-testimonial.component';
import { EditTestimonialComponent } from './testimonial/edit-testimonial/edit-testimonial.component';
import { OrdersComponent } from './orders/orders.component';
import { ReviewComponent } from './review/review.component';
import { QuestionsAnswersComponent } from './questions-answers/questions-answers.component';
import { EditQuestionAnswerComponent } from './edit-question-answer/edit-question-answer.component';
import { EditReviewComponent } from './edit-review/edit-review.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';



@NgModule({
  declarations: [
    AdminComponent,
    ViewBrandsComponent,
    AddBrandsComponent,
    EditBrandsComponent,
    ViewCategoriesComponent,
    AddCategoriesComponent,
    EditCategoriesComponent,
    ViewProductsComponent,
    AddProductsComponent,
    EditProductsComponent,
    ViewSubCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    ViewTestimonialComponent,
    AddTestimonialComponent,
    EditTestimonialComponent,
    OrdersComponent,
    ReviewComponent,
    QuestionsAnswersComponent,
    EditQuestionAnswerComponent,
    EditReviewComponent,
    HeaderComponent,
    ProjectsComponent,
    AddProjectComponent,
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
