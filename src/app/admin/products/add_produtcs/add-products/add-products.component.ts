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
    if (this.productForm.valid && this.imageURL) {
      const productData = this.productForm.value;
      console.log("Payload Sent:", productData); // Debugging output

      // Send data to the product service with the image
      this.productService.addProduct(productData, this.imageURL).subscribe(
        (res: any) => {
          console.log("Product Added Successfully", res);
          this.router.navigate(["/admin/view-products"]);
        },
        (err) => {
          console.error("Error Adding Product", err);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }

  // Handle file selection for image upload
  onFileChange(event: any, fileType: string): void {
    const file: File = event.target.files[0];
    if (file && fileType === 'imageURL') {
      this.imageURL = file;
    }
  }
}