import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { SubCategoryDTO } from '../DTO/subCategoryDTO';
import { CategoryDTO } from '../DTO/categoryDTO';
import { ProductDTO } from '../DTO/productDTO';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: CategoryDTO[] = [];
  categoryId: number | null = null;
  subCategories: SubCategoryDTO[] = [];
  products: ProductDTO[] = [];
  categoryName: string = '';
  displayedCategoriess: CategoryDTO[] = [];
  
  itemsPerPage = 8;
  currentPage = 1;
  totalPages = 0;



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
        this.getProductByCategory(this.categoryId);
        this.getCategoryName(this.categoryId);
      } else {
        this.categoryId = null;
        this.products = []; // Reset if no category is selected
        this.categoryName = '';
      }
    });
  }

  getCategoryName(categoryId: number): void {
    this.dataLoaderService.getCategoryById(categoryId).subscribe({
      next: (response) => {
        console.log('API response for getCategoryById:', response);

        // Adjust this based on the actual structure of your response
        const category = response?.data;
        this.categoryName = category?.categoryName || 'Unknown Brand';

        if (category && category.categoryName) {
          this.categoryName = category.categoryName;
        } else {
          this.categoryName = 'Unknown Category';
        }
      },
      error: (error) => {
        console.error('Error fetching category name:', error);
        this.categoryName = 'Unknown Category';
      }
    });
  }


  getAllCategories(): void {
    this.dataLoaderService.getAllCategories().subscribe(
      (res: any) => {
        if (res) {
          this.categories = res.data || res;
          this.totalPages = Math.ceil(this.categories.length / this.itemsPerPage);
          this.updateDisplayedCategoriess();
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

  getProductByCategory(categoryId: number): void {
    this.dataLoaderService.getProductByCategory(categoryId).subscribe(
      (res: any) => {
        if (res && res.data) {
          this.products = res.data;         
        } else {
          console.warn('No product found for category ID:', categoryId);
          this.products = []; // Ensure the array is reset if no data is received
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.products = []; // Reset on error to avoid stale data
      }
    );
  }


  filterProducts(): void {
    this.products = this.products.filter(sub => sub.categoryId === this.categoryId);
  }

  showCategories(): void {
    this.categoryId = null;
    this.products = [];
    this.router.navigate(['/categories']);
  }


  updateDisplayedCategoriess(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCategoriess = this.categories.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < Math.ceil(this.categories.length / this.itemsPerPage)) {
      this.currentPage++;
      this.updateDisplayedCategoriess();
    }
  }
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCategoriess();
    }
  }

  viewProductDetails(product: any) {
    this.router.navigate(['/view-details'], { state: { product } });
  }
}
