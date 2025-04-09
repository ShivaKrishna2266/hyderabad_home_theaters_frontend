import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductDTO } from '../DTO/productDTO';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { BrandDTO } from '../DTO/brandDTO';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  brands : BrandDTO[] = [];
  product!: ProductDTO;
  cartItems: any[] = [];
  products: ProductDTO[] = [];

  constructor(private router: Router,
              private dataLoaderService : DataLoaderService,
  )
   {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  }

  ngOnInit(): void {
    if (!this.product) {
      console.warn("No product found to show");
    }

    this.cartItems = this.dataLoaderService.getCartItems().map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));

    this.getAllBrands();
    this.getAllProducts();
  }


  getAllBrands(){
    this.dataLoaderService.getAllBrands().subscribe(
      (res : any)=>{
        this.brands = res.data;
      },
      (error)=>{
        console.log('Brand  data is not showing', error);
      }
    )
  }

  getBrandName(brandId: number): string {
    const foundBrand = this.brands.find(brand => brand.brandId === brandId);
    return foundBrand ? foundBrand.brandName : 'Unknown';
  }


  getAllProducts(): void {
    this.dataLoaderService.getAllProducts().subscribe((data: ProductDTO[]) => {
      // Initialize quantity field if not present
      this.products = data.map(product => ({ ...product, quantity: 1 }));
    });
  }

  increaseQuantity(product: any): void {
    this.products[product].stockQuantity++;
  }

  decreaseQuantity(product: any): void {
    if (this.products[product].stockQuantity > 1) {
      this.products[product].stockQuantity--;
    }
  }

  addToCart(product: any) {
    this.dataLoaderService.addToCart(product);
    this.router.navigate(['/cart']);
  }
}

