import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataLoaderService } from 'src/app/services/data_loader/data-loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  categories: CategoryDTO[] = [];
  subCategories: SubCategoryDTO[] = [];
  categoryId: string | null = null;
  selectedCategoryId: number | null = null;
  cartCount: number = 0;

  constructor(
    private dataLoaderService: DataLoaderService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();

    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });

    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId');
      if (this.categoryId) {
        const categoryIdNum = Number(this.categoryId);
        if (!isNaN(categoryIdNum)) {
          this.selectedCategoryId = categoryIdNum;
          this.getSubCategoryByCategory(categoryIdNum);
        } else {
          console.error('Invalid category ID:', this.categoryId);
        }
      }
    });
  }

  getAllCategories() {
    this.dataLoaderService.getAllCategories().subscribe(
      (res: { data: CategoryDTO[] }) => {
        this.categories = res.data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  selectCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.getSubCategoryByCategory(categoryId);
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(b => b.categoryId === categoryId);
    return category?.categoryName ?? 'Unknown';
  }

  getSubCategoryByCategory(categoryId: number) {
    this.dataLoaderService.getSubCategoryByCategory(categoryId).subscribe(
      (res: { data: SubCategoryDTO[] }) => {
        this.subCategories = res.data;
      },
      (error) => {
        console.error('Error fetching subcategories:', error);
      }
    );
  }
}