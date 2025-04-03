import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { count } from 'rxjs';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { CategoryService } from 'src/app/services/admin/category.service';
import { ProductService } from 'src/app/services/admin/product.service';
import { SubCategoryService } from 'src/app/services/admin/sub-category.service';

@Component({
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  categories: CategoryDTO[] = [];
  prducts: ProductDTO[] = [];
  subCategoryForm: FormGroup = this.formBuilder.group({});
  constructor(
    private subCategoryService: SubCategoryService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,

  ) { }

  ngOnInit(): void {


    this.subCategoryForm = this.formBuilder.group({
      subCategoryName: ['', Validators.required],
      description: ['', Validators.required],
      tagline: ['', Validators.required],
      categoryId: ['', Validators.required],
      productId: ['', Validators.required],
    });

    this.getAllCategories();
    this.getAllProducts();
  }

  getAllCategories() {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data;
      },
      (error) => {
        console.log("Category Data not Found", error);
      });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        this.prducts = res.data;
      },
      (error) => {
        console.log("Product Data not Found", error);
      });
  }

  onSubmit() {
    if (this.subCategoryForm.valid) {
      const subCategoryData = this.subCategoryForm.value;
      this.subCategoryService.addSubCategory(subCategoryData).subscribe(
        (res: any) => {
          console.log("Sub CAtegory is Added Successfully", res);
          this.router.navigate(["/admin/view-subCategory"]);
        },
        (error) => {
          console.log("Sub Category is not Added fetching Error", error);
        });
    } else {
      console.log("Form is invalid");
    }
  }

}
