import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { CategoryService } from 'src/app/services/admin/category.service';
import { ProductService } from 'src/app/services/admin/product.service';
import { SubCategoryService } from 'src/app/services/admin/sub-category.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-sub-category',
  templateUrl: './edit-sub-category.component.html',
  styleUrls: ['./edit-sub-category.component.scss']
})
export class EditSubCategoryComponent implements OnInit {
  subCategories: SubCategoryDTO = {} as SubCategoryDTO;
  
  categories : CategoryDTO[]= [];
  products : ProductDTO[] =[];

  constructor(
              private subCategoryService : SubCategoryService,
              private categoryService: CategoryService,
              private productService : ProductService,
              private router : Router,
              private dataService : DataService,
               
  ){}
   
  ngOnInit(): void {
    this.subCategories = this.dataService.subCategoryData || {} as SubCategoryDTO; 

    this.getAllCategories();
    this.getAllProducts();
  }


  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      (res :any)=>{
        this.categories = res.data;
      }, 
      (error)=>{
        console.log("Category is not found" , error);
      });
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(
      (res :any)=>{
        this.products = res.data;
      }, 
      (error)=>{
        console.log("Product is not found" , error);
      });
  }

  onSubmit() {
    if (!this.subCategories || !this.subCategories.categoryId) {
      alert("Invalid SubCategory data!");
      return;
    }
  
    this.subCategoryService.updateSubCategory(this.subCategories).subscribe(
      (res: any) => {
        console.log('Sub Category Successfully updated:', res);
        alert('Sub Category updated successfully!');
        this.router.navigate(["/admin/view-subCategory"]);
      },
      (error) => {
        console.error('Error updating Sub Category:', error);
        alert('Failed to update Sub Category. Please try again.');
      }
    );
  }
  
}

