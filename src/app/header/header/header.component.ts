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
  selectedCategoryId: number | null = null;  // Renamed to avoid method conflict
  cartCount: number = 0;
  

  constructor(
    private dataLoaderService: DataLoaderService,
    private route: ActivatedRoute,
    private cartService : CartService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();

    this.cartService.cart$.subscribe(items => {
    this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
  });

    
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('categoryId'); // Ensure 'categoryId' matches your route configuration
      
      if (this.categoryId) {
        const categoryIdNum = Number(this.categoryId);
        if (!isNaN(categoryIdNum)) {
          this.selectedCategoryId = categoryIdNum;  // Update selected category
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

  selectCategory(categoryId: number): void {  // Fixed method name conflict
    this.selectedCategoryId = categoryId;
    this.getSubCategoryByCategory(categoryId);
  }

  getCategoryName(categoryId: number): string {  // Fixed method name
    const category = this.categories.find(b => b.categoryId === categoryId);
    return category?.categoryName ?? 'Unknown'; // More concise and safer
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

  getCartCount(): number {
    // Example: if you store cart items in localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.length;
  }
}
