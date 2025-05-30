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

  images: File[] = [];
  imagePreviews: string[] = [];

  productForm: FormGroup = this.formBuilder.group({
    productName: ['', [Validators.required, Validators.minLength(3)]],
    brandId: ['', Validators.required],
    categoryId: ['', Validators.required],
    subCategoryId: ['', Validators.required],
    productPrice: ['', [Validators.required, Validators.min(0)]],
    productRank: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
    productSku: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9\-]+$/)]],
    status: ['', Validators.required],
    originalPrice: ['', [Validators.required, Validators.min(0)]],
    discountedPrice: ['', [Validators.required, Validators.min(0)]],
    discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    color: ['', Validators.required],
    size: ['', Validators.required],
    weight: ['', [Validators.required, Validators.min(0)]],
    dimensions: ['', Validators.required],
    material: ['', Validators.required],
    description:['', Validators.required],
    warrantyPeriod: ['', [Validators.required, Validators.min(1)]],
  });

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
  }

  // Fetch all brands from the backend
  getAllBrands() {
    this.brandService.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res.data;
      },
      (error) => {
        console.log("Brands not found", error);
      });
  }

  // Fetch all categories from the backend
  getAllCategory() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error) => {
        console.log("Categories not found", error);
      });
  }

  // Fetch all subcategories from the backend
  getAllSubCategories() {
    this.subCategoryService.getAllSubCategories().subscribe(
      (res: any) => {
        this.subCategories = res.data;
      },
      (error) => {
        console.log("Subcategories not found", error);
      });
  }

  // Handle form submission
  onSubmit() {
  if (this.productForm.valid && this.images.length > 0) {
    const productData = this.productForm.value;

    const formData = new FormData();
    formData.append('productDTO', JSON.stringify(productData));  // IMPORTANT: stringify!

    for (let i = 0; i < this.images.length; i++) {
      formData.append('productImageFile', this.images[i]);  // match backend param name
    }

    this.productService.addProduct(formData).subscribe(
      (res: any) => {
        console.log("Product Added Successfully", res);
        this.router.navigate(["/admin/view-products"]);
      },
      (err) => {
        console.error("Error Adding Product", err);
      }
    );
  } else {
    console.log("Form is invalid or no images selected");
  }
}

  // Handle file selection for image upload
 onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.images = [];
    this.imagePreviews = [];

    for (let i = 0; i < files.length && i < 3; i++) {
      const file = files[i];
      this.images.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    if (files.length > 2) {
      alert('You can only upload up to 2 images.');
    }
  }
}