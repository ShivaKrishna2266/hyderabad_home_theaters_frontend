import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { SubCategoryDTO } from '../DTO/subCategoryDTO';
import { CategoryDTO } from '../DTO/categoryDTO';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: CategoryDTO[] = [];
  categoryId: number | null = null;
  subCategories: SubCategoryDTO[] = [];



  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {

    this.getAllCategories();

    this.route.paramMap.subscribe(parmas => {
      const id = parmas.get('categoryId');
      if (id) {
        this.categoryId = Number(id);
        this.getSubCategoryByCategory(this.categoryId);
      } else {
        this.categoryId = null;
        this.subCategories = []; // Reset if no category is selected
      }
    });
  }

  getAllCategories(): void {
    this.dataLoaderService.getAllCategories().subscribe(
      (res: any) => {
        if (res) {
          this.categories = res.data || res;
        } else {
          console.log("No Categories are not found");
          this.categories = [];
        }
      },
      (error) => {
        console.error('Error fetching Categories :', error);
        this.categories = [];
      }
    );
  }

  getSubCategoryByCategory(categoryId: number): void {
    this.dataLoaderService.getSubCategoryByCategory(categoryId).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.subCategories = res.data;
        } else {
          console.warn('No subcategories found for category ID:', categoryId);
          this.subCategories = []; // Ensure the array is reset if no data is received
        }
      },
      (error) => {
        console.error('Error fetching subcategories:', error);
        this.subCategories = []; // Reset on error to avoid stale data
      }
    );
  }


  filterSubcategories(): void {
    this.subCategories = this.subCategories.filter(sub => sub.categoryId === this.categoryId);
  }

  showCategories(): void {
    this.categoryId = null;
    this.subCategories = [];
    this.router.navigate(['/categories']);
  }
}
