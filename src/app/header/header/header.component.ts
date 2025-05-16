import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { UserDTO } from 'src/app/DTO/userDTO';
import { CartService } from 'src/app/services/cart/cart.service';
import { DataLoaderService } from 'src/app/services/data_loader/data-loader.service';
import { UserStorageService } from 'src/app/services/storege/user-storege.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLOggedIn: boolean = false;
  userRole: string = '';

  userDetails: UserDTO | null = null;
  loading = true;
  errorMessage = '';


  categories: CategoryDTO[] = [];
  subCategories: SubCategoryDTO[] = [];
  brands: BrandDTO[] = [];
  products: ProductDTO[] = [];

  searchTerm: string = '';
  filteredProducts: ProductDTO[] = [];
  cartCount: number = 0;
  categoryId: string | null = null;
  selectedCategoryId: number | null = null;

  bootstrap: any;

  constructor(
    private dataLoaderService: DataLoaderService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private userStorageService: UserStorageService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllBrands();
    this.getAllProducts();

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
        }
      }
    });

   const user = UserStorageService.getUser();
  const userId = user?.userId;

  if (userId) {
    this.isUserLOggedIn = true;  // Set isLogined to true if user is logged in
    this.userService.getUserDetails(userId).subscribe({
      next: (res) => {
        this.userDetails = res.data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load user details';
        this.loading = false;
      }
    });
  } else {
    this.isUserLOggedIn = false;  // Set isLogined to false if no user is logged in
    this.errorMessage = 'User not found in local storage';
    this.loading = false;
  }
  }

  getAllCategories() {
    this.dataLoaderService.getAllCategories().subscribe(
      (res: { data: CategoryDTO[] }) => {
        this.categories = res.data;
      },
      error => console.error('Error fetching categories:', error)
    );
  }

  getAllBrands() {
    this.dataLoaderService.getAllBrands().subscribe(
      (res: { data: BrandDTO[] }) => {
        this.brands = res.data;
      },
      error => console.error('Error fetching brands:', error)
    );
  }

  getAllProducts() {
    this.dataLoaderService.getAllProducts().subscribe(
      (res: { data: ProductDTO[] }) => {
        this.products = res.data;
      },
      error => console.error('Error fetching products:', error)
    );
  }

  getSubCategoryByCategory(categoryId: number) {
    this.dataLoaderService.getSubCategoryByCategory(categoryId).subscribe(
      (res: { data: SubCategoryDTO[] }) => {
        this.subCategories = res.data;
      },
      error => console.error('Error fetching subcategories:', error)
    );
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category?.categoryName ?? 'Unknown';
  }

  getBrandName(brandId: number): string {
    const brand = this.brands.find(b => b.brandId === brandId);
    return brand?.brandName ?? 'Unknown';
  }

  onSearch() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.productName.toLowerCase().includes(term) ||
      this.getCategoryName(p.categoryId).toLowerCase().includes(term) ||
      this.getBrandName(p.brandId)?.toLowerCase().includes(term)
    );
  }

  onSelectProduct(productId: number): void {
    this.searchTerm = '';
    this.filteredProducts = [];

    const modalEl = document.getElementById('searchModal');
    if (modalEl) {
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modalEl);
      modalInstance?.hide();
    }
    this.router.navigate(['/view-details', productId]);
  }


}