import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { SubCategoryDTO } from '../DTO/subCategoryDTO';
import { CategoryDTO } from '../DTO/categoryDTO';
import { ProductDTO } from '../DTO/productDTO';
import { CartService } from '../services/cart/cart.service';
import { BannerDTO } from '../DTO/bannerDTO';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
   banner?: BannerDTO;
   title: string = 'Category Banner';

  categories: CategoryDTO[] = [];
  categoryId: number | null = null;
  subCategories: SubCategoryDTO[] = [];
  products: ProductDTO[] = [];
  filteredProducts: ProductDTO[] = [];
  categoryName: string = '';
  displayedCategoriess: CategoryDTO[] = [];

  searchTerm: string = '';
  hovering: { [productId: string]: boolean } = {};



  itemsPerPage = 8;
  currentPage = 1;
  totalPages = 0;

  // Filter properties
  searchName: string = '';
  selectedPriceRange: any = null;
  // priceRanges = [
  //   { label: '₹100 - ₹499.99', from: 100, to: 499.99 },
  //   { label: '₹500 - ₹999.99', from: 500, to: 999.99 },
  //   { label: '₹1,000 - ₹1,499.99', from: 1000, to: 1499.99 },
  //   { label: '₹1,500 - ₹1,999.99', from: 1500, to: 1999.99 },
  //   { label: '₹2,000 - ₹2,499.99', from: 2000, to: 2499.99 },
  //   { label: '₹2,500 - ₹4,999.99', from: 2500, to: 4999.99 },
  //   { label: '₹5,000 - ₹9,999.99', from: 5000, to: 9999.99 }
  // ];
  priceRanges = [
    { label: 'Under ₹1000', min: 0, max: 1000 },
    { label: '₹1000 - ₹5000', min: 1000, max: 5000 },
    { label: '₹5000 - ₹10000', min: 5000, max: 10000 },
    { label: 'Above ₹10000', min: 10000, max: Infinity }
  ];



  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private dataLoaderService: DataLoaderService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {

    this.displayedCategoriess = this.categories;

    this.getAllCategories();
     this.loadBannerByTitle();

    this.route.paramMap.subscribe(parmas => {
      const id = parmas.get('categoryId');
      if (id) {
        this.categoryId = Number(id);
        this.getProductByCategory(this.categoryId);
        this.getCategoryName(this.categoryId);
      } else {
        this.categoryId = null;
        this.products = []; // Reset if no category is selected
        this.filteredProducts = [];
        this.categoryName = '';
      }
    });
  }


   loadBannerByTitle(): void {
    this.dataLoaderService.getBannerByTitle(this.title).subscribe({
      next: (res) => {
        this.banner = res.data;
      },
      error: (err) => {
        console.error('Banner not found:', err);
      }
    });
  }

 onImgError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/banners_images/fallback-image.jpg';  // fallback image
}

  filterCategories() {
    const term = this.searchTerm.toLowerCase();
    this.displayedCategoriess = this.categories.filter(category =>
      category.categoryName.toLowerCase().includes(term)
    );
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
          this.filteredProducts = [...this.products]; // Initialize filteredProducts
        } else {
          console.warn('No products found for category ID:', categoryId);
          this.products = []; // Ensure the array is reset if no data is received
          this.filteredProducts = [];
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.products = []; // Reset on error to avoid stale data
        this.filteredProducts = [];
      }
    );
  }


  filterProducts(): void {
    this.filteredProducts = this.products.filter(product =>
      product.productName.toLowerCase().includes(this.searchName.toLowerCase()) &&
      (!this.selectedPriceRange ||
        (product.productPrice >= this.selectedPriceRange.min &&
          product.productPrice <= this.selectedPriceRange.max))
    );
  }

  applySelectedPriceRange(): void {
    this.filterProducts();
  }

  showCategories(): void {
    this.categoryId = null;
    this.products = [];
    this.categoryName = '';
    this.filteredProducts = [];
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
  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.router.navigate(['/cart']);
  }

  viewProductDetails(product: any) {
    this.router.navigate(['/view-details'], { state: { product } });
  }
}
