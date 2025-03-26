import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-brands',
  templateUrl: './edit-brands.component.html',
  styleUrls: ['./edit-brands.component.scss']
})
export class EditBrandsComponent implements OnInit {
  brand: BrandDTO = {} as BrandDTO;
  categories: CategoryDTO[] = [];

  constructor(
    private dataService: DataService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.brand = this.dataService.brandData || {} as BrandDTO; // Ensure brand is an object
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res.data || [];
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit(): void {
    if (!this.brand.brandName || !this.brand.categoryId) {
      alert('Please fill all required fields.');
      return;
    }

    if (confirm('Are you sure you want to update this brand?')) {
      this.brandService.updateBrand(this.brand).subscribe(
        (res: any) => {
          console.log('Brand Successfully updated');
          alert('Brand updated successfully!');
          this.router.navigate(["/admin/view-brands"]);
        },
        (error) => {
          console.error('Error:', error);
          alert('Failed to update brand. Please try again.');
        }
      );
    }
  }
}