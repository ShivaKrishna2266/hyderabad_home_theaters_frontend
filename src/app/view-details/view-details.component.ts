import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from '../DTO/productDTO';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { BrandDTO } from '../DTO/brandDTO';
import { ReviewDTO } from '../DTO/reviewDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {

  brands: BrandDTO[] = [];
  product!: ProductDTO;
  cartItems: any[] = [];
  products: ProductDTO[] = [];

  reviews: ReviewDTO[] = [];
  chunkedReviews: ReviewDTO[][] = [];
  productId!: number;
  reviewForm: FormGroup = this.formBuilder.group({});
  @ViewChild('closeBtn') closeBtn!: ElementRef;

  constructor(private router: Router,
    private dataLoaderService: DataLoaderService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['product'];
  };

  ngOnInit(): void {
    this.cartItems = this.dataLoaderService.getCartItems().map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
  
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      this.productId = +routeId;
    } else if (this.product) {
      this.productId = this.product.productId;
    }
  
    this.reviewForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      review: ['', Validators.required],
      productId: [null]
    });
  
    // ✅ Patch productId into the form
    this.reviewForm.patchValue({ productId: this.productId });
  
    this.getAllBrands();
    this.getAllProducts();
    this.getAllReview();
  }


  getAllBrands() {
    this.dataLoaderService.getAllBrands().subscribe(
      (res: any) => {
        this.brands = res.data;
      },
      (error) => {
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

  getAllReview() {
    this.dataLoaderService.getProductReviews(this.productId).subscribe(
      (res: any) => {
        this.reviews = res.data || [];
        this.chunkedReviews = this.chunkArray(this.reviews, 2);
      },
      (error) => {
        console.log('Reviews not shown', error);
      }
    );
  }

  chunkArray(arr: ReviewDTO[], chunkSize: number): ReviewDTO[][] {
    const result: ReviewDTO[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      const reviewData = this.reviewForm.value;
      console.log("✅ Payload Sent:", reviewData); // Debugging
      this.dataLoaderService.createReview(reviewData).subscribe({
        next: (res: any) => {
          alert("✅ Review Added Successfully");
          console.log("✅ Review Added Successfully", res);
          this.reviewForm.reset();  
          this.getAllReview();
          this.closeBtn.nativeElement.click(); // ✅ Close popup 
        },
        error: (err) => {
          console.error("❌ Error Adding Review", err);
        }
      });
    } else {
      console.warn("⚠️ Form is invalid. Please check the inputs.");
      this.reviewForm.markAllAsTouched(); // highlight invalid fields
    }
  }
  setRating(star: number): void {
    this.reviewForm.get('rating')?.setValue(star);
  }
  
}




