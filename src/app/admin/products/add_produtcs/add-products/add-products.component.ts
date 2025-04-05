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
export class AddProductsComponent implements OnInit {

  product: ProductDTO[] = [];
  brands: BrandDTO[] = [];
  categories: CategoryDTO[] = [];
  subCategories: SubCategoryDTO[] = [];

  imageURL: File | null = null;

  productForm: FormGroup = this.formBuilder.group({});

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,

  ) { }
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
      status: ['', Validators.required],
      originalPrice: ['', Validators.required],
      discountedPrice: ['', Validators.required],
      discountPercentage: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      weight: ['', Validators.required],
      dimensions: ['', Validators.required],
      material: ['', Validators.required],
      warrantyPeriod: ['', Validators.required],
    });
  }

  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res.data;
      },
      (error) => {
        console.log("Brand is not found", error);
      });
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error) => {
        console.log("Category is not found", error);
      });
  }

  getAllSubCategories() {
    this.subCategoryService.getAllSubCategories().subscribe(
      (res: any) => {
        this.subCategories = res.data;
      },
      (error) => {
        console.log("Category is not found", error);
      });
  }

  onSubmit() {
    if (this.productForm.valid && this.imageURL) {
      const productData = this.productForm.value;
      console.log("Payload Sent:", productData); // 🔍 Debugging

      if (this.imageURL) {
        this.productService.addProduct(productData, this.imageURL).subscribe(
          (res: any) => {
            console.log("Brand is Added Successfully", res);
            this.router.navigate(["/admin/view-products"]);
          },
          err => {
            console.error("Error Adding Brand", err);
          }
        );
      }
    } else {
      console.log("Form is invalid");
    }

  }
  // onFileChange(event: any, fileType: string): void {
  //   const files: FileList = event.target.files;
  //   if (files.length > 0) {
  //     if (fileType === 'imageURL') {
  //       this.imageURL = files[0];
  //     }
  //   }
  // }

  onFileChange(event: any, fileType: string): void {
    const file: File = event.target.files[0];
    if (file && fileType === 'imageURL') {
      this.imageURL = file;
    }
  }

}