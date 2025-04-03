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
  categories: CategoryDTO = {} as CategoryDTO;
  brands: BrandDTO[] = [];

  constructor(
    private categoryService: CategoryService,
    private brandService: BrandService,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const categoryData = this.dataService.categoryData;
    if (categoryData) {
      this.categories = categoryData;
    }
    this.getAllBrands();
  }

  onSubmit(): void {
    if (!this.categories.categoryName || !this.categories.brandId) {
      alert('Please fill all required fields: Category Name and Brand Name.');
      return;
    }

    this.categoryService.updateCategory(this.categories).subscribe(
      (res: any) => {
        console.log('Category Successfully updated:', res);
        alert('Category updated successfully!');
        this.router.navigate(['/admin/view-categories']);
      },
      (error: any) => {
        console.error('Error updating category:', error);
        alert(`Failed to update category. ${error.message || 'Unknown error'}`);
      }
    );
  }

  getAllBrands(): void {
    this.brandService.getAllBrands().subscribe(
      (res: any) => {
        if (res && res.data) {
          this.brands = res.data;
        } else {
          console.warn('No brands found.');
        }
      },
      (error) => {
        console.error("Error fetching brands:", error);
      }
    );
  }
}