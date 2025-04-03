import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';
import { ProductService } from 'src/app/services/admin/product.service';
import { SubCategoryService } from 'src/app/services/admin/sub-category.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss']
})
export class EditProductsComponent implements OnInit {
 product : ProductDTO= {} as ProductDTO;
 brands : BrandDTO[]= [];
 categories : CategoryDTO[] = [];
 subCategories : SubCategoryDTO[] = [];
 
  constructor(
              private dataService : DataService,
              private router : Router,
              private brandService : BrandService,
              private categoryService : CategoryService,
              private subCategoryService : SubCategoryService,
              private productService : ProductService,
  ){};

  ngOnInit(): void {
    this.product = this.dataService.productData || {} as ProductDTO; 
    this.getAllBrands();
    this.getAllCategories();
    this.getAllSubCategories();
  }
 
  
  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      (res : any)=>{
        this.brands = res.data;
      },
      (error)=>{
        console.log("Brands are not found", error);
      }
    )
  }

  getAllSubCategories() {
   this.subCategoryService.getAllSubCategories().subscribe(
    (res : any)=>{
      this.subCategories = res.data;
    },
    (error)=>{
      console.log("SubCategories are not found", error);
    }
  )
}
  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res : any)=>{
        this.categories = res.data;
      },
      (error)=>{
        console.log("Categories are not found", error);
      }
    )
  }

  onSubmit():void{
    if (!this.product.productName || !this.product.brandId) {
      alert('Please fill all required fields.');
      return;
    }
    if (confirm('Are you sure you want to update this product?')) {
      this.productService.updateProduct(this.product).subscribe(
        (res: any) => {
          console.log('Product Successfully updated');
          alert('Product is updated successfully!');
          this.router.navigate(["/admin/view-products"]);
        },
        (error: any) => {
          console.log('Error:', error);
          alert('Failed to update product. Please try again.');
        }
      );
    }
  }

  }




