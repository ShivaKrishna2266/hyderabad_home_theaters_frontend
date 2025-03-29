import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.scss']
})
export class EditCategoriesComponent implements OnInit{
  category! : CategoryDTO;
  brands: BrandDTO[] = [];

  constructor(
    private categoryService: CategoryService,  // Fixed the incorrect variable name
    private brandService: BrandService,  // Fixed the incorrect variable name
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.category = this.dataService.categoryData;
    this.getAllCategories();
    this.getAllBrands();
  }

  onSubmit(): void {
    if (!this.category.categoryName || !this.category.brandId) { // Fixed validation check
      alert('Please fill all required fields.');
      return;
    }

    if (confirm('Are you sure you want to update this category?')) {
      this.categoryService.updateCategory(this.category).subscribe(
        (res: any) => {
          console.log('Category Successfully updated');
          alert('Category updated successfully!');
          this.router.navigate(["/admin/view-categories"]); // Corrected navigation
        },
        (error: any) => {
          console.error('Error:', error);
          alert('Failed to update category. Please try again.');
        }
      );
    }
  }

  // onSubmit():void{
  //   if(this.category){
  //     this.categoryService.updateCategory(this.category).subscribe(
  //       (res:any)=>{
  //         this.router.navigate(['/admin/view-category']);
  //       }
  //     )
  //   }

  // }

  getAllBrands(): void {
    this.brandService.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res.data || [];
      },
      (error) => {
        console.log("Brands are not shown", error);
      }
    );
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.category = res.data || {} as CategoryDTO; // Fixed assignment to prevent type issues
      },
      (error) => {
        console.log("Categories are not shown", error);
      }
    );
  }
}