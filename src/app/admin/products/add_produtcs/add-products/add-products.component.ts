import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';
import { ProductService } from 'src/app/services/admin/product.service';
import { SubCategoryService } from 'src/app/services/admin/sub-category.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit{

  product : ProductDTO[]= [];
  brands : BrandDTO[]= [];
  categories : CategoryDTO[] = [];
  subCategories : SubCategoryDTO []=[];

  productForm: FormGroup = this.formBuilder.group({});

  constructor(
                private productService: ProductService,
                private formBuilder : FormBuilder,
                private router :Router,
                private brandService : BrandService,
                private categoryService : CategoryService,
                private subCategoryService : SubCategoryService,
               
  ){}
  ngOnInit(): void {
    this.getAllBrands();
    this.getAllCategory();
    this.getAllSubCategories();

    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      subCategoryId: ['', Validators.required],
      productPrice: ['', Validators.required],
      productRank: ['', Validators.required],
      productSku: ['', Validators.required],
      // imageName: ['', Validators.required],
      // imageURL: ['', Validators.required],
    });
  }

  getAllBrands(){
    this.brandService.getAllBrands().subscribe(
      (res :any)=>{
        this.brands = res.data;
      }, 
      (error)=>{
        console.log("Brand is not found" , error);
      });
  }

  getAllCategory(){
    this.categoryService.getAllCategories().subscribe(
      (res :any)=>{
        this.categories = res.data;
      }, 
      (error)=>{
        console.log("Category is not found" , error);
      });
  }

  getAllSubCategories(){
    this.subCategoryService.getAllSubCategories().subscribe(
      (res :any)=>{
        this.subCategories = res.data;
      }, 
      (error)=>{
        console.log("Category is not found" , error);
      });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = this.productForm.value;
      this.productService.addProduct(formData).subscribe(
        (res: any) => {
          console.log("Product is Added Successfully", res);
          this.router.navigate(["/admin/view-products"]);
        },
        (error: any) => {
          console.error("Error adding product", error);
        }
      );
    }
  }
  
}
