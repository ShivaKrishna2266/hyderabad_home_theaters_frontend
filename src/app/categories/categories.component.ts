import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { SubCategoryDTO } from '../DTO/subCategoryDTO';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categoryId: number | null = null;
  subCategories: SubCategoryDTO[] = [];


  constructor(
    private route: ActivatedRoute,
    private dataLoaderService: DataLoaderService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(parmas => {
      const id = parmas.get('categoryId');
      if (id) {
        this.categoryId = Number(id);
        this.getSubCategoryByCategory(this.categoryId);
      }
    });
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


}
